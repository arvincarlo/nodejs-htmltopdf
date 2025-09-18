import express from "express";
const router = express.Router();
import htmlToPDF from "../helpers/html-to-pdf.js";
import { generatePieChart, generateLineChart } from "../helpers/chartCanvas.js";
import { PrismaClient } from "@prisma/client";
import soaTemplate from "../templates/soa.js";
import getUserModel from "../models/users.js";

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
  res.json({ status: 'OK', message: 'API is healthy' });
});

router.get('/users', async(req, res) => {
  try {
    const users = await getUserModel("all");
    const pieChart = await generatePieChart(users);
    const lineChart = await generateLineChart(users);

    const html = soaTemplate(users, pieChart, lineChart);
    const pdf = await htmlToPDF(html);    

    res.contentType('application/pdf');
    res.send(pdf);
  } catch(error) {
    console.error('Error fetching the users: ', error);
    res.status(500).send('No users found.');
  }
})


export default router;