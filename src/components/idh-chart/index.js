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

<<<<<<< Updated upstream
export default function IDHChart({ group, flagUrl, idhCountry, idhAverage }) {
  const subTitle = (
    <Text>
      Source : catégorie d'IDH, selon l'

      <Link href="https://hdr.undp.org/content/human-development-report-2021-22" target="_blank">ONU en 2021</Link>
    </Text>
  );
  return (
    <div className="IDHChart">
      <Container fluid className="fr-mt-2w">
        <Row>
          <Col>
            <ChartTitle
              icon="ri-service-fill"
              title="Indice de développement humain"
              subTitle={subTitle}
            />
          </Col>
        </Row>
      </Container>

      <div style={{ paddingLeft: '41px' }}>
        <div className="text-center column faible-bg-color" style={{ width: `${IDH_CATEGORIES.find((el) => el.label === 'Indice de développement humain faible').width}%` }}>
          <Text>
            {getIcons(group, 'Indice de développement humain faible').map((icon) => icon)}
            <strong>
              Faible
            </strong>
          </Text>
        </div>
        <div className="text-center column moyen-bg-color" style={{ width: `${IDH_CATEGORIES.find((el) => el.label === 'Indice de développement humain moyen').width}%` }}>
          <Text>
            {getIcons(group, 'Indice de développement humain moyen').map((icon) => icon)}
            <strong>
              Moyen
            </strong>
          </Text>
        </div>
        <div className="text-center column eleve-bg-color" style={{ width: `${IDH_CATEGORIES.find((el) => el.label === 'Indice de développement humain élevé').width}%` }}>
          <Text>
            {getIcons(group, 'Indice de développement humain élevé').map((icon) => icon)}
            <strong>
              Elevé
            </strong>
          </Text>
        </div>
        <div className="text-center column tres-eleve-bg-color" style={{ width: `${IDH_CATEGORIES.find((el) => el.label === 'Indice de développement humain très élevé').width}%` }}>
          <Text>
            {getIcons(group, 'Indice de développement humain très élevé').map((icon) => icon)}
            <strong>
              Très Elevé
            </strong>
          </Text>
        </div>
      </div>

      <Container fluid>
        <Row className="fr-pr-5w">
          <Col>
            <img src={flagUrl} alt="" style={{ float: 'left' }} />
            <div className="country-gauge" style={{ width: `${idhCountry * 100}%` }} />
            <Tooltip content={`${group} : ${idhCountry}`} className="circle">
              <Icon name="ri-question-mark" />
            </Tooltip>
          </Col>
        </Row>
        <Row className="fr-pr-5w">
          <Col>
            <div style={{ float: 'left', width: '35px', paddingTop: '8px' }}>
              <Icon name="ri-global-fill" size="lg" />
            </div>
            <div className="average-gauge" style={{ width: `${idhAverage * 100}%` }} />
            <Tooltip content={`Indice de développement humain mondial moyen : ${idhAverage}`} className="circle">
              <Icon name="ri-question-mark" />
            </Tooltip>
          </Col>
        </Row>
      </Container>

    </div>
  );
=======
  return <div id="chartContainer" />;
>>>>>>> Stashed changes
}

IDHComparisonChart.propTypes = {
  idhCountry: PropTypes.number.isRequired,
  idhAverage: PropTypes.number.isRequired,
  flagUrl: PropTypes.string.isRequired,
  nameFr: PropTypes.string.isRequired,
};

export default IDHComparisonChart;
