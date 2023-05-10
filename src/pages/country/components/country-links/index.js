import { useParams } from 'react-router-dom';
import { Badge, Col, Container, Link, Row, Tile, Title } from '@dataesr/react-dsfr';
import { v4 as uuidV4 } from 'uuid';
import useFetchData from './hooks/useFetchData';
import TitleComponent from '../../../../components/title';

export default function CountryLinksPages() {
  const { isoCode } = useParams();
  const { data, isLoading } = useFetchData({ isoCode });

  if (isLoading) {
    return <div>Chargement en cours ...</div>;
  }

  if (!data || data.records.length === 0) {
    return <div> - Pas de lien pour ce pays -</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <ul>
            {data.records.map((link) => (
              <li key={uuidV4()} className="fr-mb-1w">
                <Title as="h3" look="h6" className="fr-m-0">
                  <Link
                    href={link.fields.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.fields.nom}
                  </Link>
                  <Badge text={link.fields.table} className="fr-ml-2w" />
                </Title>
                <div>
                  <i>
                    {link.fields.admin}
                  </i>
                </div>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
