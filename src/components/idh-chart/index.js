import { Col, Container, Icon, Link, Row, Text } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import ChartTitle from '../title';
import './custom-style.scss';
import Tooltip from '../tooltip';

const IDH_CATEGORIES = [
  {
    label: 'unknown',
  },
  {
    label: 'Indice de développement humain faible',
    start: 0,
    end: 0.549,
    width: 54.9,
  },
  {
    label: 'Indice de développement humain moyen',
    start: 0.55,
    end: 0.699,
    width: 14.9,
  },
  {
    label: 'Indice de développement humain élevé',
    start: 0.7,
    end: 0.799,
    width: 9.9,
  },
  {
    label: 'Indice de développement humain très élevé',
    start: 0.8,
    end: 1,
    width: 20,
  },
];

const getIcons = (countyGroup, currentGroup) => {
  const icons = [];
  const allGroups = IDH_CATEGORIES.map((el) => el.label);
  for (let index = 0; index < allGroups.indexOf(currentGroup); index += 1) {
    icons.push(<Icon name="ri-service-fill" className={(countyGroup === currentGroup) ? 'selected' : 'unselected'} />);
  }
  return icons;
};

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
}

IDHChart.propTypes = {
  group: PropTypes.oneOf(IDH_CATEGORIES.map((el) => el.label)).isRequired,
  flagUrl: PropTypes.string.isRequired,
  idhCountry: PropTypes.number.isRequired,
  idhAverage: PropTypes.number.isRequired,
};
