import {
  Link as RouterLink,
  useLocation,
} from 'react-router-dom';
import {
  Badge,
  Header as HeaderWrapper,
  HeaderBody,
  HeaderNav,
  Logo,
  NavItem,
  Service,
  Tool,
  ToolItem,
  ToolItemGroup,
} from '@dataesr/react-dsfr';
import PropTypes from 'prop-types';

const {
  REACT_APP_HEADER_TAG: headerTag,
  REACT_APP_HEADER_TAG: headerTagColor,
} = process.env;

export default function Header({ switchTheme }) {
  const { pathname } = useLocation();
  const { isOpen, setIsOpen } = switchTheme;

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
          description="La plateforme d'exploration dessystèmes d'enseignement supérieur,
          de recherche et d'innovationà l'international"
        />
        <Tool closeButtonLabel="fermer" className="extend">
          <ToolItemGroup>
            <ToolItem
              type="button"
              className="fr-footer__bottom-link fr-fi-theme-fill fr-link--icon-left"
              aria-controls="fr-theme-modal"
              data-fr-opened={isOpen}
              onClick={() => setIsOpen(true)}
            >
              Changer le thème
            </ToolItem>
          </ToolItemGroup>
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
