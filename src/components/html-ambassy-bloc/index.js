import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { Col, Container, Row, Title } from '@dataesr/react-dsfr';

export default function HtmlAmbassyBloc({ data }) {
  if (!data) return null;

  return (
    <Container fluid>
      <Row>
        <Col>
          <Title as="h3">
            {data.thematique}
          </Title>
        </Col>
      </Row>
      <Row className="fr-mb-1w">
        Rédigé en&nbsp;
        {data.submitdateclean}
        &nbsp;sous la responsabilité éditoriale du poste diplomatique
      </Row>
      <Row>
        <Col n="12">
          {Parser(data.description)}
        </Col>
      </Row>
    </Container>
  );
}

HtmlAmbassyBloc.defaultProps = {
  data: [],
};

HtmlAmbassyBloc.propTypes = {
  data: PropTypes.object,
};