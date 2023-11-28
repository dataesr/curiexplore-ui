/* eslint-disable indent */
import PropTypes from 'prop-types';
import { useOutletContext, useParams } from 'react-router-dom';
import { Row, Col, Text, Link, Badge, Icon, Callout, Container } from '@dataesr/react-dsfr';
import MapWithMarkers from '../../../../components/map-with-markers';

import useGetActors from './hooks/useGetActors';
import Title from '../../../../components/title';
import Identifiers from './actors-identifiers-card';
import WebSiteCard from './actors-website-card';
import WikipediaCard from './actors-wikipedia-card';
import SocialNetworkCard from './actors-socialMedias-card';
import { useTitle } from '../../../../hooks/usePageTitle';

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
              {rankingName}
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
        {address.country}
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
  const actorIdentifierType = dataActor.identifiers.map((el) => el.type);
  const actorIdentifierValues = dataActor.identifiers.map((el) => el.value);
  const actorWebsitesLanguage = dataActor.websites.map((el) => el.language);
  const actorWebsiteUrl = dataActor.websites.map((url) => url.url);
  const actorNameEN = dataActor.currentName.nameEn;

  useTitle(`${dataActor.displayName} - Curiexplore`);

  if (!dataActor) {
    return (
      <div>
        Identifiant inconnu
      </div>
    );
  }

  const subtitle = (
    <Text className="fr-mb-1w">
      {dataActor?.currentName.officialName || null}
    </Text>
  );

  return (
    <Container fluid>
      <Row>
        <Title
          as="h3"
          title={`${dataActor.displayName}  (${dataActor.currentLocalisation.country})`}
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
            <Col n="8" aria-hidden>
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
      <Title
        as="h3"
        className="fr-mt-1"
        title="Sur le web"
      />
      <Row gutters>
        <WebSiteCard languages={actorWebsitesLanguage} links={actorWebsiteUrl} name="Site" />
        <WikipediaCard title={dataActor.displayName} nameEn={actorNameEN} />
      </Row>

      {actorIdentifierType.length > 0 && actorIdentifierValues.length > 0 && (
        <>
          <Title
            as="h3"
            className="fr-mb-0"
            title="Identifiants"
          />
          <Identifiers type={actorIdentifierType} identifiersId={actorIdentifierValues} />
        </>
      )}
      <SocialNetworkCard actorId={actorId} />

      {
        dataActor.rankings && dataActor.rankings.length > 0 && (
          <>
            <Row className="fr-pt-3w">
              <Col>
                <Title as="h3">
                  Présence dans les classements internationnaux &nbsp;
                  <Badge text={dataActor.rankings.length.toString()} colorFamily="green-menthe" />
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
    </Container>
  );
}
