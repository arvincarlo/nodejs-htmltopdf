import fs from 'fs';
import path from 'path';

const cssPath = path.join(process.cwd(), 'src', 'templates', 'soa', 'template.css');
const css = fs.readFileSync(cssPath, 'utf8');


const summaryTemplate = ({
  summaryTitle = "Summary Report",
  headerLogoBase64,
  headerBgBase64,
  footerLogoBase64,
  pages = [],
  preview = false,
}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${summaryTitle}</title>
    <style>${css}</style>
  </head>
  <body>
    ${pages.map(({ component, props = {} }, idx) => `
      <div class="main-wrapper">
        <div class="header" style="background-image: url('${headerBgBase64}'); background-size: cover;">
          <div class="header-logo" style="position: ${preview ? "relative" : "absolute"}; top: 28px; left: 28px;">
            <img src="${headerLogoBase64}" />
          </div>
        </div>
        <div class="summary-content-area">
          ${typeof component === "function" ? component({ ...props, idx }) : component}
        </div>
        <img class="footer-logo-fixed" src="${footerLogoBase64}" alt="Footer Logo" />
      </div>
      ${idx < pages.length - 1 ? '<div class="page-break"></div>' : ''}
    `).join('')}
  </body>
</html>
`;

export default summaryTemplate;