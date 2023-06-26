import React, { useEffect } from 'react';
import { Text } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import exportingModule from 'highcharts/modules/exporting';
import exportingData from 'highcharts/modules/export-data';

import ChartTitle from '../title';

exportingModule(Highcharts);
exportingData(Highcharts);

const source = (
  <Text>
    Source :&nbsp;
    <a href="https://www.unesco.org/fr" target="_blank" rel="noreferrer">UNESCO</a>
  </Text>
);

const title = (
  'L\'indice de développement humain du pays'
);

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
<<<<<<< HEAD
                fontSize: '11px',
=======
                fontSize: '10px',
>>>>>>> 6003b9c6d87a57088617f0506ba3b381c418371a
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
<<<<<<< HEAD
                fontFamily: 'Marianne',
                fontSize: '11px',
=======
                fontSize: '10px',
>>>>>>> 6003b9c6d87a57088617f0506ba3b381c418371a
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
<<<<<<< HEAD
                fontFamily: 'Marianne',
                fontSize: '11px',
=======
                fontSize: '10px',
>>>>>>> 6003b9c6d87a57088617f0506ba3b381c418371a
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
<<<<<<< HEAD
                fontFamily: 'Marianne',
                fontSize: '11px',
=======
                fontSize: '10px',
>>>>>>> 6003b9c6d87a57088617f0506ba3b381c418371a
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
<<<<<<< HEAD
          name: null,
          data: [
            [`${nameFr}`, idhCountry],
            ['Moyenne mondiale', idhAverage],
          ],
          pointWidth: 30,
          colors: ['#FFCA00', '#21213f'],
          colorByPoint: true,
=======
          name: nameFr,
          data: [idhCountry],
          color: '#FFCA00',
          dataLabels: {
            align: 'left',
            inside: true,
            useHTML: true,
            color: '#FFFFFF',
            formatter() {
              return `<img src="${flagUrl}" style="width: 20px;margin-right: 5px;"/>${nameFr} ${idhCountry}`;
            },
          },
        },
        {
          name: 'Moyenne mondiale',
          data: [idhAverage],
          color: '#696969',
          dataLabels: {
            align: 'left',
            inside: true,
            color: '#FFFFFF',
            format: `\u{1F30D} Moyenne mondiale ${idhAverage}`,
          },
>>>>>>> 6003b9c6d87a57088617f0506ba3b381c418371a
        },
      ],
    });
  }, [idhCountry, idhAverage, nameFr, flagUrl]);

  return (
    <section className="fr-mb-1w">
      <ChartTitle
        title={title}
        icon="ri-bar-chart-horizontal-fill"
        subTitle={source}
        as="h4"
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
