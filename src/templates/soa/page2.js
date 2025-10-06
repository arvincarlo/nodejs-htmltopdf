export default (props) => `
  <div class="page-header">
    <span>Bank Portfolio</span>
  </div>

  <div class="content-section">
    <h2 style="font-size:18px; font-weight:bold; margin-bottom:8px;">Deposits</h2>
    <div style="border:1px solid #000; border-radius:8px; padding:8px; margin-bottom:16px; margin-top:8px;">
      <table style="width:60%; font-size:14px;">
        <thead>
          <tr>
            <th style="text-align:left; padding:4px;">Account Name</th>
            <th style="text-align:left; padding:4px;">Branch</th>
            <th style="text-align:left; padding:4px;">Product Description</th>
            <th style="text-align:left; padding:4px;">Account / Reference No.</th>
            <th style="text-align:right; padding:4px;">Current Balance</th>
            <th style="text-align:right; padding:4px;">Available Balance</th>
          </tr>
        </thead>
        <tbody style="font-size:14px;">
          <!-- PHP Section -->
          <tr>
            <td colspan="6" style="padding:4px; font-weight:bold;">PHP</td>
          </tr>
          <tr>
            <td>XXX</td>
            <td>Makati Main</td>
            <td>Checking</td>
            <td>111111</td>
            <td style="text-align:right;">2.00</td>
            <td style="text-align:right;">2.00</td>
          </tr>
          <tr>
            <td>XXX</td>
            <td>Makati Main</td>
            <td>Savings</td>
            <td>111111</td>
            <td style="text-align:right;">3.00</td>
            <td style="text-align:right;">3.00</td>
          </tr>
          <tr>
            <td>XXX</td>
            <td>Makati Main</td>
            <td>Savings</td>
            <td>111111</td>
            <td style="text-align:right;">4.00</td>
            <td style="text-align:right;">4.00</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td style="background:#fff9e6; font-weight:bold;">TOTAL</td>
            <td style="background:#fff9e6; text-align:right; font-weight:bold;">14.00</td>
            <td style="background:#fff9e6; text-align:right; font-weight:bold;">14.00</td>
          </tr>
          <!-- USD Section -->
          <tr>
            <td colspan="6" style="padding:4px; font-weight:bold;">USD</td>
          </tr>
          <tr>
            <td>XXX</td>
            <td>Makati Main</td>
            <td>Checking</td>
            <td>111111</td>
            <td style="text-align:right;">2.00</td>
            <td style="text-align:right;">2.00</td>
          </tr>
          <tr>
            <td>XXX</td>
            <td>Makati Main</td>
            <td>Savings</td>
            <td>111111</td>
            <td style="text-align:right;">3.00</td>
            <td style="text-align:right;">3.00</td>
          </tr>
          <tr>
            <td>XXX</td>
            <td>Makati Main</td>
            <td>Savings</td>
            <td>111111</td>
            <td style="text-align:right;">4.00</td>
            <td style="text-align:right;">4.00</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td style="background:#fff9e6; font-weight:bold;">TOTAL</td>
            <td style="background:#fff9e6; text-align:right; font-weight:bold;">14.00</td>
            <td style="background:#fff9e6; text-align:right; font-weight:bold;">14.00</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Time Deposits Section -->
    <div style="border:1px solid #000; border-radius:8px; padding:8px;">
      <table style="width:100%; font-size:14px;">
        <thead>
          <tr>
            <th style="text-align:left; padding:4px;">Account Name</th>
            <th style="text-align:left; padding:4px;">Branch</th>
            <th style="text-align:left; padding:4px;">Product Description</th>
            <th style="text-align:left; padding:4px;">Account / Reference No.</th>
            <th style="text-align:left; padding:4px;">Value Date</th>
            <th style="text-align:right; padding:4px;">Principal Amount</th>
            <th style="text-align:right; padding:4px;">Interest Rate</th>
            <th style="text-align:center; padding:4px;">Term</th>
            <th style="text-align:center; padding:4px;">Maturity Date</th>
            <th style="text-align:right; padding:4px;">Maturity Value</th>
          </tr>
        </thead>
        <tbody style="font-size:14px;">
          <!-- PHP Section -->
          <tr>
            <td colspan="10" style="padding:4px; font-weight:bold;">PHP</td>
          </tr>
          <tr>
            <td>XXX</td>
            <td>Makati Main</td>
            <td>Time Deposit</td>
            <td>111111</td>
            <td>17-Mar-24</td>
            <td style="text-align:right;">2.00</td>
            <td style="text-align:right;">2.0000%</td>
            <td style="text-align:center;">180 days</td>
            <td style="text-align:center;">17-Mar-24</td>
            <td style="text-align:right;">2.00</td>
          </tr>
          <tr>
            <td>XXX</td>
            <td>Makati Main</td>
            <td>PSA</td>
            <td>111111</td>
            <td>18-Mar-24</td>
            <td style="text-align:right;">3.00</td>
            <td style="text-align:right;">2.0000%</td>
            <td style="text-align:center;">180 days</td>
            <td style="text-align:center;">18-Mar-24</td>
            <td style="text-align:right;">3.00</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td style="background:#fff9e6; font-weight:bold;">TOTAL</td>
            <td style="background:#fff9e6; text-align:right; font-weight:bold;">14.00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style="background:#fff9e6; text-align:right; font-weight:bold;">14.00</td>
          </tr>
          <!-- USD Section -->
          <tr>
            <td colspan="10" style="padding:4px; font-weight:bold;">USD</td>
          </tr>
          <tr>
            <td>XXX</td>
            <td>Makati Main</td>
            <td>Time Deposit</td>
            <td>111111</td>
            <td>17-Mar-24</td>
            <td style="text-align:right;">2.00</td>
            <td style="text-align:right;">2.0000%</td>
            <td style="text-align:center;">180 days</td>
            <td style="text-align:center;">17-Mar-24</td>
            <td style="text-align:right;">2.00</td>
          </tr>
          <tr>
            <td>XXX</td>
            <td>Makati Main</td>
            <td>Time Deposit</td>
            <td>111111</td>
            <td>18-Mar-24</td>
            <td style="text-align:right;">3.00</td>
            <td style="text-align:right;">2.0000%</td>
            <td style="text-align:center;">180 days</td>
            <td style="text-align:center;">18-Mar-24</td>
            <td style="text-align:right;">3.00</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td style="background:#fff9e6; font-weight:bold;">TOTAL</td>
            <td style="background:#fff9e6; text-align:right; font-weight:bold;">14.00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style="background:#fff9e6; text-align:right; font-weight:bold;">14.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
`