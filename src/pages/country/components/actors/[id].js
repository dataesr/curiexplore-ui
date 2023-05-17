/* eslint-disable indent */
import PropTypes from 'prop-types';
import { useOutletContext, useParams } from 'react-router-dom';
import { Row, Col, Title, Text, Link, Badge, Icon } from '@dataesr/react-dsfr';
import MapWithMarkers from '../../../../components/map-with-markers';

import useGetActors from './hooks/useGetActors';

function WebSiteCard({ language, link, name }) {
  return (
    <div className="fr-card fr-card--grey">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h6 className="fr-card__title">
            <Icon name="ri-global-line" />
            <Link href={link} target="blank">
              {`${name} (${language})`}
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
}

WebSiteCard.propTypes = {
  language: PropTypes.string,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
WebSiteCard.defaultProps = {
  language: null,
};

function WikidataCard({ id }) {
  return (
    <div className="fr-card fr-card--grey">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h6 className="fr-card__title">
            <Icon name="ri-wikipedia-line" />
            <Link href={`https://www.wikidata.org/wiki/${id}`} target="blank">
              {`Wikidata (${id})`}
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
}
WikidataCard.propTypes = {
  id: PropTypes.string.isRequired,
};

function SocialNetworkCard({ link, name }) {
  return (
    <div className="fr-card fr-card--grey">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h6 className="fr-card__title">
            <Icon name={`ri-${name}-line`} />
            <Link href={link} target="blank">
              {`${name}`}
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
}
SocialNetworkCard.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function RankingCard({ link, name }) {
  let rankingName = '';
  switch (name) {
    case 'the':
      rankingName = 'Times Highter Education';
      break;
    case 'qs':
      rankingName = 'QS Top universities';
      break;
    case 'umultirank':
      rankingName = 'Multirank';
      break;
    default:
      rankingName = name;
  }
  return (
    <div className="fr-card fr-card--grey">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h6 className="fr-card__title">
            <Icon name="ri-file-list-3-line" />
            <Link href={link} target="blank">
              {`${rankingName}`}
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
}
RankingCard.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function AddressCard({ address }) {
  return (
    <div className="fr-card fr-card--grey">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <Icon name="ri-map-pin-line" size="xl" className="fr-mb-3w" />
          {address.address && <Text className="fr-mb-0">{address.address}</Text>}
          {address.place && <Text className="fr-mb-0">{address.place}</Text>}
          {address.postbox && <Text className="fr-mb-0">{address.postbox}</Text>}
          {address.postcode && <Text className="fr-mb-0">{address.postcode}</Text>}
          {address.town && <Text className="fr-mb-0">{address.town}</Text>}
          <Text>
            {`${address.country}`}
          </Text>
        </div>
      </div>
    </div>
  );
}
AddressCard.propTypes = {
  address: PropTypes.object.isRequired,
};

export default function Actor() {
  const contextData = useOutletContext();
  const data = contextData['actors-data'];
  const actors = useGetActors(data || []);
  const { actorId } = useParams();

  const dataActor = actors.find((actor) => actor.id === actorId);

  if (!dataActor) {
    return (
      <div>
        Identifiant inconnu
      </div>
    );
  }

  const wikidata = dataActor.identifiers.find((identifier) => identifier.type === 'wikidata').value || null;

  return (
    <>
      <Row>
        <Col>
          <Title as="h3" className="fr-mb-0">
            {dataActor.displayName}
          </Title>
          {
            dataActor.currentName.nameEn && <div><i>{dataActor.currentName.nameEn}</i></div>
          }
          {
            dataActor.currentName.officialName && <div><i>{dataActor.currentName.officialName}</i></div>
          }
        </Col>
      </Row>

      {
        dataActor.descriptionFr && (
          <Row gutters>
            <Col n="12">
              {dataActor.descriptionFr}
            </Col>
          </Row>
        )
      }

      {
        dataActor.currentLocalisation && (
          <Row gutters>
            <Col n="4">
              <AddressCard address={dataActor.currentLocalisation} />
            </Col>
            <Col>
              <MapWithMarkers data={[{ gps: dataActor.currentLocalisation.geometry.coordinates, label: dataActor.displayName, iconColor: 'blue' }]} />
            </Col>
          </Row>
        )
      }

      {
        (dataActor.websites.length > 0 || dataActor.socialmedias.length > 0 || wikidata) && (
          <Row className="fr-pt-3w">
            <Col>
              <Title as="h3">
                Présence sur le web &nbsp;
                {/* <Badge text={dataActor.websites.length} colorFamily="green-menthe" /> */}
              </Title>
            </Col>
          </Row>
        )
      }
      {
        dataActor.websites.length > 0 && (
          <Row gutters>
            {dataActor.websites.map((website) => (
              <Col n="4">
                <WebSiteCard language={website.language} link={website.url} name="Site" />
              </Col>
            ))}
          </Row>
        )
      }
      {
        dataActor.socialmedias.length > 0 && (
          <Row gutters>
            {dataActor.socialmedias.map((socialmedia) => (
              <Col n="4">
                <SocialNetworkCard link={socialmedia.link} name={socialmedia.name} />
              </Col>
            ))}
          </Row>
        )
      }

      {
        wikidata && (
          <Row gutters>
            <Col n="4">
              <WikidataCard id={wikidata} />
            </Col>
          </Row>
        )
      }

      {
        dataActor.rankings && dataActor.rankings.length > 0 && (
          <>
            <Row className="fr-pt-3w">
              <Col>
                <Title as="h3">
                  Présence dans les classements internationnaux &nbsp;
                  <Badge text={dataActor.rankings.length} colorFamily="green-menthe" />
                </Title>
              </Col>
            </Row>
            <Row gutters>
              {dataActor.rankings.map((ranking) => (
                <Col n="4">
                  <RankingCard link={ranking.link} name={ranking.name} />
                </Col>
              ))}
            </Row>
          </>
        )
      }
    </>
  );
}
