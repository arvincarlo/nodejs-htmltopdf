import { formatPesos, formatDateToShort } from '../../helpers/utils.js';

export default ({CBSecMapping}) => `
  <div class="page-header">
    <span>Securities Portfolio</span>
  </div>

  <div class="content-section">
    <h2 style="font-size:18px; font-weight:bold;">Account Name: ${CBSecMapping[0].accountName || ''}</h2>
    <h2 style="font-size:18px; font-weight:bold; margin-bottom:12px;">Account Code: ${CBSecMapping[0].accountCode || ''}</h2>
    <h2 style="font-size:18px; font-weight:bold; margin-bottom:12px;">Security Ending Position</h2>

    <!-- PESO Equities Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:14px; font-weight:bold; margin-bottom:12px;">PHP</h2>
      <div style="border:1px solid #000; border-radius:8px; overflow-x:auto;">
        <table class="table-center" style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="text-align:left;">Stock Symbol</th>
              <th>Issue</th>
              <th>Net Purchase Amount</th>
              <th>No. of Shares</th>
              <th>Average Cost Price</th>
              <th>Market Price</th>
              <th>Market Value</th>
              <th>Unrealized Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            ${CBSecMapping.map(item => `
              <tr>
                <td style="text-align:left;">${item.stockSymbol || ''}</td>
                <td>${item.issue || ''}</td>
                <td>${formatPesos(item.netPurchaseAmount) || ''}</td>
                <td>${formatPesos(item.noOfShares) || ''}</td>
                <td>${formatPesos(item.costPrice) || ''}</td>
                <td>${formatPesos(item.marketPrice) || ''}</td>
                <td>${formatPesos(item.marketValue) || ''}</td>
                <td style="color:#16a34a;">${formatPesos(item.unrealizedGainLoss) || ''}&#8593;</td>
              </tr>
            `).join('')}
            <tr>
              <td></td>
              <td class="highlight">TOTAL</td>
              <td class="highlight">${formatPesos(CBSecMapping.reduce((acc, item) => acc + item.netPurchaseAmount, 0)) || ''}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- USD Equities Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:14px; font-weight:bold; margin-bottom:12px;">USD</h2>
      <div style="border:1px solid #000; border-radius:8px; overflow-x:auto;">
        <table style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="padding:8px 6px; text-align:left;">Stack Symbol</th>
              <th style="padding:8px 6px; text-align:left;">Issue</th>
              <th style="padding:8px 6px; text-align:left;">Net Purchase</th>
              <th style="padding:8px 6px; text-align:right;">No. of Shares</th>
              <th style="padding:8px 6px; text-align:right;">Average Cost Price</th>
              <th style="padding:8px 6px; text-align:right;">Market Price</th>
              <th style="padding:8px 6px; text-align:right;">Market Value</th>
              <th style="padding:8px 6px; text-align:right;">Unrealized Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px 6px;">JFC</td>
              <td style="padding:8px 6px;">
                Jollibee Foods Corporation<br>
                Series B - Preferred Shares
              </td>
              <td style="padding:8px 6px; text-align:right;">1,000,001.00</td>
              <td style="padding:8px 6px; text-align:right;">100</td>
              <td style="padding:8px 6px; text-align:right;">1,000.00</td>
              <td style="padding:8px 6px; text-align:right;">1,000.00</td>
              <td style="padding:8px 6px; text-align:right;">1,000.00</td>
              <td style="padding:8px 6px; text-align:right; color:#16a34a;">1.00&#8593;</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td style="font-weight:bold; text-align:center;">TOTAL</td>
              <td style="background:#fff9e6; padding:8px 6px; font-weight:bold;">14.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
`