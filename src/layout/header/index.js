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
  const allCounties = countries.map((country) => ({ nameFr: country.Pays, iso3: country.ISO_alpha3, searchLabel: country.Pays_search }));

  useEffect(() => {
    const getAutocompleteResult = async () => {
      setIsSearching(true);
      setOptions(allCounties.filter((country) => country.searchLabel.indexOf(debouncedQuery) !== -1));
      setIsSearching(false);
    };
    if (debouncedQuery) {
      getAutocompleteResult();
    } else {
      setOptions([]);
    }
  }, [allCounties, debouncedQuery]);

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
    <HeaderWrapper>
      <HeaderBody>
        <Logo splitCharacter={9}>
          Gouvernement
        </Logo>
        <Service
          title={(
            <>
              CurieXplore
              {headerTag && <Badge text={headerTag} type={(!headerTagColor) ? 'info' : undefined} isSmall colorFamily={headerTagColor} />}
            </>
          )}
          description="La plateforme d'exploration des systèmes d'enseignement supérieur,
          de recherche et d'innovation à l'international"
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
  );
}

Header.propTypes = {
  switchTheme: PropTypes.shape({
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
  }).isRequired,
};
