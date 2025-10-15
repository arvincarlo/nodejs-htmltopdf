import { formatPesos, formatDateToShort } from '../../helpers/utils.js';
import { currencyConfig } from '../../constants/currency.js';

export default ({ fcbsDeposits = {}, timeDeposits = {} }) => `
  <div class="page-header">
    <span>Bank Portfolio</span>
  </div>

  <div class="content-section">
    <h2 style="font-size:18px; font-weight:bold; margin-bottom:8px;">Deposits</h2>
    <div style="border:1px solid #000; border-radius:8px; padding:8px; margin-bottom:16px; margin-top:8px;">
      <table class="table-center" style="width:100%; font-size:14px;">
        <thead>
          <tr>
            <th style="text-align:left;">Account Name</th>
            <th>Branch</th>
            <th>Product Description</th>
            <th>Account / Reference No.</th>
            <th>Current Balance</th>
            <th>Available Balance</th>
          </tr>
        </thead>
        <tbody style="font-size:14px;">
          ${
            Object.keys(fcbsDeposits)
              .sort((a, b) => Number(a) - Number(b))
              .map(currencyCode => {
                const items = fcbsDeposits[currencyCode];
                if (!items || !items.length) return '';
                const currencyLabel = currencyConfig[currencyCode] || currencyCode;
                return `
                  <tr>
                    <td colspan="6" style="padding:4px; font-weight:bold; text-align:left;">${currencyLabel}</td>
                  </tr>
                  ${items.map(item => `
                    <tr>
                      <td style="text-align:left;">${item.accountName || ""}</td>
                      <td>${item.branch || ""}</td>
                      <td>${item.productDescription || ""}</td>
                      <td>${item.referenceNumber || ""}</td>
                      <td>${formatPesos(item.currentBalance) || ""}</td>
                      <td>${formatPesos(item.availableBalance) || ""}</td>
                    </tr>
                  `).join('')}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="highlight">TOTAL</td>
                    <td class="highlight">${formatPesos(items.reduce((acc, item) => acc + (item.currentBalance || 0), 0))}</td>
                    <td class="highlight">${formatPesos(items.reduce((acc, item) => acc + (item.availableBalance || 0), 0))}</td>
                  </tr>
                `;
              }).join('')
          }
        </tbody>
      </table>
    </div>

    <!-- Time Deposits Section -->
    <div style="border:1px solid #000; border-radius:8px; padding:8px;">
      <table class="table-center" style="width:100%; font-size:14px;">
        <thead>
          <tr>
            <th style="text-align:left; padding:4px;">Account Name</th>
            <th style="padding:4px;">Branch</th>
            <th style="padding:4px;">Product Description</th>
            <th style="padding:4px;">Account / Reference No.</th>
            <th style="padding:4px;">Value Date</th>
            <th style="padding:4px;">Principal Amount</th>
            <th style="padding:4px;">Interest Rate</th>
            <th style="padding:4px;">Term</th>
            <th style="padding:4px;">Maturity Date</th>
            <th style="padding:4px;">Maturity Value</th>
          </tr>
        </thead>
        <tbody style="font-size:14px;">
          ${
            Object.keys(timeDeposits)
              .sort((a, b) => Number(a) - Number(b))
              .map(currencyCode => {
                const items = timeDeposits[currencyCode];
                if (!items || !items.length) return '';
                const currencyLabel = currencyConfig[currencyCode] || currencyCode;
                return `
                  <tr>
                    <td colspan="10" style="text-align:left; font-weight:bold;">${currencyLabel}</td>
                  </tr>
                  ${items.map(item => `
                    <tr>
                      <td>${item.accountName || ""}</td>
                      <td>${item.branch || ""}</td>
                      <td>${item.productDescription || ""}</td>
                      <td>${item.accountNumber || ""}</td>
                      <td>${formatDateToShort(item.valueDate) || ""}</td>
                      <td>${formatPesos(item.principalAmount) || ""}</td>
                      <td>${item.interestRate || ""}</td>
                      <td>${item.term || ""}</td>
                      <td>${formatDateToShort(item.maturityDate) || ""}</td>
                      <td>${formatPesos(item.maturityValue) || ""}</td>
                    </tr>
                  `).join('')}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="highlight">TOTAL</td>
                    <td class="highlight">${formatPesos(items.reduce((sum, item) => sum + (item.principalAmount || 0), 0))}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="highlight">${formatPesos(items.reduce((sum, item) => sum + (item.maturityValue || 0), 0))}</td>
                  </tr>
                `;
              }).join('')
          }
        </tbody>
      </table>
    </div>
  </div>
`