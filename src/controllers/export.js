const router = express.Router();
import { PrismaClient } from "@prisma/client";
import express from "express";
import fs from 'fs';
import path from 'path';
import { generatePortfolioPieChart, generateCurrencyPieChart } from "../helpers/chartCanvas.js";
import htmlToPDF from "../helpers/html-to-pdf.js";
import { 
  getAllUserCurrency,
  getFcbsDeposits, 
  getAllTimeDeposits, 
  getTransactionHistory, 
  getAllTrustDeposits, 
  getAllTrustFixedIncome,
  getAllTrustEquities,
  getAllCBSecMapping,
  getAllTrustUitf,
  getTotalTrustPortfolioPerCurrency,
  getTotalBankPortfolioPerCurrency,
  getTotalCBSecMarketValue,
  getLatestCurrencyRatesByMonth,
} from "../services/soa.js";
import summaryTemplate from '../templates/soa/template.js';
import { currencyPreferredOrder } from '../constants/currency.js';
import { sumOfFields, getPrevMonthAUM } from '../helpers/utils.js';

// Import Pages
import page1 from '../templates/soa/page1.js';
import page2 from '../templates/soa/page2.js';
import page3 from '../templates/soa/page3.js';
import page4 from '../templates/soa/page4.js';
import page5 from '../templates/soa/page5.js';
import page6 from '../templates/soa/page6.js';
import page7 from '../templates/soa/page7.js';
import page8 from '../templates/soa/page8.js';
import page9 from '../templates/soa/page9.js';
import page10 from '../templates/soa/page10.js';
import page11 from '../templates/soa/page11.js';
import page12 from '../templates/soa/page12.js';
import page13 from '../templates/soa/page13.js';
import page14 from '../templates/soa/page14.js';
import page15 from '../templates/soa/page15.js';


function getBase64Image(filePath) {
  const image = fs.readFileSync(filePath);
  const ext = filePath.split('.').pop();
  return `data:image/${ext};base64,${image.toString('base64')}`;
}

const prisma = new PrismaClient();

router.get('/health', (req, res) => {
  const now = new Date();
  res.json({
    status: 'OK',
    message: 'export api is healthy',
    datetime: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
  });
});

router.post('/soa', async (req, res) => {
  const data = req.body;
  console.log("data in export: ", data);
  try {
    const headerLogoBase64 = getBase64Image(
      path.join(process.cwd(), 'public', 'images', 'header-logo.png')
    );
    const headerBgBase64 = getBase64Image(
      path.join(process.cwd(), 'public', 'images', 'header-bg.png')
    );
    const footerLogoBase64 = getBase64Image(
      path.join(process.cwd(), 'public', 'images', 'footer-logo.png')
    );

    // GET All the currency of the user
    const allUserCurrencies = await getAllUserCurrency(data.cifNumber, data.month, data.year);
    const preferredOrder = ['PHP', 'USD', 'EUR', 'CNY', 'JPY'];
    const currencyCodes = [
      ...preferredOrder.filter(code => allUserCurrencies.includes(code)),
      ...allUserCurrencies.filter(code => !preferredOrder.includes(code)).sort()
    ]

    // Getting the value per currency
    const totalTrustPortfolio = {};
    const totalBankPortfolio = {};
    const totalCBSecMarketValue = {};
    const fcbsDeposits = {};
    const timeDeposits = {};
    const trustDeposits = {};
    const trustFixedIncome = {};
    const trustEquities = {};
    const cbsecMapping = {};
    const trustUitf = {};
    const transactionHistory = {};
    
    for (const currencyCode of currencyCodes) {
      totalBankPortfolio[currencyCode] = await getTotalBankPortfolioPerCurrency(data.cifNumber, data.month, data.year, currencyCode);
      totalTrustPortfolio[currencyCode] = await getTotalTrustPortfolioPerCurrency(data.cifNumber, currencyCode);
      totalCBSecMarketValue[currencyCode] = await getTotalCBSecMarketValue(data.cifNumber, currencyCode);
      fcbsDeposits[currencyCode] = await getFcbsDeposits(data.cifNumber, data.month, data.year, currencyCode);
      timeDeposits[currencyCode] = await getAllTimeDeposits(data.cifNumber, data.month, data.year, currencyCode);
      trustDeposits[currencyCode] = await getAllTrustDeposits(data.cifNumber, data.month, data.year, currencyCode);
      trustFixedIncome[currencyCode] = await getAllTrustFixedIncome(data.cifNumber, data.month, data.year, currencyCode);
      trustEquities[currencyCode] = await getAllTrustEquities(data.cifNumber, data.month, data.year, currencyCode);
      cbsecMapping[currencyCode] = await getAllCBSecMapping(data.cifNumber, currencyCode);
      trustUitf[currencyCode] = await getAllTrustUitf(data.cifNumber, data.month, data.year, currencyCode);
      transactionHistory[currencyCode] = await getTransactionHistory(data.cifNumber, data.month, data.year, currencyCode);
    }

    // Fetch rates, and filter rates only for the user's currencies
    const allLatestCurrencyRates = await getLatestCurrencyRatesByMonth(data.month, data.year);
    const latestCurrencyRates = {};
    for (const code of currencyCodes) {
      if (allLatestCurrencyRates.hasOwnProperty(code)) {
        latestCurrencyRates[code] = allLatestCurrencyRates[code];
      }
    }

    // Get all currency codes present in any of the objects
    const allCurrencies = Array.from(
      new Set([
        ...Object.keys(fcbsDeposits),
        ...Object.keys(timeDeposits),
        ...Object.keys(trustDeposits)
      ])
    );
    
    // Product Holdings Section
    let totalMoneyMarket = 0;
    let totalFixedIncome = 0;
    let totalEquities = 0;
    let totalStructuredProducts = 0;
    let totalTrustUitf = 0;
    
    for (const code of allCurrencies) {
      // Deposit CASA
      const depositPHP = sumOfFields(fcbsDeposits[code], 'availableBalance');
      // Time Deposit
      const timeDepositPHP = sumOfFields(timeDeposits[code], 'principalAmount');
      // Trust TD
      const trustDepositPHP = sumOfFields(trustDeposits[code], 'principalAmount');
      // Trust Fixed Income
      const fixedIncomePHP = sumOfFields(trustFixedIncome[code], 'faceAmount');

      // Equities (Trust Equities + CB Securities Mapping)
      const trustEquitiesPHP = sumOfFields(trustEquities[code], 'purchaseAmount');
      const cbsecMappingPHP = sumOfFields(cbsecMapping[code], 'netPurchaseAmount');

      // Convert to PHP if not PHP (code 0)
      const rate = code === 'PHP' ? 1 : (latestCurrencyRates[code] || 1);
      totalMoneyMarket += (depositPHP + timeDepositPHP + trustDepositPHP) * rate;
      totalFixedIncome += fixedIncomePHP * rate;
      totalEquities += (trustEquitiesPHP + cbsecMappingPHP) * rate;
      totalStructuredProducts += (0) * rate;
      totalTrustUitf += sumOfFields(trustUitf[code], 'purchaseAmount') * rate;
    }

    // GET summary and pie chart
    const pieChartData = {
      totalMoneyMarket,
      totalFixedIncome,
      totalEquities,
      totalStructuredProducts,
      totalTrustUitf
    }
    const portfolioPieChart = await generatePortfolioPieChart(pieChartData);
    const currencyPieChart = await generateCurrencyPieChart(latestCurrencyRates);
    
    console.log('currency codes ', currencyCodes);
    console.log(data.month + ' latest currency rates ', allLatestCurrencyRates);

    const overallTotalValue =
      (totalMoneyMarket || 0) +
      (totalFixedIncome || 0) +
      (totalEquities || 0) +
      (totalStructuredProducts || 0) +
      (totalTrustUitf || 0);
    const prevMonthAUM = await getPrevMonthAUM(data.cifNumber, data.month, data.year);

    // ... Pages definition
    const pages = [
      { component: page1, props: { ...data, portfolioPieChart, overallTotalValue, totalBankPortfolio, totalTrustPortfolio, totalCBSecMarketValue, prevMonthAUM, currency: currencyCodes, latestCurrencyRates, totalMoneyMarket, totalFixedIncome, totalEquities, totalStructuredProducts, totalTrustUitf, currencyPieChart } },
      { component: page2, props: { fcbsDeposits, timeDeposits} },
      // { component: page3, props: { transactionHistory } },
      // { component: page4 },
      // { component: page5 },
      // { component: page6 },
      // { component: page7 },
      // { component: page8, props: { trustDeposits } },
      // { component: page9, props: { trustFixedIncome } },
      // { component: page10, props: { trustEquities } },
      // { component: page11 },
      // { component: page12, props: { trustEquities } },
      // { component: page13 },
      // { component: page14, props: { CBSecMapping } },
    ];

    const html = summaryTemplate({
      summaryTitle: "WMG SOA Report",
      headerLogoBase64,
      headerBgBase64,
      footerLogoBase64,
      pages,
      preview: false,
    });
    const pdf = await htmlToPDF(html);

    res.contentType('application/pdf');
    res.send(pdf);
  } catch (error) {
    console.error('Error fetching the soa: ', error);
    res.status(500).send('No soa found.');
  }
});

router.get('/soa', async (req, res) => {
  const data = {
    month: 'Nov',
    year: '2024',
    accountName: 'Jane Peterson',
    cifNumber: 'R23500000',
  }

  console.log("data in export: ", data);

  try {
    const headerLogoBase64 = getBase64Image(
      path.join(process.cwd(), 'public', 'images', 'header-logo.png')
    );
    const headerBgBase64 = getBase64Image(
      path.join(process.cwd(), 'public', 'images', 'header-bg.png')
    );
    const footerLogoBase64 = getBase64Image(
      path.join(process.cwd(), 'public', 'images', 'footer-logo.png')
    );
    
    // GET All the currency of the user
    const allUserCurrencies = await getAllUserCurrency(data.cifNumber, data.month, data.year);
    const allLatestCurrencyRates = await getLatestCurrencyRatesByMonth(data.month, data.year);

    console.log('allUserCurrencies', allUserCurrencies);
    const preferredOrder = ['PHP', 'USD', 'EUR', 'CNY', 'JPY'];
    const currencyCodes = [
      ...preferredOrder.filter(code => allUserCurrencies.includes(code)),
      ...allUserCurrencies.filter(code => !preferredOrder.includes(code)).sort()
    ]

    // Fetch rates, and filter rates only for the user's currencies
    const latestCurrencyRates = {};
    const fcbsDeposits = {};
    const timeDeposits = {};
    const trustDeposits = {};
    const trustFixedIncome = {};
    const trustEquities = {};
    const cbsecMapping = {};
    const trustUitf = {};
    const transactionHistory = {};

    // Product Holdings Section
    let totalMoneyMarket = 0;
    let totalFixedIncome = 0;
    let totalEquities = 0;
    let totalStructuredProducts = 0;
    let totalTrustUitf = 0;
    const totalBankPortfolio = {};
    const totalTrustPortfolio = {};
    const totalCBSecMarketValue = {};
    
    for (const currencyCode of currencyCodes) {
      if (allLatestCurrencyRates.hasOwnProperty(currencyCode)) {
        latestCurrencyRates[currencyCode] = allLatestCurrencyRates[currencyCode];
      }

      fcbsDeposits[currencyCode] = await getFcbsDeposits(data.cifNumber, data.month, data.year, currencyCode);
      timeDeposits[currencyCode] = await getAllTimeDeposits(data.cifNumber, data.month, data.year, currencyCode);
      trustDeposits[currencyCode] = await getAllTrustDeposits(data.cifNumber, data.month, data.year, currencyCode);
      trustFixedIncome[currencyCode] = await getAllTrustFixedIncome(data.cifNumber, data.month, data.year, currencyCode);
      trustEquities[currencyCode] = await getAllTrustEquities(data.cifNumber, data.month, data.year, currencyCode);
      cbsecMapping[currencyCode] = await getAllCBSecMapping(data.cifNumber, currencyCode);
      trustUitf[currencyCode] = await getAllTrustUitf(data.cifNumber, data.month, data.year, currencyCode);
      transactionHistory[currencyCode] = await getTransactionHistory(data.cifNumber, data.month, data.year, currencyCode);

      // Deposit CASA
      const depositPHP = sumOfFields(fcbsDeposits[currencyCode], 'availableBalance');
      // Time Deposit
      const timeDepositPHP = sumOfFields(timeDeposits[currencyCode], 'principalAmount');
      // Trust TD
      const trustDepositPHP = sumOfFields(trustDeposits[currencyCode], 'principalAmount');
      // Trust Fixed Income
      const fixedIncomePHP = sumOfFields(trustFixedIncome[currencyCode], 'faceAmount');

      // Equities (Trust Equities + CB Securities Mapping)
      const trustEquitiesPHP = sumOfFields(trustEquities[currencyCode], 'purchaseAmount');
      const cbsecMappingPHP = sumOfFields(cbsecMapping[currencyCode], 'netPurchaseAmount');

      // Convert to PHP if not PHP (currencyCode PHP)
      const rate = currencyCode === 'PHP' ? 1 : (latestCurrencyRates[currencyCode] || 1);
      totalMoneyMarket += (depositPHP + timeDepositPHP + trustDepositPHP) * rate;
      totalFixedIncome += fixedIncomePHP * rate;
      totalEquities += (trustEquitiesPHP + cbsecMappingPHP) * rate;
      totalStructuredProducts += (0) * rate;
      totalTrustUitf += sumOfFields(trustUitf[currencyCode], 'purchaseAmount') * rate;

      totalBankPortfolio[currencyCode] = sumOfFields(fcbsDeposits[currencyCode], 'availableBalance') + sumOfFields(timeDeposits[currencyCode], 'principalAmount');
      totalTrustPortfolio[currencyCode] = sumOfFields(trustDeposits[currencyCode], 'principalAmount') + sumOfFields(trustFixedIncome[currencyCode], 'faceAmount') + sumOfFields(trustEquities[currencyCode], 'purchaseAmount') + sumOfFields(trustUitf[currencyCode], 'purchaseAmount');
      totalCBSecMarketValue[currencyCode] = sumOfFields(cbsecMapping[currencyCode], 'marketValue');
    }

    // GET summary and pie chart
    const pieChartData = Object.fromEntries(
      Object.entries({
        'Money Market': totalMoneyMarket,
        'Fixed Income': totalFixedIncome,
        'Equities': totalEquities,
        'Structured Products': totalStructuredProducts,
        'Trust UITF': totalTrustUitf
      }).filter(([_, value]) => value && value !== 0)
    );

    const portfolioPieChart = await generatePortfolioPieChart(pieChartData);
    const currencyPieChart = await generateCurrencyPieChart(latestCurrencyRates);

    const overallTotalValue =
      (totalMoneyMarket || 0) +
      (totalFixedIncome || 0) +
      (totalEquities || 0) +
      (totalStructuredProducts || 0) +
      (totalTrustUitf || 0);
    const prevMonthAUM = await getPrevMonthAUM(data.cifNumber, data.month, data.year);

    // ... Pages definition
    const pages = [
      { component: page1, props: { ...data, portfolioPieChart, overallTotalValue, totalBankPortfolio, totalTrustPortfolio, totalCBSecMarketValue, prevMonthAUM, currency: currencyCodes, latestCurrencyRates, totalMoneyMarket, totalFixedIncome, totalEquities, totalStructuredProducts, totalTrustUitf, currencyPieChart } },
      { component: page2, props: { fcbsDeposits, timeDeposits} },
      // { component: page3, props: { transactionHistory } },
      // { component: page4 },
      // { component: page5 },
      // { component: page6 },
      // { component: page7 },
      // { component: page8, props: { trustDeposits } },
      // { component: page9, props: { trustFixedIncome } },
      // { component: page10, props: { trustEquities } },
      // { component: page11 },
      // { component: page12, props: { trustEquities } },
      // { component: page13 },
      // { component: page14, props: { CBSecMapping } },
    ];

    const html = summaryTemplate({
      summaryTitle: "WMG SOA Report",
      headerLogoBase64,
      headerBgBase64,
      footerLogoBase64,
      pages,
      preview: false,
    });
    const pdf = await htmlToPDF(html);

    res.contentType('application/pdf');
    res.send(pdf);
  } catch (error) {
    console.error('Error fetching the soa: ', error);
    res.status(500).send('No soa found.');
  }
});


export default router;