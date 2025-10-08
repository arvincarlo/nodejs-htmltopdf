import { formatPesos, formatDateToShort } from '../../helpers/utils.js';

export default ({trustFixedIncome}) => `
  <div class="page-header">
    <span>Trust Portfolio</span>
  </div>

  <div class="content-section">
    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-bottom:24px;">
      <div>
        <div style="font-size:24px; font-weight:bold;">IMA Account Name: ${trustFixedIncome[0]?.accountName || ""}</div>
        <div style="font-size:24px; font-weight:bold;">Account Number: ${trustFixedIncome[0]?.cifNumber || ""}</div>
      </div>
    </div>
    <!-- PESO Fixed Income Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:18px; font-weight:bold; margin-bottom:12px;">Fixed Income (PHP)</h2>
      <div style="border:1px solid #000; border-radius:8px; overflow-x:auto;">
        <table class="table-center" style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="text-align:left;">Product Description</th>
              <th>Reference No.</th>
              <th>Value Date</th>
              <th>Face Amount</th>
              <th>Interest Rate</th>
              <th>Maturity Date</th>
              <th>Next Coupon Date</th>
              <th>Cost Price</th>
              <th>Market Price</th>
              <th>Market Value</th>
              <th>Unrealized Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align:left;">${trustFixedIncome[0]?.ccy || ""}</td>
            </tr>
            ${trustFixedIncome.map(item => `
              <tr>
                <td style="text-align:left;">${item?.productDescription || ""}</td>
                <td>${item?.referenceNumber || ""}</td>
                <td>${formatDateToShort(item?.valueDate) || ""}</td>
                <td>${item?.faceAmount || ""}</td>
                <td>${item?.interestRate || ""}</td>
                <td>${formatDateToShort(item?.maturityDate) || ""}</td>
                <td>${formatDateToShort(item?.nextCouponDate) || ""}</td>
                <td>${formatPesos(item?.costPrice) || ""}</td>
                <td>${formatPesos(item?.marketPrice) || ""}</td>
                <td>${formatPesos(item?.marketValue) || ""}</td>
                <td>${item?.unrealizedGainLoss || ""}</td>
              </tr>
            `).join('')}
            <tr>
              <td colspan="2"></td>
              <td class="highlight">TOTAL</td>
              <td class="highlight">${formatPesos(trustFixedIncome.reduce((acc, item) => acc + (item?.faceAmount || 0), 0))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- USD Fixed Income Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:18px; font-weight:bold; margin-bottom:12px;">Fixed Income (USD)</h2>
      <div style="border:1px solid #000; border-radius:8px; overflow-x:auto;">
        <table style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="padding:8px 6px; text-align:left;">Product Description</th>
              <th style="padding:8px 6px; text-align:left;">Reference No.</th>
              <th style="padding:8px 6px; text-align:left;">Value Date</th>
              <th>Purchase Amount</th>
              <th style="padding:8px 6px; text-align:right;">No. of Shares</th>
              <th style="padding:8px 6px; text-align:right;">Dividend Rate</th>
              <th style="padding:8px 6px; text-align:left;">Optional Redemption Date</th>
              <th style="padding:8px 6px; text-align:right;">Cost Price</th>
              <th style="padding:8px 6px; text-align:right;">Market Price</th>
              <th style="padding:8px 6px; text-align:right;">Market Value</th>
              <th style="padding:8px 6px; text-align:right;">Unrealized Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px 6px;">
                PHP<br>
                Jollibee Food Corporation<br>
                Series B - Preferred Shares
              </td>
              <td style="padding:8px 6px;">1234566</td>
              <td style="padding:8px 6px;">17-Mar-24</td>
              <td style="padding:8px 6px; text-align:right;">1,000,000.00</td>
              <td style="padding:8px 6px; text-align:right;">100</td>
              <td style="padding:8px 6px; text-align:right;">1.0000%</td>
              <td style="padding:8px 6px;">17-Mar-24</td>
              <td style="padding:8px 6px; text-align:right;">1.00</td>
              <td style="padding:8px 6px; text-align:right;">1.00</td>
              <td style="padding:8px 6px; text-align:right;">1.00</td>
              <td style="padding:8px 6px; text-align:right; color:#dc2626;">1.00&#8595;</td>
            </tr>
            <tr>
              <td colspan="3"></td>
              <td style="background:#fff9e6; padding:8px 6px; text-align:right; font-weight:bold;">14.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
`