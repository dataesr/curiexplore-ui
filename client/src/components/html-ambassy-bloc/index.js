import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { Col, Container, Row, Button, Text, Icon } from '@dataesr/react-dsfr';
import { useState } from 'react';

import Title from '../title';

export default function HtmlAmbassyBloc({ data, exportView }) {
  const [revealed, setRevealed] = useState(exportView);
  if (!data) return null;

  const handleClick = () => {
    setRevealed(!revealed);
  };

  const subtitle = (
    <>
      Rédigé en&nbsp;
      {data.submitdateclean}
      &nbsp;sous la responsabilité éditoriale du poste diplomatique
      <br />

    </>
  );

  return (
    <Container fluid className="fr-mb-1w">
      {(!exportView) ? (
        <Row>
          <Col>
            <Title
              as="h2"
              title={data.thematique}
              subTitle={subtitle}
              icon=""
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Title
              as="h2"
              look="h4"
              title={data.thematique}
              subTitle={subtitle}
              icon=""
            />
          </Col>
        </Row>
      )}
      <Row className="fr-mb-3w">
        <Col n="12" className="fr-mb-1w">
          <Icon name="ri-error-warning-line" color="var(--border-default-blue-ecume)" />
          Certains des éléments ci-dessous peuvent être dans la langue d'origine.
          <br />
          {revealed ? (
            <>
              {Parser(data.description)}
              {(!exportView) ? (
                <Row className="fr-mt-2w">
                  <Button
                    onClick={handleClick}
                    secondary
                  >
                    Lire moins
                  </Button>
                </Row>
              ) : null}
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
                      <Button
                        onClick={handleClick}
                        secondary
                      >
                        Lire plus
                      </Button>
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
  exportView: false,
};

HtmlAmbassyBloc.propTypes = {
  data: PropTypes.object,
  exportView: PropTypes.bool,
};
