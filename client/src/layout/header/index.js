/* eslint-disable indent */
import { useEffect, useState } from 'react';
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  Badge,
  Header as HeaderWrapper, HeaderBody, HeaderNav,
  Logo,
  NavItem,
  Service,
  Tool, ToolItem, ToolItemGroup,
} from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';
import SearchBar from '../../components/search-bar';
import useDebounce from './hooks/useDebounce';
import countries from '../../assets/data/countriesList.json';

import logoCuriexplore from '../../assets/img/logo-curiexplore.svg';

const {
  REACT_APP_HEADER_TAG: headerTag,
  REACT_APP_HEADER_TAG: headerTagColor,
} = process.env;

export default function Header({ switchTheme }) {
  const { pathname } = useLocation();
  const { isOpen, setIsOpen } = switchTheme;
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allCountries = countries.filter((country) => country.hasData === 'TRUE').map((country) => ({ nameFr: country.Pays, iso3: country.ISO_alpha3, searchLabel: country.Pays_search }));
    const getAutocompleteResult = async () => {
      setIsSearching(true);
      setOptions(allCountries.filter((country) => country.searchLabel.indexOf(debouncedQuery.toLowerCase()) !== -1));
      setIsSearching(false);
    };
    if (debouncedQuery) {
      getAutocompleteResult();
    } else {
      setOptions([]);
    }
  }, [debouncedQuery]);

  const handleSearchRedirection = ({ iso3 }) => {
    navigate(`/pays/${iso3}`);
    setOptions([]);
    setQuery('');
  };

  const handleSearch = () => {
    setOptions([]);
    setQuery('');
  };

  return (
    <>
      <ul className="skipLinks-a11y" title="Liens d'accès rapide">
        <li>
          <a href="/" title="Aller à l'accueil">
            Aller à l'accueil du site
          </a>
        </li>
        <li>
          <a href="#a11ySearch">
            Aller à la recherche de pays
          </a>
        </li>
        <li>
          <a href="/annuaire">
            Aller à l'annuaire des pays
          </a>
        </li>
        <li>
          <a href="#a11ycontent">
            Aller au contenu de la page
          </a>
        </li>
      </ul>
      <HeaderWrapper>
        <HeaderBody>
          <Logo splitCharacter={9}>
            Gouvernement
          </Logo>
          <Service
            title={(
              <>
                <img alt="Logo CurieXplore" src={logoCuriexplore} className="fr-responsive-img" style={{ width: '200px' }} />
                {headerTag && <Badge text={headerTag} type={(!headerTagColor) ? 'info' : undefined} isSmall colorFamily={headerTagColor} />}
              </>
            )}
            description=""
          />
          <Tool closeButtonLabel="fermer" className="extend">
            <ToolItemGroup>
              <ToolItem
                type="button"
                className="fr-btn fr-btn--icon-left fr-icon-theme-fill"
                aria-controls="fr-theme-modal"
                data-fr-opened={isOpen}
                onClick={() => setIsOpen(true)}
              >
                Changer le thème
              </ToolItem>
            </ToolItemGroup>

            <SearchBar
              size="md"
              buttonLabel="Rechercher"
              hideLabel
              value={query}
              label="Rechercher un pays"
              placeholder="Rechercher..."
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              options={options}
              onSearch={handleSearch}
              onSelect={handleSearchRedirection}
              isSearching={isSearching}
            />
          </Tool>
        </HeaderBody>
        <HeaderNav path={pathname}>
          <NavItem
            title="Accueil"
            asLink={<RouterLink to="/">Accueil</RouterLink>}
            current={pathname === '/'}
          />
          <NavItem
            title="Annuaire"
            asLink={<RouterLink to="/annuaire">Annuaire</RouterLink>}
            current={pathname === '/annuaire'}
          />
        </HeaderNav>
      </HeaderWrapper>
    </>
  );
}

Header.propTypes = {
  switchTheme: PropTypes.shape({
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
  }).isRequired,
};
