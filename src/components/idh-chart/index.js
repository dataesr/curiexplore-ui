import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import exportingModule from 'highcharts/modules/exporting';
import exportingData from 'highcharts/modules/export-data';

exportingModule(Highcharts);
exportingData(Highcharts);

function IDHComparisonChart({ idhCountry, idhAverage, flagUrl, nameFr }) {
  useEffect(() => {
    Highcharts.chart('chartContainer', {
      chart: {
        type: 'bar',
        height: 200,
      },
      title: {
        text: 'Comparaison de l\'indice de développement humain avec la moyenne mondiale',
      },
      xAxis: {
        categories: [''],
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
            color: '#F2F2B5',
            label: {
              text: 'Faible',
              align: 'center',
              rotation: 0,
              style: {
                color: '#333',
                fontSize: '10px',
              },
            },
          },
          {
            from: 0.549,
            to: 0.699,
            color: '#CEE384',
            label: {
              text: 'Moyen',
              align: 'center',
              rotation: 0,
              style: {
                fontSize: '10px',
                color: '#333',
              },
            },
          },
          {
            from: 0.699,
            to: 0.8,
            color: '#8AC45B',
            label: {
              text: 'Elevé',
              align: 'center',
              rotation: 0,
              style: {
                fontSize: '10px',
                color: '#333',
              },
            },
          },
          {
            from: 0.8,
            to: 1,
            color: '#19904C',
            label: {
              text: 'Très élevé',
              align: 'center',
              style: {
                fontSize: '10px',
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
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
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
        },
      ],
    });
  }, [idhCountry, idhAverage, nameFr, flagUrl]);

  return <div id="chartContainer" />;
}

IDHComparisonChart.propTypes = {
  idhCountry: PropTypes.number.isRequired,
  idhAverage: PropTypes.number.isRequired,
  flagUrl: PropTypes.string.isRequired,
  nameFr: PropTypes.string.isRequired,
};

export default IDHComparisonChart;
