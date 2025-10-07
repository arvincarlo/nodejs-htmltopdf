import { formatPesos, formatDateToShort } from '../../helpers/utils.js';

export default ({ transactionHistory }) => `
  <div class="page-header">
    <span>Cash Transaction History</span>
  </div>

  <div class="content-section">
    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-bottom:24px;">
      <div>
        <div style="font-weight:bold;">Account Name: ${transactionHistory[0]?.accountName || ''}</div>
        <div style="font-weight:bold;">Account Number: ${transactionHistory[0]?.accountNumber || ''}</div>
      </div>
      <div>
        <div>
          <span style="font-weight:bold;">Beginning Balance:</span>
          <span style="background:#FFFFE0; height:15px; padding:2px 8px; display:inline-block; min-width:100px;"></span>
        </div>
        <div>
          <span style="font-weight:bold;">Closing Balance:</span>
          <span style="background:#FFFFE0; height:15px; height:15px; padding:2px 8px; display:inline-block; min-width:100px;"></span>
        </div>
      </div>
      <div>
        <div>
          <span style="font-weight:bold;">Current Balance:</span>
          <span style="background:#FFFFE0; height:15px; padding:2px 8px; display:inline-block; min-width:100px;"></span>
        </div>
        <div>
          <span style="font-weight:bold;">Available Balance:</span>
          <span style="background:#FFFFE0; height:15px; padding:2px 8px; display:inline-block; min-width:100px;"></span>
        </div>
      </div>
    </div>

    <!-- PHP Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:14px; font-weight:bold; margin-bottom:12px;">PHP</h2>
      <div style="border:1px solid #000; width:85%; border-radius:8px; overflow-x:auto;">
        <table class="center-table" style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="font-weight:bold;">Value Date</th>
              <th style="font-weight:bold;">Description</th>
              <th style="font-weight:bold;">Debit</th>
              <th style="font-weight:bold;">Credit</th>
              <th style="font-weight:bold;">Running Balance</th>
            </tr>
          </thead>
          <tbody>
            ${transactionHistory.map(item => `
              <tr style="border-bottom:10px solid black;">
                <td>${formatDateToShort(item.transDateValueDate)}</td>
                <td>${item.productDescription}</td>
                <td>${formatPesos(item.debit)}</td>
                <td>${formatPesos(item.credit)}</td>
                <td>${formatPesos(item.runningBalance)}</td>
              </tr>
            `).join('')}
            <tr>
              <td></td>
              <td></td>
              <td class="highlight">TOTAL</td>
              <td class="highlight">${formatPesos(transactionHistory.reduce((sum, item) => sum + (item.credit || 0), 0))}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-bottom:24px; margin-top:32px;">
      <div>
        <div style="font-weight:bold;">Account Name: ${transactionHistory[0]?.accountName || ''}</div>
        <div style="font-weight:bold;">Account Number: ${transactionHistory[0]?.accountNumber || ''}</div>
      </div>
      <div>
        <div>
          <span style="font-weight:bold;">Beginning Balance:</span>
          <span style="background:#FFFFE0; height:15px; padding:2px 8px; display:inline-block; min-width:100px;"></span>
        </div>
        <div>
          <span style="font-weight:bold;">Closing Balance:</span>
          <span style="background:#FFFFE0; height:15px; height:15px; padding:2px 8px; display:inline-block; min-width:100px;"></span>
        </div>
      </div>
      <div>
        <div>
          <span style="font-weight:bold;">Current Balance:</span>
          <span style="background:#FFFFE0; height:15px; padding:2px 8px; display:inline-block; min-width:100px;"></span>
        </div>
        <div>
          <span style="font-weight:bold;">Available Balance:</span>
          <span style="background:#FFFFE0; height:15px; padding:2px 8px; display:inline-block; min-width:100px;"></span>
        </div>
      </div>
    </div>

    <!-- USD Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:14px; font-weight:bold; margin-bottom:12px;">USD</h2>
      <div style="border:1px solid #000; width:85%; border-radius:8px; overflow-x:auto;">
        <table class="center-table" style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="font-weight:bold;">Value Date</th>
              <th style="font-weight:bold;">Description</th>
              <th style="font-weight:bold;">Debit</th>
              <th style="font-weight:bold;">Credit</th>
              <th style="font-weight:bold;">Running Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td>17-Mar-24</td>
              <td></td>
              <td>2.00</td>
              <td>2.00</td>
              <td></td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td></td>
              <td></td>
              <td>2.00</td>
              <td>2.00</td>
              <td></td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td></td>
              <td></td>
              <td>2.00</td>
              <td>2.00</td>
              <td></td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td></td>
              <td></td>
              <td>2.00</td>
              <td>2.00</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td class="highlight">TOTAL</td>
              <td class="highlight">14.00</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
`