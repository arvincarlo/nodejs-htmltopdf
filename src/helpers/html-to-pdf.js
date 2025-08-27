import puppeteer from "puppeteer";

const defaultOptions = {
  format: 'A4',
  printBackground: true
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