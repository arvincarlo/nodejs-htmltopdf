export default (props) => `
  <div style="background:#630003; margin-top:16px; font-size:24px; font-weight:bold; color:white; width:100%; box-sizing:border-box;">
    <span>Bank Portfolio</span>
  </div>

  <div style="padding:16px;">
    <h2 style="font-size:18px; font-weight:bold; margin-bottom:12px;">Derivatives Products</h2>

    <!-- Interest Rate Swap Section -->
    <div style="margin-bottom:24px;">
      <h3 style="font-size:14px; font-weight:bold; margin-bottom:8px;">Interest Rate Swap</h3>
      <div style="border:1px solid #000; border-radius:8px; overflow-x:auto;">
        <table style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="padding:8px 6px; text-align:left;">Reference Number</th>
              <th style="padding:8px 6px; text-align:left;">Start Date</th>
              <th style="padding:8px 6px; text-align:left;">End Date</th>
              <th style="padding:8px 6px; text-align:left;">Currency</th>
              <th style="padding:8px 6px; text-align:right;">Pay Leg Principal</th>
              <th style="padding:8px 6px; text-align:right;">Receive Leg Principal</th>
              <th style="padding:8px 6px; text-align:right;">Pay Leg Rate</th>
              <th style="padding:8px 6px; text-align:right;">Receive Leg Rate</th>
              <th style="padding:8px 6px; text-align:right;">MTM Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px 6px;">111111</td>
              <td style="padding:8px 6px;">17-Mar-24</td>
              <td style="padding:8px 6px;">17-Mar-24</td>
              <td style="padding:8px 6px;">PHP</td>
              <td style="padding:8px 6px; text-align:right;">2.00</td>
              <td style="padding:8px 6px; text-align:right;">2.00</td>
              <td style="padding:8px 6px; text-align:right;">1.0000%</td>
              <td style="padding:8px 6px; text-align:right;">2.0000%</td>
              <td style="padding:8px 6px; text-align:right;">2.00</td>
            </tr>
            <tr>
              <td colspan="7"></td>
              <td style="background:#fff9e6; padding:8px 6px; text-align:center; font-weight:bold;">TOTAL</td>
              <td style="background:#fff9e6; padding:8px 6px; text-align:right; font-weight:bold;">14.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Cross Currency Swap Section -->
    <div style="margin-bottom:24px;">
      <h3 style="font-size:14px; font-weight:bold; margin-bottom:8px;">Cross Currency Swap</h3>
      <div style="border:1px solid #000; border-radius:8px; overflow-x:auto;">
        <table style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="padding:8px 6px; text-align:left;">Reference Number</th>
              <th style="padding:8px 6px; text-align:left;">Start Date</th>
              <th style="padding:8px 6px; text-align:left;">End Date</th>
              <th style="padding:8px 6px; text-align:left;">Currency Pair</th>
              <th style="padding:8px 6px; text-align:right;">FX Rate</th>
              <th style="padding:8px 6px; text-align:right;">Pay Leg Principal</th>
              <th style="padding:8px 6px; text-align:right;">Receive Leg Principal</th>
              <th style="padding:8px 6px; text-align:right;">Pay Leg Rate</th>
              <th style="padding:8px 6px; text-align:right;">Receive Leg Rate</th>
              <th style="padding:8px 6px; text-align:right;">MTM Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px 6px;">111111</td>
              <td style="padding:8px 6px;">17-Mar-24</td>
              <td style="padding:8px 6px;">17-Mar-24</td>
              <td style="padding:8px 6px;">PHP / USD</td>
              <td style="padding:8px 6px; text-align:right;">2.00</td>
              <td style="padding:8px 6px; text-align:right;">PHP 2.00</td>
              <td style="padding:8px 6px; text-align:right;">PHP 2.00</td>
              <td style="padding:8px 6px; text-align:right;">1.0000%</td>
              <td style="padding:8px 6px; text-align:right;">2.0000%</td>
              <td style="padding:8px 6px; text-align:right;">2.00</td>
            </tr>
            <tr>
              <td colspan="8"></td>
              <td style="background:#fff9e6; padding:8px 6px; text-align:center; font-weight:bold;">TOTAL</td>
              <td style="background:#fff9e6; padding:8px 6px; text-align:right; font-weight:bold;">14.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
`