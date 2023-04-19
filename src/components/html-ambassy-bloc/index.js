import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { Col, Container, Row, Title, Button } from '@dataesr/react-dsfr';
import { useState } from 'react';

export default function HtmlAmbassyBloc({ data }) {
  const [revealed, setRevealed] = useState(false);
  if (!data) return null;

  const handleClick = () => {
    setRevealed(!revealed);
  };

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
          {revealed ? (
            <>
              {Parser(data.description)}
              <Button onClick={handleClick}>Lire moins</Button>
            </>
          ) : (
            <Col>
              {Parser(data.description).slice(0, Math.floor(Parser(data.description).length / 4))}
              <Button onClick={handleClick}>Lire plus</Button>
            </Col>
          )}
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
