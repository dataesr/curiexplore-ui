/* eslint-disable max-len */
import { Col, Container, Highlight, Row, Tile, Title } from '@dataesr/react-dsfr';

export default function ContactsAndResourcesPage() {
  return (
    <Container>
      <Title as="h2">
        <i>Référentiels</i>
      </Title>
      <Row gutters>
        <Col n="3">
          <Tile color="#000">
            <h2>RC</h2>
          </Tile>
        </Col>
        <Col n="3">
          <Tile color="#000">
            <h2>Grid</h2>
          </Tile>
        </Col>
        <Col n="3">
          <Tile color="#000">
            <h2>Wikidata</h2>
          </Tile>
        </Col>
      </Row>
      <Title as="h2" className="fr-mt-5w">
        <i>Sources</i>
      </Title>
      <Row gutters>
        <Col n="3">
          <Tile color="#000">
            <h2>OpenData</h2>
          </Tile>
        </Col>
        <Col n="3">
          <Tile color="#000">
            <h2>OECD</h2>
          </Tile>
        </Col>
        <Col n="3">
          <Tile color="#000">
            <h2>Stipcompass</h2>
          </Tile>
        </Col>
        <Col n="3">
          <Tile color="#000">
            <h2>scanR</h2>
          </Tile>
        </Col>
        <Col n="3">
          <Tile color="#000">
            <h2>openAlex</h2>
          </Tile>
        </Col>
        <Col n="3">
          <Tile color="#000">
            <h2>SCImago</h2>
          </Tile>
        </Col>
        <Col n="3">
          <Tile color="#000">
            <h2>Academic ...</h2>
          </Tile>
        </Col>
        <Col n="3">
          <Tile color="#000">
            <h2>THE</h2>
          </Tile>
        </Col>
        <Col n="3">
          <Tile color="#000">
            <h2>UNESCO</h2>
          </Tile>
        </Col>
        <Col n="3">
          <Tile color="#000">
            <h2>B.M.</h2>
          </Tile>
        </Col>
      </Row>
      <Title as="h2" className="fr-mt-5w">
        <i>Contact</i>
      </Title>
      <Row gutters>
        <Highlight className="fr-mt-2w" colorFamily="yellow-tournesol">
          CurieXplore est un outil évolutif, destiné à évoluer et à héberger de nouvelles foncitonnalités. L'expérience utilisateur contribue de manière fondamentale à ces évolutions. Vous avez des questions, des remarques, des suggestions ?
          <br />
          N'hésitez pas à nous contacter pour les partager avec nous.
          <br />
          <br />
          <div>
            Ecrivez-nous à
            &nbsp;
            <strong>contact.curie@recherche.gouv.fr</strong>
          </div>
        </Highlight>
      </Row>
    </Container>
  );
}
