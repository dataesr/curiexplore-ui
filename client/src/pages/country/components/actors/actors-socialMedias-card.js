import { Callout, Col, Icon, Link, Row } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Title from '../../../../components/title';
import { renderIcon } from '../../../../utils/renderSocialMediasIcon';

function SocialNetworkCard({ actorId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_CURIEXPLORE_API}/paysage/structures/${actorId}/social-medias`);
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
          as="h2"
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
                <h3 className="fr-card__title">
                  <Icon name={`ri-${socialmedia.type}-line`} />
                  {renderIcon(socialmedia.type)}
                  <Link href={socialmedia.account} target="_blank">
                    {socialmedia.type}
                  </Link>
                </h3>
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
