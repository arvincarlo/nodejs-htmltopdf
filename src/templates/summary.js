function formatPesos(value) {
  if (typeof value !== 'number') value = Number(value) || 0;
  return value.toLocaleString('en-PH', { currency: 'PHP', minimumFractionDigits: 2 });
}

function getPercentage(value, total) {
  if (!total || isNaN(value) || isNaN(total)) return 0;
  return Math.round((Number(value) / Number(total)) * 100);
}

const summaryTemplate = ({
  preview = false,
  summaryTitle = "Summary Report",
  headerLogoBase64 = headerLogoBase64,
  headerBgBase64 = headerBgBase64,
  footerLogoBase64 = footerLogoBase64, 
  data,
  pieChart,
}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${summaryTitle}</title>
    <style>
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
      }
      .main-wrapper {
        position: relative;
        height: auto;
      .footer-logo-fixed {
        position: fixed;
        right: 40px;
        bottom: 40px;
        width: 166.13px;
        height: auto;
        z-index: 999;
      }
      .header {
        width: 100%;
        height: 151px;
        margin: 0;
        padding: 0;
        background-image: url('${headerBgBase64}');
        background-size: cover;
        position: relative;
      }
      .header-logo {
        position: ${preview ? "relative" : "absolute"};
        top: 28px;
        left: 28px;
      }
      .header-logo img {
        width: 320px;
        height: auto;
      }
      .summary-content-area {
        height: calc(100vh - 151px);
        overflow-y: auto;
        padding: 20px;
        box-sizing: border-box;
      }
      .page-break {
        page-break-before: always;
      }
      .width-full {
        width: 100%;
      }
      .height-full {
        height: 100%;
      }
      .text-primary {
        color: #c60d0d;
      }
      .text-white {
        color: #ffffff;
      }
      .text-center {
        text-align: center;
      }
      .bg-primary {
        background-color: #c60d0d;
      }
      .flex {
        display: flex;
      }
      .gap-10px {
        gap: 10px;
      }
      .gap-30px {
        gap: 30px;
      }
      .items-center {
        align-items: center;
      }
      .justify-center {
        justify-content: center;
      }
      .justify-space-between {
        justify-content: space-between;
      }
      .font-weight-500 {
        font-weight: 500;
      }
      .font-weight-600 {
        font-weight: 600;
      }
      .font-weight-700 {
        font-weight: 700;
      }
      .uppercase {
        text-transform: uppercase;
      }
      .border-bottom {
        border-bottom: 1px solid #000000;
      }
      .margin-top {
        margin-top: 10px;
      }
      .padding-10px {
        padding: 10px;
      }
      .document-title {
        font-size: 40px;
      }
      .title-sub {
        font-size: 20px;
        line-height: 30px;
      }
      .summay-full-name {
        padding: 20px 0px;
      }
      .summary-cards {
        width: 20%;
        margin-right: 20px;
        height: 801px;
        min-width: 352px;
        box-sizing: border-box;
      }
      .summary-breakdown {
        width: 80%;
      }
      .summary-table {
        width: 1160px;
        height: 329px;
        border: 1px solid #000000;
        border-radius: 10px;
        border-collapse: separate;
        border-spacing: 0;
        overflow: hidden;
        box-sizing: border-box;
      }
      .summary-table-header {
        border-radius: 10px 10px 0 0;
      }
      .summary-table .summary-table-heading-1 {
        width: 25%;
        border-right: 2px solid #ffffff;
        margin-right: 15px;
        box-sizing: border-box;
      }
      .summary-table-heading-2 {
        width: 75%;
        margin-right: 15px;
      }
      .summary-table td {
        padding: 10px;
        font-size: 15px;
        line-height: 22.5px;
        white-space: nowrap;
      }
      .summary-portfolio-holdings {
        width: 816px;
        margin-top: 28px;
        border: 1px solid #000000;
        border-radius: 10px;
      }
      .summay-card {
        height: 801px;
        border: 1px solid #000000;
        border-radius: 10px;
      }
      .summay-card-header {
        height: 86px;
        padding: 35px;
        color: #ffffff;
        font-size: 24px;
        line-height: 36px;
        border-radius: 10px 10px 0px 0px;
        box-sizing: border-box;
      }
      .summay-card-subheader {
        height: 59px;
      }
      .summary-table-label {
        border-right: 2px solid #ffd0d0;
      }
      .summay-card-content {
        padding: 35px;
        box-sizing: border-box;
      }
      .summay-card-content-total-aum {
        height: 279px;
        background-color: #ecca73;
      }
      .summay-card-content-total-aum .amount {
        font-size: 38px;
        line-height: 57px;
      }
      .currency {
        font-size: 16px;
        line-height: 24px;
      }
      .change {
        padding: 10px 0;
        font-size: 16px;
        line-height: 24px;
      }
      .report-note {
        font-size: 11px;
        line-height: 16.5px;
      }
      .donut-chart {
        width: 277.12px;
        height: 277.12px;
      }
      .donut-chart-legend {
        width: 224.73px;
        height: 224.73px;
      }
      .donut-chart-title {
        margin: 15px;
        font-size: 20px;
        line-height: 30px;
      }
      /* Container for the donut chart */
      .donut-chart-container {
        width: 270px;
        height: 270px;
        margin-bottom: 10px;
        border-radius: 50%;
        position: relative;
        display: inline-block;
        border: 3px solid #6f2727;
      }
      /* Inner circle (the hole in the donut) */
      .donut-chart-container:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 112px;
        height: 112px;
        background-color: white;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        border: 3px solid #6f2727;
      }
      /* Label inside slices */
      .donut-label {
        position: absolute;
        font-family: Arial, sans-serif;
        font-size: 18.37px;
        line-height: 27.56px;
        font-weight: 700;
        text-align: center;
        transform: translate(-50%, -50%);
        display: inline-block;
        padding: 2px 10px;
        white-space: nowrap;
        text-wrap: balance;
      }
      /* Label text (percent) */
      .donut-label .percentage {
        font-size: 18.37px;
        line-height: 27.56px;
        font-weight: 700;
      }
      /* Label text (category) */
      .donut-label .category {
        font-size: 11.72px;
        line-height: 17.52px;
        font-weight: 400;
      }
      /* Position labels dynamically inside each slice */
      .label-1 {
        top: 25%;
        left: 50%;
        color: black;
      }
      .label-2 {
        top: 45%;
        left: 75%;
        color: white;
      }
      .label-3 {
        top: 65%;
        left: 75%;
        color: white;
      }
      .label-4 {
        top: 80%;
        left: 50%;
        color: black;
      }
      .label-5 {
        top: 65%;
        left: 30%;
        color: white;
      }
      .chart-container {
        width: 40%;
        height: 444px;
        border-right: 1px solid #000000;
      }
      .chart-breakdown-container {
        width: 60%;
      }
      .chart-breakdown-table {
        margin-top: 0px !important;
        height: 100%;
        border-radius: 0px 10px 0px 0px;
        border-collapse: collapse;
        border-spacing: 0;
        overflow: hidden;
        margin-bottom: 0;
        padding: 0;
      }
      .chart-breakdown-table td:last-child {
        border-right: none;
      }
      .chart-breakdown-table tr:last-child td {
        padding-bottom: 0;
      }
      .chart-breakdown-label {
        font-size: 15px;
        line-height: 22.5px;
      }
      .chart-breakdown-heading {
        font-size: 16px;
        line-height: 24px;
      }
      .portfolio-class {
        padding: 10px;
        font-size: 15px;
        line-height: 22.5px;
      }
      /* Add borders only to left and right of current value in PHP */
      .chart-breakdown-table tr td:nth-child(2):not(.chart-breakdown-heading) {
        border-left: 1px solid #000000;
        border-right: 1px solid #000000;
      }
      .square-indicator {
        width: 13.22px;
        height: 13.22px;
      }
      .php {
        background-color: #ff8b8b;
      }
      .usd {
        background-color: #8e0000;
      }
      .eur {
        background-color: #590000;
      }
      .cny {
        background-color: #e30c0c;
      }
      .jpy {
        background-color: #ffbfbf;
      }
      .summary-appendix-container {
        position: relative;
        height: 150px;
      }
      .summary-appendix {
        margin-top: 40px;
        font-size: 11.51px;
        line-height: 17.26px;
      }
      .footer-logo {
        width: 166.13px;
        height: auto;
        position: absolute;
        right: 0;
        bottom: 0;
      }
      .pie-chart-container {
        min-width: 270px;
        min-height: 270px;
        background: #f8fafc;
        border-radius: 10px;
        padding: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pie-chart-container img {
        display: block;
        width: 270px;
        height: 270px;
        object-fit: contain;
      }
      .legend-container {
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="main-wrapper">
      <div class="header">
        <div class="header-logo">
          <img src="${headerLogoBase64}" />
        </div>
      </div>
      <div class="summary-content-area">
        <div class="document-title">Portfolio Holdings Statement</div>
        <div>
          as of ${data.month} ${data.year} for
        </div>
        <div class="summay-full-name uppercase">
          ${data.accountName}
        </div>
        <div class="flex gap-10px"> 
          <div class="summary-cards">
            <div class="summay-card">
              <div class="summay-card-header flex items-center bg-primary">
                Total AUM This Month
              </div>
              <div class="summay-card-content-total-aum width-full summay-card-content border-bottom">
                <div class="height-full flex items-center">
                  <div>
                    <div class="currency font-weight-600">PHP</div>
                    <div class="amount font-weight-600">${formatPesos(data.totalValue)}</div>
                  </div>
                </div>
              </div>
              <div class="summay-card-subheader summay-card-content width-full flex items-center font-weight-600 border-bottom">
                Total AUM Last Month*
              </div>
              <div class="summay-card-content flex items-center border-bottom">
                <div>
                  <div class="currency font-weight-600">PHP</div>
                  <div class="amount font-weight-600">525,400,032.96</div>
                  <div class="report-note text-primary font-weight-500">
                    *Based on last month’s report
                  </div>
                </div>
              </div>
              <div class="summay-card-subheader summay-card-content flex items-center font-weight-600 border-bottom">
                AUM Change
              </div>
              <div class="summay-card-content flex items-center">
                <div>
                  <div class="currency font-weight-600">PHP</div>
                  <div class="amount font-weight-600">525,400,032.96</div>
                  <div class="change">
                    <div class="font-weight-600">% Change</div>
                    <div class="font-weight-600">+9.5% &#9650;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="summary-breakdown">
            <table class="summary-table">
              <tbody class="font-weight-600">
                <tr class="summary-table-header bg-primary text-white">
                  <td class="summary-table-heading-1">Portfolio Summary</td>
                  <td class="summary-table-heading-2" colspan="6">
                    Current Value in Original Currency
                  </td>
                </tr>
                <tr>
                  <td class="summary-table-label"></td>
                  <td class="text-primary">PHP</td>
                  <td class="text-primary">USD<sup>1</sup></td>
                  <td class="text-primary">EUR<sup>2</sup></td>
                  <td class="text-primary">CNY<sup>3</sup></td>
                  <td class="text-primary">JPY<sup>4</sup></td>
                  <td class="text-primary">Others</td>
                </tr>
                <tr>
                  <td class="summary-table-label text-primary">Total Bank Portfolio</td>
                  <td>12,000,000.00</td>
                  <td>10,000.00</td>
                  <td>10,000.00</td>
                  <td>10,000.00</td>
                  <td>10,000.00</td>
                  <td>10,000.00</td>
                </tr>
                <tr>
                  <td class="summary-table-label text-primary">Total Trust Portfolio</td>
                  <td>3,000,000.00</td>
                  <td>5,000.00</td>
                  <td>5,000.00</td>
                  <td>5,000.00</td>
                  <td>5,000.00</td>
                  <td>5,000.00</td>
                </tr>
                <tr>
                  <td class="summary-table-label text-primary">Total CBC Securities Portfolio</td>
                  <td>9,000,000.00</td>
                  <td>13,000.00</td>
                  <td>13,000.00</td>
                  <td>13,000.00</td>
                  <td>13,000.00</td>
                  <td>13,000.00</td>
                </tr>
                <tr>
                  <td class="summary-table-label text-primary uppercase font-weight-700">Grand Total</td>
                  <td>24,000,000.00</td>
                  <td>28,000.00</td>
                  <td>28,000.00</td>
                  <td>28,000.00</td>
                  <td>28,000.00</td>
                  <td>28,000.00</td>
                </tr>
              </tbody>
            </table>
            <div class="flex gap-30px">
              <div class="summary-portfolio-holdings">
                <div class="flex">
                  <div class="chart-container">
                    <div class="donut-chart-title font-weight-600">
                      Product Holdings
                    </div>
                    <div class="flex align-center justify-center">
                      <div class="pie-chart-container">
                        <img src="${pieChart}" width="420" height="420" />
                      </div>
                    </div>
                  </div>
                  <div class="chart-breakdown-container">
                    <table class="chart-breakdown-table width-full">
                      <tbody>
                        <tr class="chart-breakdown-header">
                          <td class="chart-breakdown-heading text-white text-center font-weight-700 bg-primary">
                            Product Name
                          </td>
                          <td class="chart-breakdown-heading text-white text-center font-weight-700 bg-primary">
                            Current Value<br />in PHP
                          </td>
                          <td class="chart-breakdown-heading text-white text-center font-weight-700 bg-primary">
                            % of Portfolio
                          </td>
                        </tr>
                        <tr>
                          <td class="chart-breakdown-label padding-10px text-primary font-weight-600">Money Market</td>
                          <td class="text-center">${formatPesos(data.moneyMarketValue)}</td>
                          <td class="text-center">${getPercentage(data.moneyMarketValue, data.totalValue)}%</td>
                        </tr>
                        <tr>
                          <td class="chart-breakdown-label padding-10px text-primary font-weight-600">Fixed Income</td>
                          <td class="text-center">${formatPesos(data.fixedIncomeValue)}</td>
                          <td class="text-center">${getPercentage(data.fixedIncomeValue, data.totalValue)}%</td>
                        </tr>
                        <tr>
                          <td class="chart-breakdown-label padding-10px text-primary font-weight-600">Equities</td>
                          <td class="text-center">${formatPesos(data.equitiesValue)}</td>
                          <td class="text-center">${getPercentage(data.equitiesValue, data.totalValue)}%</td>
                        </tr>
                        <tr>
                          <td class="chart-breakdown-label padding-10px text-primary font-weight-600">Structured Products<br />& Other Investments</td>
                          <td class="text-center">${formatPesos(data.structuredProductsValue)}</td>
                          <td class="text-center">${getPercentage(data.structuredProductsValue, data.totalValue)}%</td>
                        </tr>
                        <tr>
                          <td class="chart-breakdown-label padding-10px text-primary font-weight-600">Unit Trusts</td>
                          <td class="text-center">${formatPesos(data.unitTrustsValue)}</td>
                          <td class="text-center">${getPercentage(data.unitTrustsValue, data.totalValue)}%</td>
                        </tr>
                        <tr>
                          <td class="chart-breakdown-label padding-10px uppercase text-primary font-weight-600">Total</td>
                          <td class="text-center">${formatPesos(data.totalValue)}</td>
                          <td class="text-center">100%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="legend-container">
                <div class="font-weight-600">Currency</div>
                <div class="flex">
                  <div class="flex align-center justify-center -mt-6 -ml-2">
                    <div class="pie-chart-container">
                        <img src="${pieChart}" width="420" height="420" />
                      </div>
                  </div>
                </div>
                <div class="summary-appendix-container">
                  <div class="summary-appendix text-primary">
                    <div>Foreign Currency Exchange Rates as of April 23, 2024</div>
                    <div>1 USD - 58.00</div>
                    <div>2 EUR - 67.00</div>
                    <div>3 CNY - 45.00</div>
                    <div>4 JPY - 50.00</div>
                  </div>
                  <img class="footer-logo" src="./images/footer-logo.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img class="footer-logo-fixed" src="${footerLogoBase64}" alt="Footer Logo" />
    </div>
    <!-- Page 2 -->
    <div class="main-wrapper">
      <div class="header">
        <div class="header-logo">
          <img src="${headerLogoBase64}" />
        </div>
      </div>
      <div class="summary-content-area">
        <div class="document-title">Page 2 Title</div>
        <div>
          This is page 2 content. Add your details here.
        </div>
      </div>
      <img class="footer-logo-fixed" src="${footerLogoBase64}" alt="Footer Logo" />
    </div>

    <!-- Page 3 -->
    <div class="main-wrapper">
      <div class="header">
        <div class="header-logo">
          <img src="${headerLogoBase64}" />
        </div>
      </div>
      <div class="summary-content-area">
        <div class="document-title">Page 3 Title</div>
        <div>
          This is page 3 content. Add your details here.
        </div>
      </div>
      <img class="footer-logo-fixed" src="${footerLogoBase64}" alt="Footer Logo" />
    </div>

    <!-- Page 4 -->
    <div class="main-wrapper">
      <div class="header">
        <div class="header-logo">
          <img src="${headerLogoBase64}" />
        </div>
      </div>
      <div class="summary-content-area">
        <div class="document-title">Page 4 Title</div>
        <div>
          This is page 4 content. Add your details here.
        </div>
      </div>
      <img class="footer-logo-fixed" src="${footerLogoBase64}" alt="Footer Logo" />
    </div>

    <!-- Page 5 -->
    <div class="main-wrapper">
      <div class="header">
        <div class="header-logo">
          <img src="${headerLogoBase64}" />
        </div>
      </div>
      <div class="summary-content-area">
        <div class="document-title">Page 5 Title</div>
        <div>
          This is page 5 content. Add your details here.
        </div>
      </div>
      <img class="footer-logo-fixed" src="${footerLogoBase64}" alt="Footer Logo" />
    </div>

    <!-- Page 6 -->
    <div class="main-wrapper">
      <div class="header">
        <div class="header-logo">
          <img src="${headerLogoBase64}" />
        </div>
      </div>
      <div class="summary-content-area">
        <div class="document-title">Page 6 Title</div>
        <div>
          This is page 6 content. Add your details here.
        </div>
      </div>
      <img class="footer-logo-fixed" src="${footerLogoBase64}" alt="Footer Logo" />
    </div>
  </body>
</html>
`;

export default summaryTemplate;