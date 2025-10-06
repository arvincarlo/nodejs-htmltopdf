export default (props) => `
  <div class="page-header">
    <span>Securities Portfolio</span>
  </div>

  <div class="content-section">
    <h2 style="font-size:18px; font-weight:bold;">Account Name:</h2>
    <h2 style="font-size:18px; font-weight:bold; margin-bottom:12px;">Account Code:</h2>
    <h2 style="font-size:18px; font-weight:bold; margin-bottom:12px;">Security Ending Position</h2>

    <!-- PESO Equities Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:14px; font-weight:bold; margin-bottom:12px;">PHP</h2>
      <div style="border:1px solid #000; border-radius:8px; overflow-x:auto;">
        <table style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="padding:8px 6px; text-align:left;">Stack Symbol</th>
              <th style="padding:8px 6px; text-align:left;">Issue</th>
              <th style="padding:8px 6px; text-align:left;">Net Purchase</th>
              <th style="padding:8px 6px; text-align:right;">No. of Shares</th>
              <th style="padding:8px 6px; text-align:right;">Average Cost Price</th>
              <th style="padding:8px 6px; text-align:right;">Market Price</th>
              <th style="padding:8px 6px; text-align:right;">Market Value</th>
              <th style="padding:8px 6px; text-align:right;">Unrealized Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px 6px;">JFC</td>
              <td style="padding:8px 6px;">
                Jollibee Foods Corporation<br>
                Series B - Preferred Shares
              </td>
              <td style="padding:8px 6px; text-align:right;">1,000,001.00</td>
              <td style="padding:8px 6px; text-align:right;">100</td>
              <td style="padding:8px 6px; text-align:right;">1,000.00</td>
              <td style="padding:8px 6px; text-align:right;">1,000.00</td>
              <td style="padding:8px 6px; text-align:right;">1,000.00</td>
              <td style="padding:8px 6px; text-align:right; color:#16a34a;">1.00&#8593;</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td style="font-weight:bold; text-align:center;">TOTAL</td>
              <td style="background:#fff9e6; padding:8px 6px; font-weight:bold;">14.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- USD Equities Section -->
    <div style="margin-bottom:24px;">
      <h2 style="font-size:14px; font-weight:bold; margin-bottom:12px;">USD</h2>
      <div style="border:1px solid #000; border-radius:8px; overflow-x:auto;">
        <table style="width:100%; font-size:12px;">
          <thead>
            <tr>
              <th style="padding:8px 6px; text-align:left;">Stack Symbol</th>
              <th style="padding:8px 6px; text-align:left;">Issue</th>
              <th style="padding:8px 6px; text-align:left;">Net Purchase</th>
              <th style="padding:8px 6px; text-align:right;">No. of Shares</th>
              <th style="padding:8px 6px; text-align:right;">Average Cost Price</th>
              <th style="padding:8px 6px; text-align:right;">Market Price</th>
              <th style="padding:8px 6px; text-align:right;">Market Value</th>
              <th style="padding:8px 6px; text-align:right;">Unrealized Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px 6px;">JFC</td>
              <td style="padding:8px 6px;">
                Jollibee Foods Corporation<br>
                Series B - Preferred Shares
              </td>
              <td style="padding:8px 6px; text-align:right;">1,000,001.00</td>
              <td style="padding:8px 6px; text-align:right;">100</td>
              <td style="padding:8px 6px; text-align:right;">1,000.00</td>
              <td style="padding:8px 6px; text-align:right;">1,000.00</td>
              <td style="padding:8px 6px; text-align:right;">1,000.00</td>
              <td style="padding:8px 6px; text-align:right; color:#16a34a;">1.00&#8593;</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td style="font-weight:bold; text-align:center;">TOTAL</td>
              <td style="background:#fff9e6; padding:8px 6px; font-weight:bold;">14.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
`