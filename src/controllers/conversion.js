import express from "express";
const router = express.Router();
import htmlToPDF from "../helpers/html-to-pdf.js";

router.post('/', async (req, res) => {
  // res.send('Conversion endpoint');.
  const { html } = req.body;
  console.log(html);

  // Check if falsy
  if (!html) return res.status(400).send('HTML content is required');

  const pdf = await htmlToPDF(html);
  res.contentType('application/pdf');
  res.send(pdf);
});

export default router;