import { Container, Tag, TagGroup, Text, Title } from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import regions from '../utils/regions';

export default function RegionFilters({ region, setRegion }) {
  return (
    <Container className="fr-py-3w">
      <Title as="h1" look="h5" className="fr-mb-1w" bold>Zoom sur...</Title>
      <Text>
        <i>
          Cliquez sur un bouton pour filtrer la carte et la liste ci-dessous
        </i>
      </Text>
      <TagGroup>
        {
          Object.entries(regions).map(([label, key]) => (
            <Tag
              key={key}
              selected={(region === key)}
              onClick={() => setRegion(key)}
            >
              {label}
            </Tag>
          ))
        }
      </TagGroup>
    </Container>
  );
}

RegionFilters.defaultProps = {
  region: '',
  setRegion: null,
};

RegionFilters.propTypes = {
  region: PropTypes.string,
  setRegion: PropTypes.func,
};
