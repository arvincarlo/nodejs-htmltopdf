export default (props) => `
  <div class="page-header">
    <span>Cash Transaction History</span>
  </div>

  <div class="content-section">
    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-bottom:24px;">
      <div>
        <div style="font-weight:bold;">Account Name:</div>
        <div style="font-weight:bold;">Account Number:</div>
      </div>
      <div>
        <div>
          <span style="font-weight:bold;">Beginning Balance:</span>
          <span style="background:#FFFFE0; padding:2px 8px; display:inline-block; min-width:100px;"></span>
        </div>
        <div>
          <span style="font-weight:bold;">Closing Balance:</span>
          <span style="background:#FFFFE0; padding:2px 8px; display:inline-block; min-width:100px;"></span>
        </div>
      </div>
      <div>
        <div>
          <span style="font-weight:bold;">Current Balance:</span>
          <span style="background:#FFFFE0; padding:2px 8px; display:inline-block; min-width:100px;"></span>
        </div>
        <div>
          <span style="font-weight:bold;">Available Balance:</span>
          <span style="background:#FFFFE0; padding:2px 8px; display:inline-block; min-width:100px;"></span>
        </div>
      </div>
    </div>

    <!-- PHP Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:14px; font-weight:bold; margin-bottom:12px;">PHP</h2>
      <div style="border:1px solid #000; width:85%; border-radius:8px; overflow-x:auto;">
        <table style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="padding:6px 8px; text-align:left; font-weight:bold;">Value Date</th>
              <th style="padding:6px 8px; text-align:left; font-weight:bold;">Description</th>
              <th style="padding:6px 8px; text-align:right; font-weight:bold;">Debit</th>
              <th style="padding:6px 8px; text-align:right; font-weight:bold;">Credit</th>
              <th style="padding:6px 8px; text-align:right; font-weight:bold;">Running Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td style="padding:6px 8px;">17-Mar-24</td>
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;"></td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;"></td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;"></td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;"></td>
            </tr>
            <tr>
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px; text-align:right; background:#fff9e6; font-weight:bold;">TOTAL</td>
              <td style="padding:6px 8px; text-align:right; background:#fff9e6; font-weight:bold;">14.00</td>
              <td style="padding:6px 8px; text-align:right; font-weight:bold;"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- USD Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:14px; font-weight:bold; margin-bottom:12px;">USD</h2>
      <div style="border:1px solid #000; width:85%; border-radius:8px; overflow-x:auto;">
        <table style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="padding:6px 8px; text-align:left; font-weight:bold;">Value Date</th>
              <th style="padding:6px 8px; text-align:left; font-weight:bold;">Description</th>
              <th style="padding:6px 8px; text-align:right; font-weight:bold;">Debit</th>
              <th style="padding:6px 8px; text-align:right; font-weight:bold;">Credit</th>
              <th style="padding:6px 8px; text-align:right; font-weight:bold;">Running Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td style="padding:6px 8px;">17-Mar-24</td>
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;"></td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;"></td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;"></td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;">2.00</td>
              <td style="padding:6px 8px; text-align:right;"></td>
            </tr>
            <tr>
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px;"></td>
              <td style="padding:6px 8px; text-align:right; background:#fff9e6; font-weight:bold;">TOTAL</td>
              <td style="padding:6px 8px; text-align:right; background:#fff9e6; font-weight:bold;">14.00</td>
              <td style="padding:6px 8px; text-align:right;"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
`