const router = express.Router();
import { PrismaClient } from "@prisma/client";
import express from "express";
import fs from 'fs';
import path from 'path';
import { generatePortfolioPieChart } from "../helpers/chartCanvas.js";
import htmlToPDF from "../helpers/html-to-pdf.js";
import { 
  getAllUserCurrency,
  getAllDeposits, 
  getAllTimeDeposits, 
  getFcbsDepositsByCifNumber, 
  getTotalTrustPortfolio, 
  getTransactionHistory, 
  getAllTrustDeposits, 
  getAllTrustFixedIncome,
  getAllTrustEquities,
  getAllCBSecMapping,
  oldTrustDeposits,
  getPrevMonthAUM,
  getTotalTrustPortfolioPerCurrency,
  getTotalBankPortfolioPerCurrency,
  getTotalCBSecMarketValue,
  getLatestCurrencyRates
} from "../services/users.js";
import summaryTemplate from '../templates/soa/template.js';
import { currencyConfig } from '../constants/currency.js';
import { sumAvailableBalance, sumPrincipalAmount } from '../helpers/utils.js';

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

router.post('/users', async (req, res) => {
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
    const currencyCodes = await getAllUserCurrency(data.cifNumber, data.month, data.year);
    const hasForeignCurrency = Array.isArray(currencyCodes) && currencyCodes.some(c => c !== 0);

    // Prepare per-currency objects
    const totalDeposits = {};
    const totalTimeDeposits = {};
    const totalTrustPortfolio = {};
    const totalBankPortfolio = {};
    const totalCBSecMarketValue = {};
    const totalTrustDeposits = {};

    for (const currencyInt of currencyCodes) {
      totalDeposits[currencyInt] = await getAllDeposits(data.cifNumber, data.month, data.year, currencyInt);
      totalTimeDeposits[currencyInt] = await getAllTimeDeposits(data.cifNumber, data.month, data.year, currencyInt);
      totalTrustDeposits[currencyInt] = await getAllTrustDeposits(data.cifNumber, data.month, data.year, currencyInt);
      totalTrustPortfolio[currencyInt] = await getTotalTrustPortfolioPerCurrency(data.cifNumber, currencyInt);
      totalBankPortfolio[currencyInt] = await getTotalBankPortfolioPerCurrency(data.cifNumber, data.month, data.year, currencyInt);
      totalCBSecMarketValue[currencyInt] = await getTotalCBSecMarketValue(data.cifNumber, currencyInt);
    }

    const transactionHistory = await getTransactionHistory(data.cifNumber, data.month, data.year);
    const oTrustDeposits = await oldTrustDeposits(data.cifNumber);
    const trustFixedIncome = await getAllTrustFixedIncome(data.cifNumber);
    const trustEquities = await getAllTrustEquities(data.cifNumber);
    const CBSecMapping = await getAllCBSecMapping(data.cifNumber);

    // GET summary and pie chart
    const portfolioPieChart = await generatePortfolioPieChart(data);

    // Fetch rates, and filter rates only for the user's currencies
    const allLatestCurrencyRates = await getLatestCurrencyRates();
    const latestCurrencyRates = {};
    for (const code of currencyCodes) {
      if (allLatestCurrencyRates.hasOwnProperty(code)) {
        latestCurrencyRates[code] = allLatestCurrencyRates[code];
      }
    }

    // Get all currency codes present in any of the objects
    const allCurrencies = Array.from(
      new Set([
        ...Object.keys(totalDeposits),
        ...Object.keys(totalTimeDeposits),
        ...Object.keys(totalTrustDeposits)
      ].map(Number))
    );

    let moneyMarket = 0;
    for (const code of allCurrencies) {
      // Deposit CASA
      const depositPHP = sumAvailableBalance(totalDeposits[code]);
      // Time Deposit
      const timeDepPHP = sumPrincipalAmount(totalTimeDeposits[code]);
      // Trust TD
      const trustDepPHP = sumPrincipalAmount(totalTrustDeposits[code]);

      // Convert to PHP if not PHP (code 0)
      const rate = code === 0 ? 1 : (latestCurrencyRates[code] || 1);
      moneyMarket += (depositPHP + timeDepPHP + trustDepPHP) * rate;
    }

    const overallTotalValue =
      (data.unitTrustsValue || 0) +
      (data.structuredProductsValue || 0) +
      (data.equitiesValue || 0) +
      (data.fixedIncomeValue || 0) +
      (data.moneyMarketValue || 0);
    const prevMonthAUM = await getPrevMonthAUM(data.cifNumber, data.month, data.year);

    // ... Pages definition
    const pages = [
      { component: page1, props: { ...data, portfolioPieChart, overallTotalValue, totalBankPortfolio, totalTrustPortfolio, totalCBSecMarketValue, prevMonthAUM, currency: currencyCodes, latestCurrencyRates, moneyMarket } },
      { component: page2, props: { totalDeposits, totalTimeDeposits, totalTrustDeposits } },
      { component: page3, props: { transactionHistory } },
      // { component: page4 },
      // { component: page5 },
      // { component: page6 },
      // { component: page7 },
      { component: page8, props: { trustDeposits: oTrustDeposits } },
      { component: page9, props: { trustFixedIncome } },
      { component: page10, props: { trustEquities } },
      // { component: page11 },
      { component: page12, props: { trustEquities } },
      // { component: page13 },
      { component: page14, props: { CBSecMapping } },
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
    console.error('Error fetching the users: ', error);
    res.status(500).send('No users found.');
  }
});

router.get('/users', async (req, res) => {
  const data = {
    month: 'Nov',
    year: '2024',
    accountName: 'Jane Peterson',
    unitTrustsValue: 2000000,
    structuredProductsValue: 100000,
    equitiesValue: 800000,
    fixedIncomeValue: 1500000,
    moneyMarketValue: 1000000,
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
    const currencyCodes = Object.keys(currencyConfig).filter(code => allUserCurrencies.includes(code));

    console.log('currency codes: ', currencyCodes);

    // const hasForeignCurrency = Array.isArray(currencyCodes) && currencyCodes.some(c => c !== 0);
    
    // GET deposits
    const transactionHistory = await getTransactionHistory(data.cifNumber, data.month, data.year);
    const oTrustDeposits = await oldTrustDeposits(data.cifNumber);
    const trustFixedIncome = await getAllTrustFixedIncome(data.cifNumber);
    const trustEquities = await getAllTrustEquities(data.cifNumber);
    const CBSecMapping = await getAllCBSecMapping(data.cifNumber);
    
    // GET summary and pie chart
    const portfolioPieChart = await generatePortfolioPieChart(data);
    
    // Getting the value per currency
    const totalTrustPortfolio = {};
    const totalBankPortfolio = {};
    const totalCBSecMarketValue = {};
    const totalDeposits = {};
    const totalTimeDeposits = {};
    const totalTrustDeposits = {};
    for (const currencyCode of currencyCodes) {
      totalDeposits[currencyCode] = await getAllDeposits(data.cifNumber, data.month, data.year, currencyCode);
      totalTimeDeposits[currencyCode] = await getAllTimeDeposits(data.cifNumber, data.month, data.year, currencyCode);
      totalTrustDeposits[currencyCode] = await getAllTrustDeposits(data.cifNumber, data.month, data.year, currencyCode);
      totalTrustPortfolio[currencyCode] = await getTotalTrustPortfolioPerCurrency(data.cifNumber, currencyCode);
      totalBankPortfolio[currencyCode] = await getTotalBankPortfolioPerCurrency(data.cifNumber, data.month, data.year, currencyCode);
      totalCBSecMarketValue[currencyCode] = await getTotalCBSecMarketValue(data.cifNumber, currencyCode);
    }
    
    // Fetch rates, and filter rates only for the user's currencies
    const allLatestCurrencyRates = await getLatestCurrencyRates();
    const latestCurrencyRates = {};
    for (const code of currencyCodes) {
      if (allLatestCurrencyRates.hasOwnProperty(code)) {
        latestCurrencyRates[code] = allLatestCurrencyRates[code];
      }
    }

    // Get all currency codes present in any of the objects
    const allCurrencies = Array.from(
      new Set([
        ...Object.keys(totalDeposits),
        ...Object.keys(totalTimeDeposits),
        ...Object.keys(totalTrustDeposits)
      ])
    );

    let moneyMarket = 0;
    for (const code of allCurrencies) {
      // Deposit CASA
      const depositPHP = sumAvailableBalance(totalDeposits[code]);
      // Time Deposit
      const timeDepPHP = sumPrincipalAmount(totalTimeDeposits[code]);
      // Trust TD
      const trustDepPHP = sumPrincipalAmount(totalTrustDeposits[code]);

      // Convert to PHP if not PHP (code 0)
      const rate = code === 0 ? 1 : (latestCurrencyRates[code] || 1);
      moneyMarket += (depositPHP + timeDepPHP + trustDepPHP) * rate;
    }

    console.log('currency codes ', currencyCodes);
    console.log('latest currency rates ', allLatestCurrencyRates);

    // const overallTotalValue =
    //   (data.unitTrustsValue || 0) +
    //   (data.structuredProductsValue || 0) +
    //   (data.equitiesValue || 0) +
    //   (data.fixedIncomeValue || 0) +
    //   (data.moneyMarketValue || 0);
    // const prevMonthAUM = await getPrevMonthAUM(data.cifNumber, data.month, data.year);
    const overallTotalValue =
      (data.unitTrustsValue || 0) +
      (data.structuredProductsValue || 0) +
      (data.equitiesValue || 0) +
      (data.fixedIncomeValue || 0) +
      (moneyMarket || 0);
    const prevMonthAUM = await getPrevMonthAUM(data.cifNumber, data.month, data.year);

    // ... Pages definition
    const pages = [
      { component: page1, props: { ...data, portfolioPieChart, overallTotalValue, totalBankPortfolio, totalTrustPortfolio, totalCBSecMarketValue, prevMonthAUM, currency: currencyCodes, latestCurrencyRates, moneyMarket } },
      { component: page2, props: { totalDeposits, totalTimeDeposits} },
      { component: page3, props: { transactionHistory } },
      // { component: page4 },
      // { component: page5 },
      // { component: page6 },
      // { component: page7 },
      { component: page8, props: { trustDeposits: oTrustDeposits } },
      { component: page9, props: { trustFixedIncome } },
      { component: page10, props: { trustEquities } },
      // { component: page11 },
      { component: page12, props: { trustEquities } },
      // { component: page13 },
      { component: page14, props: { CBSecMapping } },
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
    console.error('Error fetching the users: ', error);
    res.status(500).send('No users found.');
  }
});


export default router;