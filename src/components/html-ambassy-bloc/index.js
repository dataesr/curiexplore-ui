import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { Col, Container, Row, Button, Text } from '@dataesr/react-dsfr';
import { useState } from 'react';

import Title from '../title';

export default function HtmlAmbassyBloc({ data }) {
  const [revealed, setRevealed] = useState(false);
  if (!data) return null;

  const handleClick = () => {
    setRevealed(!revealed);
  };

  const subtitle = (
    <>
      Rédigé en&nbsp;
      {data.submitdateclean}
      &nbsp;sous la responsabilité éditoriale du poste diplomatique
    </>
  );

  return (
    <Container fluid>
      <Row>
        <Col>
          <Title
            as="h3"
            title={data.thematique}
            subTitle={subtitle}
            icon=""
          />
        </Col>
      </Row>
      <Row className="fr-mb-3w">
        <Col n="12">
          {revealed ? (
            <>
              {Parser(data.description)}
              <Row>
                <Button onClick={handleClick}>Lire moins</Button>
              </Row>
            </>
          ) : (
            <Col>
              {
                (data.description.length >= 2200) ? (
                  <Row>
                    <Row className="overlay">
                      <Text>
                        {Parser(data.description.slice(0, 2200))}
                      </Text>
                    </Row>
                    <Row>
                      <Button onClick={handleClick}>Lire plus</Button>
                    </Row>
                  </Row>
                ) : Parser(data.description)
              }
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
