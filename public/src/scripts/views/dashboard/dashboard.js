import { renderDailyChart } from "./DashboardDailySection.js";
import { renderMonthlyChart } from "./DashboardMonthtlySection.js";
import { renderWeeklyChart } from "./DashboardWeeklySection.js";
import { renderYearlyChart } from "./DashboardYearlySection.js";
export class Dashboard {
    constructor() {
        this.interfaceContainer = document.getElementById('datatable-container');
        this.dashboardContainer = document.createElement('div');
    }
    render() {
        this.dashboardContainer.classList.add('dashboard_container');
        this.dashboardContainer.setAttribute('id', 'dashboard-container');
        this.interfaceContainer.innerHTML = "";
        this.interfaceContainer.appendChild(this.dashboardContainer);
        this.interface(this.dashboardContainer);
        // @ts-ignore
        feather.replace();
    }
    interface(container) {
        container.innerHTML = `
      <h2>Dashboard</h2>
      <div class="dashboard_content">

        <!-- START LEFT SECTION -->
        <div class="dashboard_stadistics">
          <div class="dashboard_datefilter">
            <button class="dashboard_datefilter_button"
              id="daily-chart-button">
              <span>Vista de <br><b>hoy</b></span>
              <i data-feather="calendar"></i>
            </button>

            <button class="dashboard_datefilter_button"
              id="weekly-chart-button">
              <span>Vista por <br><b>semana</b></span>
              <i data-feather="calendar"></i>
            </button>

            <button class="dashboard_datefilter_button"
              id="monthly-chart-button">
              <span>Vista por <br><b>mes</b></span>
              <i data-feather="calendar"></i>
            </button>

            <button class="dashboard_datefilter_button"
              id="yearly-chart-button">
              <span>Vista por <br><b>año</b></span>
              <i data-feather="calendar"></i>
            </button>
          </div>

          <!-- RENDER CHARTS HERE -->
          <div class="chart_container">
            <canvas id="weekly-chart" width="100%"></canvas>
          </div>
          <!-- END RENDER CHARTS -->

          <!-- RENDER DATATABLE HERE -->
          <div class="dashboard_datatable">
            <h2>Visitas recientes</h2>
            <table>
              <thead>
                <tr>
                  <th>CI</th>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Estado</th>
                </tr>
              </thead>
            </table>
          </div>
          <!-- END RENDER DATATABLE -->

        </div>
        <!-- END LEFT SECTION -->

        <!-- START RIGHT SECTION -->
        <div class="dashboard_news_and_notes">
        <!-- News card -->
          <div class="news">
            <div class="card">
              <h1 class="card_title">Nueva<br>actualización</h1>
                <p class="card_pharagraph">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Labore, illo? Sint atque error unde id nemo ullam rem placeat,
                  vel, eius fugiat, soluta commodi deserunt eligendi aspernatur
                  iusto mollitia quam!
                </p>

                <button class="btn btn_primary btn_widder">Ver detalles</button>
            </div>
          </div>
        <!-- End news card -->
          <div class="notes">
            <h1>Últimas notas</h1>
              <table class="table">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span class="note_content">Laptop perdida</span></td>
                    <td>2023-01-31</td>
                  </tr>

                  <tr>
                    <td>Puerta abierta</td>
                    <td>2023-01-31</td>
                  </tr>

                  <tr>
                    <td>Cliente sin QR</td>
                    <td>2023-01-31</td>
                  </tr>

                  <tr>
                    <td>Retraso de entrada</td>
                    <td>2023-01-31</td>
                  </tr>

                  <tr>
                    <td>Llaves perdidas</td>
                    <td>2023-01-31</td>
                  </tr>

                  <tr>
                    <td>Instalación de cámaras</td>
                    <td>2023-01-31</td>
                  </tr>

                  <tr>
                    <td>Nueva novedad</td>
                    <td>2023-01-31</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- END RIGHT SECTION -->
      </div>
    `;
        renderDailyChart();
        const dailyChart = document.getElementById('daily-chart-button');
        dailyChart.addEventListener('click', () => {
            renderDailyChart();
        });
        const weeklyChart = document.getElementById('weekly-chart-button');
        weeklyChart.addEventListener('click', () => {
            renderWeeklyChart();
        });
        const monthlyChart = document.getElementById('monthly-chart-button');
        monthlyChart.addEventListener('click', () => {
            renderMonthlyChart();
        });
        const yearlyChart = document.getElementById('yearly-chart-button');
        yearlyChart.addEventListener('click', () => {
            renderYearlyChart();
        });
    }
}
