import puppeteer from "puppeteer";

const defaultOptions = {
  format: 'A3', // Largest ISO PDF format
  printBackground: true,
  landscape: true,
}

async function htmlToPDF(html, options = defaultOptions) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: 'domcontentloaded'
  });

  const pdfBuffer = await page.pdf(options);

  return pdfBuffer;
}

export default htmlToPDF;