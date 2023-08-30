import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BadgeGroup, Badge } from '@dataesr/react-dsfr';
import { v4 as uuidv4 } from 'uuid';

function getColorByCategoryLabel(categoryLabel) {
  switch (categoryLabel) {
  case 'Mobilité étudiante':
    return 'blue-ecume';
  case 'Enseignement supérieur':
    return 'green-emeraude';
  case "France à l'étranger":
    return 'green-archipel';
  case 'Recherche et innovation':
    return 'green-menthe';
  case 'Politique publique':
    return 'purple-glycine';
  case 'Expertise':
    return 'green-bourgeon';
  case 'Financement de l\'ESRI':
    return 'pink-macaron';
  default:
    return 'yellow-tournesol';
  }
}

export default function ActorCard({
  categories,
  title,
  url,
}) {
  return (
    <div className="fr-card fr-enlarge-link fr-card--sm fr-card--no-border fr-card--grey ">
      <div className="fr-card__body">
        <div className="fr-card__content fr-pb-1w">
          <h6 className="fr-card__title">
            <Link to={url}>{title}</Link>
          </h6>
          <p className="fr-card__desc">
            <BadgeGroup>
              {categories.map((categoryLabel) => {
                if (categoryLabel === undefined) {
                  return null;
                }
                const colorFamily = getColorByCategoryLabel(categoryLabel);
                return (
                  <Badge text={categoryLabel} colorFamily={colorFamily} key={uuidv4()} />
                );
              })}
            </BadgeGroup>
          </p>
        </div>
      </div>
    </div>
  );
}

ActorCard.propTypes = {
  categories: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
