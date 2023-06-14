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
import List from './list';

import MapCategoriesActors from './map-categories-actors';

export default function ActorsPage() {
  const contextData = useOutletContext();
  const data = contextData['actors-data'];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoriesLabels = [
    {
      id: 'NsMkU',
      label: "Établissement d'enseignement supérieur étranger",
      shortLabel: 'Enseignement supérieur',
    },
    {
      id: 'IqD8w',
      label: "Instance étrangère de contrôle/d'évaluation",
      shortLabel: 'Contrôle/évaluation',
    },
    {
      id: 'P3XZB',
      label: "Institution étrangère active en matière de recherche et d'innovation",
      shortLabel: 'Recherche et innovation',
    },
    {
      id: 'C9nJr',
      label: "Institution étrangère d'expertise et d'aide à la décision",
      shortLabel: 'Expertise',
    },
    {
      id: 'XQE8E',
      label: "Institution étrangère en charge de la définition des politiques d'enseignement supérieur, de recherche et d'innovation",
      shortLabel: 'Politique publique',
    },
    {
      id: 'am1T8',
      label: "Institution étrangère en charge des politiques de mobilité pour l'enseignement supérieur et la recherche",
      shortLabel: 'Mobilité étudiante',
    },
    {
      id: 'E61CB',
      label: "Institution étrangère en charge du financement de l'enseignement supérieur, de la recherche et de l'innovation",
      shortLabel: "Financement de l'ESRI",
    },
  ];

  // creation des categories en fonction de la variable curieCategories et des libellés dans categories
  const categories = {};
  for (let index = 0; index < data.length; index += 1) {
    const actor = data[index];
    if (actor.curieCategories) {
      for (let i = 0; i < actor.curieCategories.length; i += 1) {
        const category = actor.curieCategories[i];
        if (!categories[category] && categoriesLabels.map((cat) => cat.id).includes(category)) {
          categories[category] = [];
          categories[category].push(actor);
        } else if (categories[category] && categoriesLabels.map((cat) => cat.id).includes(category)) {
          categories[category].push(actor);
        }
      }
    }
  }

  const setCategoryFilter = (newCategoryId) => {
    if (selectedCategory !== newCategoryId) {
      setSelectedCategory(newCategoryId);
    } else {
      setSelectedCategory(null);
    }
  };

  if (data.length === 0) {
    return (
      <Row>
        <Col>
          - Aucune donnée disponible -
        </Col>
      </Row>
    );
  }

  const filteredData = selectedCategory ? data.filter((el) => el.curieCategories.includes(selectedCategory)) : data;

  // transformation des données pour le composant MapWithMarkers
  const getObjAddress = (el, idCat) => {
    if (el.currentLocalisation?.geometry?.coordinates?.length === 2) {
      return ({
        id: idCat,
        gps: el.currentLocalisation.geometry.coordinates,
        label: el.currentName,
        iconColor: el.curieCategories[0],
      });
    }
    return null;
  };

  const addressesList = [];
  filteredData.forEach((actor) => {
    const address = getObjAddress(actor, actor.curieCategories[0]);
    if (address) addressesList.push(address);
  });

  return (
    <>
      <Row>
        {Object.keys(categories).length ? (
          <Col>
            <Title as="h3">
              <Icon name="ri-filter-line" />
              Filtres
            </Title>
            <Text><i>Cliquez sur une catégorie pour restreindre les résultats</i></Text>
          </Col>
        ) : <i>Les filtres des acteurs ne sont pas encore disponible </i>}
      </Row>
      <Row gutters>
        <Col n={Object.keys(categories).length ? '3' : '12'} key={uuidv4()}>
          {Object.keys(categories).length ? (
            <TagGroup>
              {Object.keys(categories).map((category) => (
                <Tag
                  key={uuidv4()}
                  colorFamily="yellow-tournesol"
                  onClick={() => setCategoryFilter(category)}
                  selected={category === selectedCategory}
                >
                  {categoriesLabels.find((el) => el.id === category).shortLabel}
&nbsp;
                  <Badge text={categories[category].length} />
                </Tag>
              ))}
            </TagGroup>
          ) : null}
        </Col>
        <Col n={Object.keys(categories).length ? '9' : '12'} className="fr-pt-1w">
          <MapCategoriesActors actors={addressesList} />
        </Col>
      </Row>
      <Row>
        <Col>
          <List actors={filteredData} categoriesLabels={categoriesLabels} />
        </Col>
      </Row>
    </>
  );
}
