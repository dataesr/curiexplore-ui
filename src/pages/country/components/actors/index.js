import {
  Badge,
  Col,
  Icon,
  Row,
  Tag,
  TagGroup,
  Text,
  Title,
} from '@dataesr/react-dsfr';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './styles/custom.scss';
import useGetActors from './hooks/useGetActors';
import List from './list';

import MapCategoriesActors from './map-categories-actors';

export default function ActorsPage() {
  const contextData = useOutletContext();
  const data = contextData['actors-data'];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const actors = useGetActors(data?.Structures?.data || [], selectedCategory);

  const getLabel = (longLabel) => {
    switch (longLabel) {
    case "Établissement d'enseignement supérieur étranger":
      return 'Enseignement supérieur';
    case "Instance étrangère de contrôle/d'évaluation":
      return 'Contrôle/évaluation';
    case "Institution étrangère active en matière de recherche et d'innovation":
      return 'Recherche et innovation';
    case "Institution étrangère d'expertise et d'aide à la décision":
      return 'Expertise';
    case "Institution étrangère en charge de la définition des politiques d'enseignement supérieur, de recherche et d'innovation":
      return 'Politique publique';
    case "Institution étrangère en charge des politiques de mobilité pour l'enseignement supérieur et la recherche":
      return 'Mobilité étudiante';
    case "Institution étrangère en charge du financement de l'enseignement supérieur, de la recherche et de l'innovation":
      return "Financement de l'ESRI";
    default:
      return null;
    }
  };

  const getCategories = (needles) => {
    const labelCategoriesArray = [];
    needles.forEach((needle) => {
      const findedLabel = data.Categories.find((el) => el.id === needle).title;

      labelCategoriesArray.push(getLabel(findedLabel));
    });
    return labelCategoriesArray;
  };

  const setCategoryFilter = (newCategoryId) => {
    if (selectedCategory !== newCategoryId) {
      setSelectedCategory(newCategoryId);
    } else {
      setSelectedCategory(null);
    }
  };

  // Ajout des labels des catégories
  const actorsWithCategoriesLabels = [...actors];
  actorsWithCategoriesLabels.forEach((actor, index) => {
    actorsWithCategoriesLabels[index].membershipCategoriesLabels = getCategories(actor.membershipCategories).map((category) => (category));
  });

  return (
    <>
      <Row>
        <Col>
          <Title as="h3">
            <Icon name="ri-filter-line" />
            Filtres
          </Title>
          <Text><i>Cliquez sur une catégorie pour restreindre les résultats</i></Text>
        </Col>
      </Row>
      <Row gutters>
        <Col n="3" key={uuidv4()}>
          <TagGroup>
            {
              data.Categories
                .filter((category) => category.title !== 'Implantation de structures étrangères en France')
                .map((category) => (
                  <Tag
                    key={uuidv4()}
                    colorFamily="yellow-tournesol"
                    onClick={() => setCategoryFilter(category.id)}
                    selected={(category.id === selectedCategory)}
                  >
                    {getLabel(category.title)}
                    &nbsp;
                    <Badge
                      text={actorsWithCategoriesLabels.filter((el) => el.membershipCategories.includes(category.id)).length}
                    />
                  </Tag>
                ))
            }
          </TagGroup>

        </Col>
        <Col n="9" className="fr-pt-1w">
          <MapCategoriesActors
            subTitle="Tous les acteurs"
            actors={actorsWithCategoriesLabels}
            categories={data.Categories}
            isoCode={data.Structures.iso}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <List actors={actorsWithCategoriesLabels} />
        </Col>
      </Row>
    </>
  );
}
