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

// TODO AJOUTER identifiants (ROR, PIC, WIKI)
export default function Actor() {
  const contextData = useOutletContext();
  const data = contextData['actors-data'];
  const actors = useGetActors(data?.Structures?.data || []);
  const { actorId } = useParams();

  const dataActor = actors.find((actor) => actor.tokenPaysage === actorId);

  if (!dataActor) {
    return (
      <div>
        Identifiant inconnu
      </div>
    );
  }

  return (
    <>
      <Row>
        <Col>
          <Title as="H3" className="fr-mb-0">
            {dataActor.nameFr}
            &nbsp;
            {(dataActor.acronyms?.length > 0) ? `(${dataActor.acronyms?.join()})` : null }
          </Title>
          {(dataActor.nameEn !== dataActor.nameCountry) ? (
            <>
              <Text className="fr-mb-0"><i>{dataActor.nameEn}</i></Text>
              <Text><i>{dataActor.nameCountry}</i></Text>
            </>
          ) : (
            <Text><i>{dataActor.nameEn}</i></Text>
          )}

        </Col>
      </Row>

      <Row gutters>
        <Col n="4">
          {
            dataActor.addresses.map((address) => (
              <AddressCard address={address} />
            ))
          }
        </Col>
        <Col>
          <MapWithMarkers data={[dataActor]} />
        </Col>
      </Row>

      {dataActor.description && (
        <>
          <Row className="fr-pt-3w">
            <Col>
              <Title as="h3">
                Description
              </Title>
            </Col>
          </Row>
          <Row gutters>
            <Col>
              <Text>
                {dataActor.description}
              </Text>
            </Col>
          </Row>
        </>
      )}

      {dataActor.webSites && dataActor.webSites.length > 0 && (
        <>
          <Row className="fr-pt-3w">
            <Col>
              <Title as="h3">
                Sites web &nbsp;
                <Badge text={dataActor.webSites.length} colorFamily="green-menthe" />
              </Title>
            </Col>
          </Row>
          <Row gutters>
            {dataActor.webSites.map((website) => (
              <Col n="4">
                <WebSiteCard language={website.language} link={website.link} name={website.name} />
              </Col>
            ))}
          </Row>
        </>
      )}

      {dataActor.socialNetworks && dataActor.socialNetworks.length > 0 && (
        <>
          <Row className="fr-pt-3w">
            <Col>
              <Title as="h3">
                Présence sur les réseaux sociaux &nbsp;
                <Badge text={dataActor.socialNetworks.length} colorFamily="green-menthe" />
              </Title>
            </Col>
          </Row>
          <Row gutters>
            {dataActor.socialNetworks.map((socialNetwork) => (
              <Col n="4">
                <SocialNetworkCard link={socialNetwork.link} name={socialNetwork.name} />
              </Col>
            ))}
          </Row>
        </>
      )}

      {dataActor.rankings && dataActor.rankings.length > 0 && (
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
      )}
    </>
  );
}
