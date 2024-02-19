import PropTypes from 'prop-types';
import { Badge, Title } from '@dataesr/react-dsfr';
import './styles.scss';

export default function RessourceTile({ pictogram, title, href, description, badge, colorFamily, date }) {
  return (
    <div className="fr-tile fr-enlarge-link fr-tile--horizontal">
      <div className="fr-tile__body fr-m-1w">
        <div className="fr-badge-group">
          <Badge isSmall text={badge} colorFamily={colorFamily} />
        </div>
        <Title as="h2" look="h6">
          <a className="fr-tile__link" target="_blank" rel="noopener noreferrer" href={href}>{title}</a>
        </Title>
        <p className="fr-card__detail" title="Description dans la langue du pays">{description}</p>
        <p className="fr-card__detail">{date}</p>
      </div>
      <div className="fr-tile__img tile-img">
        <img src={`/artwork/pictograms/${pictogram}`} className="fr-responsive-img" alt="" />
      </div>
    </div>
  );
}

RessourceTile.propTypes = {
  pictogram: PropTypes.string,
  title: PropTypes.string,
  href: PropTypes.string,
  description: PropTypes.string,
  badge: PropTypes.string,
  colorFamily: PropTypes.string,
  date: PropTypes.string,
};

RessourceTile.defaultProps = {
  pictogram: null,
  title: null,
  href: null,
  description: null,
  badge: null,
  colorFamily: null,
  date: null,
};
