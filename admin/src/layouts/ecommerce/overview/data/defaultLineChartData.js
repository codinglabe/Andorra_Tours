/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const defaultLineChartData = {
  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Orders",
      color: "info",
      data: [50, 100, 200, 190, 400, 350, 500, 450, 700],
    },
    {
      label: "Quotations",
      color: "dark",
      data: [10, 30, 40, 120, 150, 220, 280, 250, 280],
    },
  ],
};

export default defaultLineChartData;
