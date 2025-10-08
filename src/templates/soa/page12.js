
import { formatPesos, formatDateToShort } from '../../helpers/utils.js';

export default ({trustEquities}) => `
  <div class="page-header">
    <span>Trust Portfolio</span>
  </div>

  <div class="content-section">
    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-bottom:24px;">
      <div>
        <div style="font-size:24px; font-weight:bold;">IMA Account Name: ${trustEquities[0]?.accountName || ""}</div>
        <div style="font-size:24px; font-weight:bold;">Account Number: ${trustEquities[0]?.cifNumber || ""}</div>
      </div>
    </div>
    <!-- PESO UITF Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:18px; font-weight:bold; margin-bottom:12px;">UITF(PESO)</h2>
      <div style="border:1px solid #000; border-radius:8px; overflow-x:auto;">
        <table class="table-center" style="width:85%; font-size:12px;">
          <thead>
            <tr>
              <th style="text-align:left;">Product Description</th>
              <th >Reference No.</th>
              <th >Value Date</th>
              <th>Purchase Amount</th>
              <th>No. of Units</th>
              <th>Cost Price</th>
              <th>Market Price</th>
              <th>Market Value</th>
              <th>Unrealized Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            ${trustEquities.map(equity => `
              <tr>
                <td style="text-align:left;">${equity.productDescription}</td>
                <td>${equity.referenceNumber}</td>
                <td>${formatDateToShort(equity.valueDate)}</td>
                <td>${formatPesos(equity.purchaseAmount)}</td>
                <td>${equity.noOfUnits}</td>
                <td>${formatPesos(equity.costPrice)}</td>
                <td>${formatPesos(equity.marketPrice)}</td>
                <td>${formatPesos(equity.marketValue)}</td>
                <td style="color:#16a34a;">${formatPesos(equity.unrealizedGainLoss)}</td>
              </tr>
            `).join('')}
            <tr>
              <td></td>
              <td></td>
              <td class="highlight">TOTAL</td>
              <td class="highlight">${formatPesos(trustEquities.reduce((acc, equity) => acc + equity.purchaseAmount, 0))}&#8593;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- USD UITF Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:18px; font-weight:bold; margin-bottom:12px;">UITF(USD)</h2>
      <div style="border:1px solid #000; border-radius:8px; overflow-x:auto;">
        <table style="width:85%; font-size:12px;">
          <thead>
            <tr>
              <th style="padding:8px 6px; text-align:left;">Product Description</th>
              <th style="padding:8px 6px; text-align:left;">Reference No.</th>
              <th style="padding:8px 6px; text-align:left;">Value Date</th>
              <th style="padding:8px 6px; text-align:right;">Purchase Amount</th>
              <th style="padding:8px 6px; text-align:right;">No. of Shares</th>
              <th style="padding:8px 6px; text-align:right;">Cost Price</th>
              <th style="padding:8px 6px; text-align:right;">Market Price</th>
              <th style="padding:8px 6px; text-align:right;">Market Value</th>
              <th style="padding:8px 6px; text-align:right;">Unrealized Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px 6px;">Money Market Fund</td>
              <td style="padding:8px 6px;">1234566</td>
              <td style="padding:8px 6px;">17-Mar-24</td>
              <td style="padding:8px 6px; text-align:right;">1,000,000.00</td>
              <td style="padding:8px 6px; text-align:right;">100</td>
              <td style="padding:8px 6px; text-align:right;">1.00</td>
              <td style="padding:8px 6px; text-align:right;">1.00</td>
              <td style="padding:8px 6px; text-align:right;">1.00</td>
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