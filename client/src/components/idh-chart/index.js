import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import exportingModule from 'highcharts/modules/exporting';
import exportingData from 'highcharts/modules/export-data';

import ChartTitle from '../title/index';

exportingModule(Highcharts);
exportingData(Highcharts);

function IDHComparisonChart({ idhCountry, idhAverage, flagUrl, nameFr }) {
  useEffect(() => {
    Highcharts.chart('chartContainer', {
      chart: {
        type: 'bar',
        height: 200,
        // TODO : gérer le padding groupe
        groupPadding: 0,
      },
      title: {
        text: null,
      },
      xAxis: {
        type: 'category',
        title: {
          text: null,
        },
        lineWidth: 0,
      },
      yAxis: {
        title: {
          text: [''],
        },
        min: 0,
        max: 1,
        gridLineColor: '',
        plotBands: [
          {
            from: 0,
            to: 0.549,
            color: '#ffffff',
            label: {
              text: 'Faible',
              align: 'center',
              rotation: 0,
              style: {
                fontFamily: 'Marianne',
                color: '#333',
                fontSize: '11px',
              },
            },
          },
          {
            from: 0.549,
            to: 0.699,
            color: '#f6f6f6',
            label: {
              text: 'Moyen',
              align: 'center',
              rotation: 0,
              style: {
                fontFamily: 'Marianne',
                fontSize: '11px',
                color: '#333',
              },
            },
          },
          {
            from: 0.699,
            to: 0.8,
            color: '#eeeeee',
            label: {
              text: 'Elevé',
              align: 'center',
              rotation: 0,
              style: {
                fontFamily: 'Marianne',
                fontSize: '11px',
                color: '#333',
              },
            },
          },
          {
            from: 0.8,
            to: 1,
            color: '#e5e5e5',
            label: {
              text: 'Très élevé',
              align: 'center',
              style: {
                fontFamily: 'Marianne',
                fontSize: '11px',
                color: '#333',
              },
            },
          },
        ],
      },
      legend: {
        enabled: false,
      },
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            menuItems: ['downloadCSV', 'downloadPNG'],
          },
        },
      },
      lang: {
        downloadPNG: 'Télécharger en format PNG',
        downloadCSV: 'Télécharger en format CSV',
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        column: {
          colorByPoint: true,
        },
        bar: {
          borderWidth: 0,
        },
        series: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: null,
          data: [
            [`${nameFr}`, idhCountry],
            ['Moyenne mondiale', idhAverage],
          ],
          pointWidth: 30,
          colors: ['#FFCA00', '#21213f'],
          colorByPoint: true,
        },
      ],
    });
  }, [idhCountry, idhAverage, nameFr, flagUrl]);

  return (
    <section className="fr-mb-1w">
      <ChartTitle
        title="L'indice de développement humain"
        icon="ri-bar-chart-horizontal-fill"
        subTitle=""
        as="h2"
        look="h4"
      />
      <div id="chartContainer" />
    </section>
  );
}

IDHComparisonChart.propTypes = {
  idhCountry: PropTypes.number.isRequired,
  idhAverage: PropTypes.number.isRequired,
  flagUrl: PropTypes.string.isRequired,
  nameFr: PropTypes.string.isRequired,
};

export default IDHComparisonChart;
