/* eslint-disable indent */
import PropTypes from 'prop-types';
import { useOutletContext, useParams } from 'react-router-dom';
import { Row, Col, Text, Link, Badge, Icon, Callout } from '@dataesr/react-dsfr';
import MapWithMarkers from '../../../../components/map-with-markers';

import useGetActors from './hooks/useGetActors';
import Title from '../../../../components/title';

function WebSiteCard({ language, link, name }) {
  return (
    <h6 className="fr-card__title">
      <Icon name="ri-global-line" />
      <Link href={link} target="blank">
        {`${name} (${language})`}
      </Link>
    </h6>

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
    <h6 className="fr-card__title">
      <Icon name="ri-wikipedia-line" />
      <Link href={`https://www.wikidata.org/wiki/${id}`} target="blank">
        {`Wikidata (${id})`}
      </Link>
    </h6>
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
    <>
      <Icon name="ri-map-pin-line" size="xl" className="fr-mb-0" color="#e18b76" />
      {address.address && <Text className="fr-mb-0-mt-1w">{address.address}</Text>}
      {address.place && <Text className="fr-mb-0">{address.place}</Text>}
      {address.postbox && <Text className="fr-mb-0">{address.postbox}</Text>}
      {address.postcode && <Text className="fr-mb-0">{address.postcode}</Text>}
      {address.city && <Text className="fr-mb-0">{address.city}</Text>}
      <Text>
        {`${address.country}`}
      </Text>
    </>
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

  const wikidata = dataActor.identifiers.find((identifier) => identifier?.type === 'wikidata')?.value || null;
  const subtitle = (
    <Text className="fr-mb-1w">
      {dataActor?.currentName.officialName || null}
    </Text>
  );

  return (
    <>
      <Row className="fr-mb-2w">
        <Title
          as="h3"
          className="fr-mb-0"
          title={dataActor.displayName}
          subTitle={subtitle}
          icon=""
        />

      </Row>

      {
        dataActor.descriptionFr && (
          <Row className="fr-mb-2w">
            <Callout hasInfoIcon={false}>
              {dataActor.descriptionFr}
            </Callout>
          </Row>
        )
      }
      <Row gutters>
        {
          dataActor.currentLocalisation.geometry && (
            <Col n="8">
              <MapWithMarkers data={[{ gps: dataActor.currentLocalisation.geometry.coordinates, label: dataActor.displayName, iconColor: 'blue' }]} />
            </Col>
          )
        }
        {
        dataActor.currentLocalisation && (
        <Col n="4">
          <Callout
            hasInfoIcon={false}
            colors={['#e18b76', '#eee']}
          >
            <AddressCard address={dataActor.currentLocalisation} />
          </Callout>

        </Col>
          )
        }
      </Row>

      {
        (dataActor.websites.length > 0 || dataActor.socialmedias.length > 0 || wikidata) && (
          <Row className="fr-pt-3w">
            <Col>
              <Title
                as="h3"
                title="Présence sur le web"
              />
            </Col>
          </Row>
        )
      }

      {
  dataActor.websites.length > 0 && (
    <Row gutters>
      {Array.from(new Set(dataActor.websites.map((website) => website.language + website.url))).map((key) => {
        const website = dataActor.websites.find((site) => site.language + site.url === key);
        return (
          <Col n="4" key={key}>
            <Callout hasInfoIcon={false} colors={['#009081', '#eee']}>
              <WebSiteCard language={website.language} link={website.url} name="Site" />
            </Callout>
          </Col>
        );
      })}
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
              <Callout
                hasInfoIcon={false}
                colors={['#009081', '#eee']}
              >
                <WikidataCard id={wikidata} />
              </Callout>
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
