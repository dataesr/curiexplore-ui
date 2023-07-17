import { Callout, Col, Icon, Link, Row } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { renderIcon } from '../../../../utils/renderSocialMediasIcon';
import Title from '../../../../components/title';

function SocialNetworkCard({ actorId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_PAYSAGE_API_SOCIAL_MEDIAS}${actorId}/social-medias`,
          {
            headers: { 'X-API-KEY': process.env.REACT_APP_PAYSAGE_KEY },
          },
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchData();
  }, [actorId]);

  return (
    data?.data?.length > 0 && (
      <>
        <Title
          as="h3"
          className="fr-mb-0"
          title=" Réseaux sociaux"
        />
        <Row gutters>
          {data.data.map((socialmedia) => (
            <Col n="12 md-6" key={socialmedia.name}>
              <Callout
                hasInfoIcon={false}
                colors={['#9A99F5', '#eee']}
              >
                <h6 className="fr-card__title">
                  <Icon name={`ri-${socialmedia.type}-line`} />
                  {renderIcon(socialmedia.type)}
                  <Link href={socialmedia.account} target="_blank">
                    {`${socialmedia.type}`}
                  </Link>
                </h6>
              </Callout>
            </Col>
          ))}
        </Row>
      </>
    )
  );
}

SocialNetworkCard.propTypes = {
  actorId: PropTypes.string.isRequired,
};

export default SocialNetworkCard;
