import express from "express";
const router = express.Router();
import htmlToPDF from "../helpers/html-to-pdf.js";
import { generatePieChart, generateLineChart, generatePortfolioPieChart } from "../helpers/chartCanvas.js";
import { PrismaClient } from "@prisma/client";
import soaTemplate from "../templates/soa.js";
import summaryTemplate from '../templates/summary.js';
import getFcbsDepositsByCifNumber from "../services/users.js";
import fs from 'fs';

function getBase64Image(filePath) {
  const image = fs.readFileSync(filePath);
  const ext = filePath.split('.').pop();
  return `data:image/${ext};base64,${image.toString('base64')}`;
}

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) return res.status(400).send("Role is required");

    const users = (role == "all") ? await prisma.userDetailsModel.findMany() : await prisma.userDetailsModel.findMany({ where: { role } });

    if (!users || users.length === 0) return res.status(404).send('No users found');

    // Create the Pie chart image
    const pieChart = await generatePieChart(users);
    const lineChart = await generateLineChart(users);
    
    const html = soaTemplate(users, pieChart, lineChart);
    const pdf = await htmlToPDF(html);
    res.contentType('application/pdf');
    res.send(pdf);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/health', (req, res) => {
  const now = new Date();
  res.json({
    status: 'OK',
    message: 'export api is healthy',
    datetime: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
  });
});

router.post('/users', async(req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const pieChart = await generatePortfolioPieChart(data);
    const totalBankPortfolio = await getFcbsDepositsByCifNumber(data.cifNumber);

    const headerLogoBase64 = getBase64Image('d:/my_projects/node_pdf/public/images/header-logo.png');
    const headerBgBase64 = getBase64Image('d:/my_projects/node_pdf/public/images/header-bg.png');
    const footerLogoBase64 = getBase64Image('d:/my_projects/node_pdf/public/images/footer-logo.png');

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
        totalBankPortfolio
      },
      pieChart,
    });
    const pdf = await htmlToPDF(html);

    res.contentType('application/pdf');
    res.send(pdf);
  } catch(error) {
    console.error('Error fetching the users: ', error);
    res.status(500).send('No users found.');
  }
});

router.get('/users', async(req, res) => {
  const data = {
    month: 'Jun',
    year: '2024',
    accountName: 'Jane Peterson',
    unitTrustsValue: 2000000,
    structuredProductsValue: 100000,
    equitiesValue: 800000,
    fixedIncomeValue: 1500000,
    moneyMarketValue: 1000000,
    lastMonthAUM: 5700000,
    cifNumber: 'R23500000'
  }

  console.log(data);

  try {
    const pieChart = await generatePortfolioPieChart(data);
    const totalBankPortfolio = await getFcbsDepositsByCifNumber(data.cifNumber);

    const headerLogoBase64 = getBase64Image('d:/my_projects/node_pdf/public/images/header-logo.png');
    const headerBgBase64 = getBase64Image('d:/my_projects/node_pdf/public/images/header-bg.png');
    const footerLogoBase64 = getBase64Image('d:/my_projects/node_pdf/public/images/footer-logo.png');

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
        totalBankPortfolio
      },
      pieChart
    });
    const pdf = await htmlToPDF(html);

    res.contentType('application/pdf');
    res.send(pdf);
  } catch(error) {
    console.error('Error fetching the users: ', error);
    res.status(500).send('No users found.');
  }
});


export default router;