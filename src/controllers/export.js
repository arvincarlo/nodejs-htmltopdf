import express from "express";
const router = express.Router();
import htmlToPDF from "../helpers/html-to-pdf.js";
import { generatePieChart, generateLineChart } from "../helpers/chartCanvas.js";
import { PrismaClient } from "@prisma/client";
import soaTemplate from "../templates/soa.js";
import summaryTemplate from '../templates/summary.js';
import getUserModel from "../models/users.js";
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
  try {
    const users = await getUserModel("all");
    const pieChart = await generatePieChart(users);
    const lineChart = await generateLineChart(users);

    // const html = soaTemplate(users, pieChart, lineChart);
    const headerLogoBase64 = getBase64Image('d:/my_projects/node_pdf/public/images/header-logo.png');
    const headerBgBase64 = getBase64Image('d:/my_projects/node_pdf/public/images/header-bg.png');

    const html = summaryTemplate({
      summaryTitle: "User Summary Report",
      summaryContent: "Total users: 100",
      headerLogoBase64,
      headerBgBase64,
      data,
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

router.get('/users', async(req, res) => {
  const data = req.body;
  try {
    const users = await getUserModel("all");
    const pieChart = await generatePieChart(users);
    const lineChart = await generateLineChart(users);

    // const html = soaTemplate(users, pieChart, lineChart);
    const headerLogoBase64 = getBase64Image('d:/my_projects/node_pdf/public/images/header-logo.png');
    const headerBgBase64 = getBase64Image('d:/my_projects/node_pdf/public/images/header-bg.png');

    const html = summaryTemplate({
      summaryTitle: "User Summary Report",
      summaryContent: "Total users: 100",
      headerLogoBase64,
      headerBgBase64,
      data: {
        month: 'Jun',
        accountName: 'Jane Peterson',
        unitTrustsValue: 2000000,
        structuredProductsValue: 100000,
        equitiesValue: 800000,
        fixedIncomeValue: 1500000,
        moneyMarketValue: 1000000
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