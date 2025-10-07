import { formatPesos, formatDateToShort } from '../../helpers/utils.js';

export default ({trustDeposits}) => `
  <div class="page-header">
    <span>Trust Portfolio</span>
  </div>

  <div class="content-section">
    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-bottom:24px;">
      <div>
        <div style="font-size:24px; font-weight:bold;">IMA Account Name: ${trustDeposits[0].accountName}</div>
        <div style="font-size:24px; font-weight:bold;">Account Number: ${trustDeposits[0].cifNumber}</div>
      </div>
    </div>
    <!-- PESO Deposits Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:20px; font-weight:bold; margin-bottom:12px;">PESO Deposits</h2>
      <div style="border:1px solid #000; border-radius:8px; overflow-x:auto;">
        <table class="center-table" style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th>Product Description</th>
              <th>Reference No.</th>
              <th>Value Date</th>
              <th>Principal Amount</th>
              <th>Interest Rate</th>
              <th>Term</th>
              <th>Maturity Date</th>
              <th>Maturity Value</th>
            </tr>
          </thead>
          <tbody>
            ${trustDeposits.map(deposit => `
              <tr>
                <td>${deposit.productDescription}</td>
                <td>${deposit.referenceNumber}</td>
                <td>${formatDateToShort(deposit.valueDate)}</td>
                <td>${formatPesos(deposit.principalAmount)}</td>
                <td>${deposit.interestRate}</td>
                <td>${deposit.term}</td>
                <td>${formatDateToShort(deposit.maturityDate)}</td>
                <td>${formatPesos(deposit.maturityValue)}</td>
            </tr>
            `).join('')}
            <tr>
              <td colspan="2"></td>
              <td class="highlight">TOTAL</td>
              <td class="highlight">${formatPesos(trustDeposits.reduce((acc, deposit) => acc + deposit.principalAmount, 0))}</td>
              <td colspan="3"></td>
              <td class="highlight">${formatPesos(trustDeposits.reduce((acc, deposit) => acc + deposit.maturityValue, 0))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- US Dollar Deposits Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:20px; font-weight:bold; margin-bottom:12px;">US Dollar Deposits</h2>
      <div style="border:1px solid #000; border-radius:8px; overflow-x:auto;">
        <table class="center-table" style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th>Product Description</th>
              <th>Reference No.</th>
              <th>Value Date</th>
              <th>Principal Amount</th>
              <th>Interest Rate</th>
              <th>Term</th>
              <th>Maturity Date</th>
              <th>Maturity Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>1234567</td>
              <td>17-Mar-24</td>
              <td>2.00</td>
              <td>2.0000%</td>
              <td>30 days</td>
              <td>17-Mar-24</td>
              <td>2.00</td>
            </tr>
            <tr>
              <td></td>
              <td>1234567</td>
              <td>17-Mar-24</td>
              <td>2.00</td>
              <td>2.0000%</td>
              <td>30 days</td>
              <td>17-Mar-24</td>
              <td>2.00</td>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td class="highlight">TOTAL</td>
              <td class="highlight">${formatPesos(trustDeposits.reduce((acc, deposit) => acc + deposit.principalAmount, 0))}</td>
              <td colspan="3"></td>
              <td class="highlight">${formatPesos(trustDeposits.reduce((acc, deposit) => acc + deposit.maturityValue, 0))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
`