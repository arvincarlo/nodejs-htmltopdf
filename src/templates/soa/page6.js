export default (props) => `
  <div class="page-header">
    <span>Bank Portfolio</span>
  </div>

  <div class="content-section">
    <h2 style="font-size:18px; font-weight:bold; margin-bottom:12px;">Structured Products</h2>

    <!-- Premium Yield Advantage (PYA) Section -->
    <div style="margin-bottom:24px;">
      <h3 style="font-size:14px; font-weight:bold; margin-bottom:8px;">Premium Yield Advantage (PYA)</h3>
      <div style="border:1px solid #000; border-radius:8px; overflow:hidden;">
        <table style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="padding:8px 6px; text-align:left;">Bundle Number</th>
              <th style="padding:8px 6px; text-align:left;">Value Date</th>
              <th style="padding:8px 6px; text-align:left;">Maturity Date</th>
              <th style="padding:8px 6px; text-align:left;">Currency Pair</th>
              <th style="padding:8px 6px; text-align:right;">Face Value</th>
              <th style="padding:8px 6px; text-align:right;">PYA Yield</th>
              <th style="padding:8px 6px; text-align:center;">Term</th>
              <th style="padding:8px 6px; text-align:right;">Maturity Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px 6px;">111111</td>
              <td style="padding:8px 6px;">17-Mar-24</td>
              <td style="padding:8px 6px;">17-Mar-24</td>
              <td style="padding:8px 6px;">USD / PHP</td>
              <td style="padding:8px 6px; text-align:right;">PHP 2.00</td>
              <td style="padding:8px 6px; text-align:right;">2.0000%</td>
              <td style="padding:8px 6px; text-align:center;">90 days</td>
              <td style="padding:8px 6px; text-align:right;">PHP 4.00</td>
            </tr>
            <tr>
              <td colspan="3"></td>
              <td style="background:#fff9e6; padding:8px 6px; text-align:center; font-weight:bold;">TOTAL</td>
              <td style="background:#fff9e6; padding:8px 6px; text-align:right; font-weight:bold;">PHP 14.00</td>
              <td></td>
              <td style="background:#fff9e6; padding:8px 6px; text-align:right; font-weight:bold;">TOTAL</td>
              <td style="background:#fff9e6; padding:8px 6px; text-align:right; font-weight:bold;">PHP 14.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Asset Swap Section -->
    <div style="margin-bottom:24px;">
      <h3 style="font-size:14px; font-weight:bold; margin-bottom:8px;">Asset Swap</h3>
      <div style="border:1px solid #000; border-radius:8px; overflow-x:auto;">
        <table style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="padding:8px 6px; text-align:left;">Bundle Number</th>
              <th style="padding:8px 6px; text-align:left;">Value Date</th>
              <th style="padding:8px 6px; text-align:left;">Maturity Date</th>
              <th style="padding:8px 6px; text-align:left;">Currency Pair</th>
              <th style="padding:8px 6px; text-align:left;">Underlying Security</th>
              <th style="padding:8px 6px; text-align:right;">Security Face Value</th>
              <th style="padding:8px 6px; text-align:right;">Security Price</th>
              <th style="padding:8px 6px; text-align:right;">FX Rate</th>
              <th style="padding:8px 6px; text-align:right;">FX Face Value</th>
              <th style="padding:8px 6px; text-align:right;">Asset Swap Yield</th>
              <th style="padding:8px 6px; text-align:right;">Total Proceeds</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px 6px;">111111</td>
              <td style="padding:8px 6px;">17-Mar-24</td>
              <td style="padding:8px 6px;">17-Mar-24</td>
              <td style="padding:8px 6px;">PHP / USD</td>
              <td style="padding:8px 6px;">XXX</td>
              <td style="padding:8px 6px; text-align:right;">PHP 2.00</td>
              <td style="padding:8px 6px; text-align:right;">2.00</td>
              <td style="padding:8px 6px; text-align:right;">2.00</td>
              <td style="padding:8px 6px; text-align:right;">PHP 2.00</td>
              <td style="padding:8px 6px; text-align:right;">2.0000%</td>
              <td style="padding:8px 6px; text-align:right;">PHP 2.00</td>
            </tr>
            <tr>
              <td colspan="7"></td>
              <td style="background:#fff9e6; padding:8px 6px; text-align:right; font-weight:bold;">TOTAL</td>
              <td style="background:#fff9e6; padding:8px 6px; text-align:right; font-weight:bold;">PHP 14.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Structured Notes Section -->
    <div>
      <h3 style="font-size:14px; font-weight:bold; margin-bottom:8px;">Structured Notes</h3>
      <div style="border:1px solid #000; border-radius:8px; overflow:hidden;">
        <table style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="padding:8px 6px; text-align:left;">Reference Number</th>
              <th style="padding:8px 6px; text-align:left;">Value Date</th>
              <th style="padding:8px 6px; text-align:right;">Face Value</th>
              <th style="padding:8px 6px; text-align:left;">Maturity Date</th>
              <th style="padding:8px 6px; text-align:left;">Security Name</th>
              <th style="padding:8px 6px; text-align:right;">Price</th>
              <th style="padding:8px 6px; text-align:right;">Market Price</th>
              <th style="padding:8px 6px; text-align:right;">Market Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px 6px;">111111</td>
              <td style="padding:8px 6px;">17-Mar-24</td>
              <td style="padding:8px 6px; text-align:right;">2.00</td>
              <td style="padding:8px 6px;">17-Mar-24</td>
              <td style="padding:8px 6px;">XXXX</td>
              <td style="padding:8px 6px; text-align:right;">2.00</td>
              <td style="padding:8px 6px; text-align:right;">2.00</td>
              <td style="padding:8px 6px; text-align:right;">2.00</td>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td style="background:#fff9e6; padding:8px 6px; text-align:right; font-weight:bold;">TOTAL</td>
              <td style="background:#fff9e6; padding:8px 6px; text-align:right; font-weight:bold;">14.00</td>
              <td colspan="4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
`