export default (props) => `
  <div style="background:#630003; margin-top:16px; font-size:24px; font-weight:bold; color:white; width:100%; box-sizing:border-box;">
    <span>Bank Portfolio</span>
  </div>

  <div style="flex:1; display:flex; flex-direction:column; padding:16px; gap:16px;">
    <h2 style="font-size:20px; font-weight:bold;">Certificate of Deposits</h2>

    <div style="border:1px solid #000; border-radius:8px; padding:16px;">
      <table style="width:100%; font-size:14px;">
        <thead>
          <tr>
            <th style="text-align:left; padding:6px;">Product Description</th>
            <th style="text-align:left; padding:6px;">Reference No.</th>
            <th style="text-align:left; padding:6px;">Value Date</th>
            <th style="text-align:right; padding:6px;">Principal Amount</th>
            <th style="text-align:right; padding:6px;">Interest Rate</th>
            <th style="text-align:center; padding:6px;">Term</th>
            <th style="text-align:center; padding:6px;">Maturity Date</th>
            <th style="text-align:right; padding:6px;">Maturity Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:6px; font-weight:bold;">PHP</td>
            <td colspan="7"></td>
          </tr>
          <tr>
            <td style="padding:6px;">Treasury Certificate of Deposit</td>
            <td style="padding:6px;">1111</td>
            <td style="padding:6px;">17-Mar-24</td>
            <td style="text-align:right; padding:6px;">2.00</td>
            <td style="text-align:right; padding:6px;">2.0000%</td>
            <td style="text-align:center; padding:6px;">30 days</td>
            <td style="text-align:center; padding:6px;">01-Jan-01</td>
            <td style="text-align:right; padding:6px;">1.00</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td style="background:#fff9e6; text-align:right; font-weight:bold; padding:6px;">TOTAL</td>
            <td style="background:#fff9e6; text-align:right; font-weight:bold; padding:6px;">14.00</td>
            <td colspan="4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
`