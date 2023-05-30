import { useState, createRef } from 'react';
import { Select, Container, Row, Col } from '@dataesr/react-dsfr';
import { useParams } from 'react-router-dom';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useFetchData from './hooks/useFetchData';
import ChartTitle from '../../../../../../components/title';

const allColumns = ['documents', 'citable_documents', 'citations', 'self_citations', 'citations_per_document', 'h_index'];

export default function ScimagoGraphComponent() {
  const { isoCode } = useParams();
  const { years, data } = useFetchData({ isoCode });
  const [selectedColumn, setSelectedColumn] = useState(allColumns[0]);
  const [selectedYear, setSelectedYear] = useState(null);

  if (!data) return null;
  const seriesData = [];

  // Recherche des données pour l'indicateur et année en cours
  const filteredDataByYear = data.filter((el) => (el.fields.year === (selectedYear || years[0])));

  let serieOfCountry = {};
  filteredDataByYear.forEach((el) => {
    if (el.fields.iso_alpha3 === isoCode) {
      serieOfCountry = {
        name: el.fields.pays,
        color: 'rgb(0, 45, 84)',
        data: [[el.fields[selectedColumn], parseInt((selectedYear || years[0]), 10)]],
      };
    } else {
      // eslint-disable-next-line no-lonely-if
      if (el.fields.iso_alpha3) {
        seriesData.push({
          name: el.fields.pays, // || getFrenchNameFromIso(el.fields.iso_alpha3),
          color: 'rgba(255, 178, 0, .5)',
          data: [[el.fields[selectedColumn], parseInt((selectedYear || years[0]), 10)]],
        });
      }
    }
  });
  // Ajout du pays en dernier pour qu'il apparaisse au dessus
  seriesData.push(serieOfCountry);

  const options = {
    chart: {
      type: 'scatter',
      zoomType: 'xy',
    },
    title: {
      text: null,
    },
    xAxis: {
      title: {
        enabled: true,
        text: `Valeurs du score sélectionné (${selectedColumn})`,
      },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
    },
    yAxis: {
      title: {
        text: 'Année sélectionnée',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 15,
          symbol: 'circle',
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)',
            },
          },
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: 'Score : {point.x}',
        },
      },
    },
    series: seriesData,
    credits: {
      enabled: false,
    },
  };

  const chart = createRef();

  return (
    <>
      <ChartTitle
        title="Classement SCImago"
        icon="ri-bar-chart-horizontal-fill"
        subTitle="Source: SCImago, (n.d.). SJR — SCImago Journal & Country Rank [Portal]"
        as="h4"
        look="h4"
      />
      <form>
        <Container>
          <Row gutters>
            <Col>
              <Select
                label="Score"
                id="selectScore"
                onChange={(e) => setSelectedColumn(e.target.value)}
                options={allColumns.map((el) => ({ label: el, name: el }))}
                selected={selectedColumn}
              />
            </Col>
            <Col>
              <Select
                label="Années"
                onChange={(e) => setSelectedYear(e.target.value)}
                options={years.map((el) => ({ label: el, name: el }))}
                selected={selectedYear}
              />
            </Col>
          </Row>
        </Container>
      </form>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chart}
      />
    </>
  );
}
