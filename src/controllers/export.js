import express from "express";
const router = express.Router();
import htmlToPDF from "../helpers/html-to-pdf.js";
import { generatePieChart, generateLineChart, generatePortfolioPieChart } from "../helpers/chartCanvas.js";
import { PrismaClient } from "@prisma/client";
import summaryTemplate from '../templates/soa/template.js';
import { getFcbsDepositsByCifNumber, getTotalTrustPortfolio, getTotalCBCSecMarketValue } from "../services/users.js";
import fs from 'fs';
import path from 'path';

// Pages
import page1 from '../templates/soa/page1.js';
import page2 from '../templates/soa/page2.js';
import page3 from '../templates/soa/page3.js';

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
  console.log(data);
  try {
    const pieChart = await generatePortfolioPieChart(data);
    const totalBankPortfolio = await getFcbsDepositsByCifNumber(data.cifNumber, data.month, data.year);
    const totalTrustPortfolio = await getTotalTrustPortfolio(data.cifNumber);
    const totalCBCSecMarketValue = 0;

    const headerLogoBase64 = getBase64Image(
      path.join(process.cwd(), 'public', 'images', 'header-logo.png')
    );
    const headerBgBase64 = getBase64Image(
      path.join(process.cwd(), 'public', 'images', 'header-bg.png')
    );
    const footerLogoBase64 = getBase64Image(
      path.join(process.cwd(), 'public', 'images', 'footer-logo.png')
    );

    // Sum the values
    const totalValue =
      (data.unitTrustsValue || 0) +
      (data.structuredProductsValue || 0) +
      (data.equitiesValue || 0) +
      (data.fixedIncomeValue || 0) +
      (data.moneyMarketValue || 0);

    const html = summaryTemplate({
      summaryTitle: "User Summary Report",
      headerLogoBase64,
      headerBgBase64,
      footerLogoBase64,
      data: {
        ...data,
        totalValue,
        totalBankPortfolio,
        totalTrustPortfolio,
        totalCBCSecMarketValue
      },
      pieChart,
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
    lastMonthAUM: 5700000,
    cifNumber: 'R23500000',
  }

  console.log("data in export: ", data);

  try {
    const portfolioPieChart = await generatePortfolioPieChart(data);
    const totalBankPortfolio = await getFcbsDepositsByCifNumber(data.cifNumber, data.month, data.year);
    const totalTrustPortfolio = await getTotalTrustPortfolio(data.cifNumber);
    const totalCBCSecMarketValue = 0;
    // const totalCBCSecMarketValue = getTotalCBCSecMarketValue();

    const headerLogoBase64 = getBase64Image(
      path.join(process.cwd(), 'public', 'images', 'header-logo.png')
    );
    const headerBgBase64 = getBase64Image(
      path.join(process.cwd(), 'public', 'images', 'header-bg.png')
    );
    const footerLogoBase64 = getBase64Image(
      path.join(process.cwd(), 'public', 'images', 'footer-logo.png')
    );

    // Sum the values
    const totalValue =
      (data.unitTrustsValue || 0) +
      (data.structuredProductsValue || 0) +
      (data.equitiesValue || 0) +
      (data.fixedIncomeValue || 0) +
      (data.moneyMarketValue || 0);

    // ... Pages definition
    const pages = [
      { component: page1, props: { ...data, portfolioPieChart, totalValue, totalBankPortfolio, totalTrustPortfolio, totalCBCSecMarketValue } },
      { component: page2, props: { ...data, extraField: 'value2' } },
      { component: page3 },
      // Add more pages as needed
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