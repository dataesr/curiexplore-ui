import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import { Col, Container, Highlight, Row, Title } from '@dataesr/react-dsfr';

export default function HtmlAmbassyBloc({ data }) {
  if (!data) return null;

  return (
    <Container>
      <Row>
        <Col>
          <Title as="h2">
            {data.thematique}
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Highlight>
            {Parser(data.description)}
          </Highlight>
        </Col>
      </Row>
    </Container>
  );
}

HtmlAmbassyBloc.propTypes = {
  data: PropTypes.object.isRequired,
};
