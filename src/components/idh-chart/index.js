import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import highchartsOfflineExporting from 'highcharts/modules/offline-exporting';

highchartsOfflineExporting(Highcharts);

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
                fontSize: '9px',
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
                fontSize: '9px',
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
                fontSize: '9px',
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
                fontSize: '9px',
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
            menuItems: [
              'viewFullscreen',
              'printChart',
              'downloadPNG',
              'downloadJPEG',
              'downloadPDF',
            ],
          },
        },
      },
      lang: {
        viewFullscreen: 'Voir en plein écran',
        printChart: 'Imprimer le graphique',
        downloadPNG: 'Télécharger en PNG',
        downloadJPEG: 'Télécharger en JPEG',
        downloadPDF: 'Télécharger en PDF',
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
            verticalAlign: 'top',
            align: 'left',
            inside: true,
            enabled: true,
            useHTML: true,
            color: '#FFFFFF',
            formatter() {
              return `<img src="${flagUrl}" style="width: 20px;  margin-right: 5px;"/>${nameFr}  ${idhCountry}`;
            },
          },
        },
        {
          name: 'Moyenne mondiale',
          data: [idhAverage],
          color: '#696969',
          dataLabels: {
            verticalAlign: 'top',
            align: 'left',
            inside: true,
            enabled: true,
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
