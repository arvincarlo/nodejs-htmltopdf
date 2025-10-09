import { formatPesos, getPercentage, getPercentageChange } from '../../helpers/utils.js';

export default ({
  month,
  year,
  accountName,
  overallTotalValue,
  lastMonthAUM,
  totalBankPortfolio,
  totalTrustPortfolio,
  totalCBCSecMarketValue,
  moneyMarketValue,
  fixedIncomeValue,
  equitiesValue,
  structuredProductsValue,
  unitTrustsValue,
  portfolioPieChart
}) => {
  return `
    <div style="padding: 32px;">
      <div class="document-title">Portfolio Holdings Statement</div>
      <div>
        as of ${month} ${year} for
      </div>
      <div class="summay-full-name uppercase">
        ${accountName}
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
                  <div class="amount font-weight-600">${formatPesos(overallTotalValue)}</div>
                </div>
              </div>
            </div>
            <div class="summay-card-subheader summay-card-content width-full flex items-center font-weight-600 border-bottom">
              Total AUM Last Month*
            </div>
            <div class="summay-card-content flex items-center border-bottom">
              <div>
                <div class="currency font-weight-600">PHP</div>
                <div class="amount font-weight-600">${formatPesos(lastMonthAUM)}</div>
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
                <div class="amount font-weight-600">${formatPesos(lastMonthAUM)}</div>
                <div class="change">
                  <div class="font-weight-600">% Change</div>
                  <div class="font-weight-600">
                    ${getPercentageChange(overallTotalValue, lastMonthAUM) > 0 
                      ? `+ ${getPercentageChange(overallTotalValue, lastMonthAUM)}% &#9650;` 
                      : `${getPercentageChange(overallTotalValue, lastMonthAUM)}% &#9660;` }
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
              </tr>
              <tr>
                <td class="summary-table-label text-primary">Total Bank Portfolio</td>
                <td>${formatPesos(totalBankPortfolio)}</td>
                <td>10,000.00</td>
                <td>10,000.00</td>
                <td>10,000.00</td>
                <td>10,000.00</td>
              </tr>
              <tr>
                <td class="summary-table-label text-primary">Total Trust Portfolio</td>
                <td>${formatPesos(totalTrustPortfolio)}</td>
                <td>5,000.00</td>
                <td>5,000.00</td>
                <td>5,000.00</td>
                <td>5,000.00</td>
              </tr>
              <tr>
                <td class="summary-table-label text-primary">Total CBC Securities Portfolio</td>
                <td>${formatPesos(totalCBCSecMarketValue)}</td>
                <td>13,000.00</td>
                <td>13,000.00</td>
                <td>13,000.00</td>
                <td>13,000.00</td>
              </tr>
              <tr>
                <td class="summary-table-label text-primary uppercase font-weight-700">Grand Total</td>
                <td>${formatPesos(totalBankPortfolio + totalTrustPortfolio + totalCBCSecMarketValue)}</td>
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
  `
}