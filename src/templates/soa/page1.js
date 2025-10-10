import { formatPesos, getPercentage, getPercentageChange, getLastDayOfMonth } from '../../helpers/utils.js';

export default ({
  month,
  year,
  accountName,
  overallTotalValue,
  totalBankPortfolio,
  totalTrustPortfolio,
  totalCBSecMarketValue,
  moneyMarketValue,
  fixedIncomeValue,
  equitiesValue,
  structuredProductsValue,
  unitTrustsValue,
  portfolioPieChart,
  prevMonthAUM,
  currency
}) => {
  const showUSD = currency.includes(1);
  const showEUR = currency.includes(2);
  const showCNY = currency.includes(3);
  const showJPY = currency.includes(4);

  return `
    <div style="padding: 32px;">
      <div class="document-title font-weight-700">Portfolio Holdings Statement</div>
      <div>
        as of ${getLastDayOfMonth(month, year)} for
      </div>
      <div class="summary-full-name uppercase">
        ${accountName}
      </div>
      <div class="flex gap-10px"> 
        <div class="summary-cards">
          <div class="summary-card">
            <div class="summary-card-header flex items-center bg-primary fs-20 fw-bold">
              Total AUM as of ${getLastDayOfMonth(month, year)}
            </div>
            <div class="summary-card-content-total-aum width-full summary-card-content border-bottom">
              <div class="height-full flex items-center">
                <div>
                  <div class="currency font-weight-600">PHP</div>
                  <div class="amount font-weight-600">${formatPesos(overallTotalValue)}</div>
                </div>
              </div>
            </div>
            <div class="summary-card-subheader summary-card-content width-full flex items-center font-weight-600 border-bottom">
              Total AUM Last Month*
            </div>
            <div class="summary-card-content flex items-center border-bottom">
              <div>
                <div class="currency font-weight-600">PHP</div>
                <div class="amount font-weight-600 fs-30">${formatPesos(prevMonthAUM)}</div>
                <div class="report-note text-primary font-weight-500">
                  *Based on last month’s ending balance
                </div>
              </div>
            </div>
            <div class="summary-card-subheader summary-card-content flex items-center font-weight-600 border-bottom">
              AUM Change
            </div>
            <div class="summary-card-content flex items-center">
              <div>
                <div class="currency font-weight-600">PHP</div>
                <div class="amount font-weight-600 fs-24">${formatPesos(prevMonthAUM)}</div>
                <div class="change">
                  <div class="font-weight-600">% Change</div>
                  <div class="font-weight-600 fs-24">
                    ${getPercentageChange(overallTotalValue, prevMonthAUM) > 0 
                      ? `+ ${getPercentageChange(overallTotalValue, prevMonthAUM)}% &#9650;` 
                      : `${getPercentageChange(overallTotalValue, prevMonthAUM)}% &#9660;` }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="summary-breakdown">
          <table class="summary-table">
            <tbody class="font-weight-600">
              <tr class="summary-table-header bg-primary text-white">
                <td class="summary-table-heading-1 fs-16 fw-bold">Portfolio Summary</td>
                <td class="summary-table-heading-2 fs-16 fw-bold" colspan="6">
                  Current Value in Original Currency
                </td>
              </tr>
              <tr>
                <td class="summary-table-label"></td>
                <td class="text-primary text-center fw-bold">PHP</td>
                ${showUSD ? `<td class="text-primary text-center fw-bold">USD<sup>1</sup></td>` : ''}
                ${showEUR ? `<td class="text-primary text-center fw-bold">EUR<sup>2</sup></td>` : ''} 
                ${showCNY ? `<td class="text-primary text-center fw-bold">CNY<sup>3</sup></td>` : ''}
                ${showJPY ? `<td class="text-primary text-center fw-bold">JPY<sup>4</sup></td>` : ''}
              </tr>
              <tr>
                <td class="summary-table-label text-primary fw-bold">Total Bank Portfolio</td>
                <td class="text-center">${formatPesos(totalBankPortfolio[0])}</td>
                ${showUSD ? `<td class="text-center">${formatPesos(totalBankPortfolio[1])}</td>` : ''}
                ${showEUR ? `<td class="text-center">10,000.00</td>` : ''}
                ${showCNY ? `<td class="text-center">10,000.00</td>` : ''}
                ${showJPY ? `<td class="text-center">10,000.00</td>` : ''}
              </tr>
              <tr>
                <td class="summary-table-label text-primary fw-bold">Total Trust Portfolio</td>
                <td class="text-center">${formatPesos(totalTrustPortfolio[0])}</td>
                ${showUSD ? `<td class="text-center">${formatPesos(totalTrustPortfolio[1])}</td>` : ''} 
                ${showEUR ? `<td class="text-center">5,000.00</td>` : ''}
                ${showCNY ? `<td class="text-center">5,000.00</td>` : ''}
                ${showJPY ? `<td class="text-center">5,000.00</td>` : ''}
              </tr>
              <tr>
                <td class="summary-table-label text-primary fw-bold">Total CBC Securities Portfolio</td>
                <td class="text-center">${formatPesos(totalCBSecMarketValue[0])}</td>
                ${showUSD ? `<td class="text-center">${formatPesos(totalCBSecMarketValue[1])}</td>` : ''}
                ${showEUR ? `<td class="text-center">13,000.00</td>` : ''}
                ${showCNY ? `<td class="text-center">13,000.00</td>` : ''}
                ${showJPY ? `<td class="text-center">13,000.00</td>` : ''}
              </tr>
              <tr>
                <td class="summary-table-label text-primary fw-bold uppercase font-weight-700">Grand Total</td>
                <td class="fw-bold text-center">${formatPesos(totalBankPortfolio[0] + totalTrustPortfolio[0] + totalCBSecMarketValue[0])}</td>
                ${showUSD ? `<td class="fw-bold text-center">${formatPesos(totalBankPortfolio[1] + totalTrustPortfolio[1] + totalCBSecMarketValue[1])}</td>` : ''}
                ${showEUR ? `<td class="fw-bold text-center">28,000.00</td>` : ''}
                ${showCNY ? `<td class="fw-bold text-center">28,000.00</td>` : ''}
                ${showJPY ? `<td class="fw-bold text-center">28,000.00</td>` : ''}
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
                      <img src="${portfolioPieChart}" alt="Portfolio Pie Chart" width="420" height="420" />
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
                        <td class="text-center">${formatPesos(moneyMarketValue)}</td>
                        <td class="text-center">${getPercentage(moneyMarketValue, overallTotalValue)}%</td>
                      </tr>
                      <tr>
                        <td class="chart-breakdown-label padding-10px text-primary font-weight-600">Fixed Income</td>
                        <td class="text-center">${formatPesos(fixedIncomeValue)}</td>
                        <td class="text-center">${getPercentage(fixedIncomeValue, overallTotalValue)}%</td>
                      </tr>
                      <tr>
                        <td class="chart-breakdown-label padding-10px text-primary font-weight-600">Equities</td>
                        <td class="text-center">${formatPesos(equitiesValue)}</td>
                        <td class="text-center">${getPercentage(equitiesValue, overallTotalValue)}%</td>
                      </tr>
                      <tr>
                        <td class="chart-breakdown-label padding-10px text-primary font-weight-600">Structured Products<br />& Other Investments</td>
                        <td class="text-center">${formatPesos(structuredProductsValue)}</td>
                        <td class="text-center">${getPercentage(structuredProductsValue, overallTotalValue)}%</td>
                      </tr>
                      <tr>
                        <td class="chart-breakdown-label padding-10px text-primary font-weight-600">Unit Trusts</td>
                        <td class="text-center">${formatPesos(unitTrustsValue)}</td>
                        <td class="text-center">${getPercentage(unitTrustsValue, overallTotalValue)}%</td>
                      </tr>
                      <tr>
                        <td class="chart-breakdown-label padding-10px uppercase text-primary font-weight-600">Total</td>
                        <td class="text-center">${formatPesos(overallTotalValue)}</td>
                        <td class="text-center">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="legend-container">
              <div class="currency-section">
                <div class="font-weight-600">Currency</div>
                <div class="flex">
                  <div class="flex align-center justify-center -mt-6 -ml-2">
                    <div class="pie-chart-container">
                        <img src="${portfolioPieChart}" alt="Portfolio Pie Chart" width="420" height="420" />
                      </div>
                  </div>
                </div>
              </div>
              <div class="summary-appendix-container">
                <div class="summary-appendix text-primary">
                  <div>Foreign Currency Exchange Rates as of ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                  ${showUSD ? `<div>1 USD - 58.00</div>` : ''}
                  ${showEUR ? `<div>2 EUR - 67.00</div>` : ''}
                  ${showCNY ? `<div>3 CNY - 45.00</div>` : ''}
                  ${showJPY ? `<div>4 JPY - 50.00</div>` : ''}
                </div>
                <img class="footer-logo" src="./images/footer-logo.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}