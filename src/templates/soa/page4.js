export default (props) => `
  <div style="background:#630003; padding-left:16px; padding-top:8px; padding-bottom:8px; margin-top:16px; font-size:24px; font-weight:bold; color:white;">
    <span>Bank Portfolio</span>
  </div>
  <div style="padding:12px; background:white;">
    <!-- Fixed Income Section -->
    <div>
      <h2 style="font-size:18px; font-weight:bold; margin-bottom:8px;">Fixed Income</h2>

      <!-- NOCD Account Section -->
      <div style="margin-bottom:12px;">
        <p style="margin-bottom:4px; font-size:14px;">NOCD Account Name:</p>
        <div style="border:1px solid #000; border-radius:8px; padding:8px;">
          <table style="width:100%; font-size:12px;">
            <thead>
              <tr>
                <th style="text-align:left; padding:4px;">Product Description</th>
                <th style="text-align:left; padding:4px;">Reference No.</th>
                <th style="text-align:left; padding:4px;">Value Date</th>
                <th style="text-align:left; padding:4px;">Face Value</th>
                <th style="text-align:left; padding:4px;">Interest Rate</th>
                <th style="text-align:left; padding:4px;">Maturity Date</th>
                <th style="text-align:left; padding:4px;">Next Coupon Date</th>
                <th style="text-align:right; padding:4px;">Cost Price</th>
                <th style="text-align:right; padding:4px;">Market Price</th>
                <th style="text-align:right; padding:4px;">Accrued Interest</th>
                <th style="text-align:right; padding:4px;">Market Value</th>
                <th style="text-align:right; padding:4px;">Unrealized Gain/Loss</th>
              </tr>
            </thead>
            <tbody>
              <!-- PHP Section -->
              <tr>
                <td colspan="12" style="padding:4px; font-weight:bold;">PHP</td>
              </tr>
              <tr>
                <td>SMC Global Power Bonds 2024</td>
                <td>ISIN</td>
                <td>17-Mar-24</td>
                <td>2.00</td>
                <td>2.0000%</td>
                <td>17-Mar-24</td>
                <td>17-Mar-24</td>
                <td style="text-align:right;">1.00</td>
                <td style="text-align:right;">1.00</td>
                <td style="text-align:right;">1.00</td>
                <td style="text-align:right;">1.00</td>
                <td style="text-align:right; color:green;">1.00&#8593;</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td style="background:#fff9e6; font-weight:bold;">TOTAL</td>
                <td style="background:#fff9e6; font-weight:bold;">14.00</td>
                <td colspan="8"></td>
              </tr>

              <!-- USD Section -->
              <tr>
                <td colspan="12" style="padding:4px; font-weight:bold;">USD</td>
              </tr>
              <tr>
                <td>SMC Global Power Bonds 2024</td>
                <td>ISIN</td>
                <td>17-Mar-24</td>
                <td>2.00</td>
                <td>2.0000%</td>
                <td>17-Mar-24</td>
                <td>17-Mar-24</td>
                <td style="text-align:right;">1.00</td>
                <td style="text-align:right;">1.00</td>
                <td style="text-align:right;">1.00</td>
                <td style="text-align:right;">1.00</td>
                <td style="text-align:right; color:green;">1.00&#8593;</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td style="background:#fff9e6; font-weight:bold;">TOTAL</td>
                <td style="background:#fff9e6; font-weight:bold;">14.00</td>
                <td colspan="8"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- NROSS Account Section -->
      <div>
        <p style="margin-bottom:4px; font-size:14px;">NROSS Account Name:</p>
        <div style="border:1px solid #000; border-radius:8px; padding:8px;">
          <table style="width:100%; font-size:12px;">
            <thead>
              <tr>
                <th style="text-align:left; padding:4px;">Product Description</th>
                <th style="text-align:left; padding:4px;">Reference No.</th>
                <th style="text-align:left; padding:4px;">Value Date</th>
                <th style="text-align:left; padding:4px;">Face Value</th>
                <th style="text-align:left; padding:4px;">Interest Rate</th>
                <th style="text-align:left; padding:4px;">Maturity Date</th>
                <th style="text-align:left; padding:4px;">Next Coupon Date</th>
                <th style="text-align:right; padding:4px;">Cost Price</th>
                <th style="text-align:right; padding:4px;">Market Price</th>
                <th style="text-align:right; padding:4px;">Accrued Interest</th>
                <th style="text-align:right; padding:4px;">Market Value</th>
                <th style="text-align:right; padding:4px;">Unrealized Gain/Loss</th>
              </tr>
            </thead>
            <tbody>
              <!-- PHP Section -->
              <tr>
                <td colspan="12" style="padding:4px; font-weight:bold;">PHP</td>
              </tr>
              <tr>
                <td>SMC Global Power Bonds 2024</td>
                <td>ISIN</td>
                <td>17-Mar-24</td>
                <td>2.00</td>
                <td>2.0000%</td>
                <td>17-Mar-24</td>
                <td>17-Mar-24</td>
                <td style="text-align:right;">1.00</td>
                <td style="text-align:right;">1.00</td>
                <td style="text-align:right;">1.00</td>
                <td style="text-align:right;">1.00</td>
                <td style="text-align:right; color:green;">1.00&#8593;</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td style="background:#fff9e6; font-weight:bold;">TOTAL</td>
                <td style="background:#fff9e6; font-weight:bold;">14.00</td>
                <td colspan="8"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
`