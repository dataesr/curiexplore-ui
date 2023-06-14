import { Link as RouterLink } from 'react-router-dom';
import {
  Footer as FooterWrapper,
  FooterBody,
  FooterBodyItem,
  FooterBottom,
  FooterLink,
  Logo,
} from '@dataesr/react-dsfr';

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterBody description="CurieXplore : La plateforme d'exploration des systèmes d'enseignement supérieur, de recherche et d'innovation à l'international">
        <Logo
          asLink={<FooterLink href="https://www.enseignementsup-recherche.gouv.fr/fr" />}
          splitCharacter={9}
        >
          Gouvernement
        </Logo>
        <FooterBodyItem>
          <FooterLink target="_blank" href="https://legifrance.gouv.fr">
            legifrance.gouv.fr
          </FooterLink>
        </FooterBodyItem>
        <FooterBodyItem>
          <FooterLink target="_blank" href="https://gouvernement.fr">
            gouvernement.fr
          </FooterLink>
        </FooterBodyItem>
        <FooterBodyItem>
          <FooterLink target="_blank" href="https://service-public.fr">
            service-public.fr
          </FooterLink>
        </FooterBodyItem>
        <FooterBodyItem>
          <FooterLink target="_blank" href="https://data.gouv.fr">data.gouv.fr</FooterLink>
        </FooterBodyItem>
      </FooterBody>
      <FooterBottom>
        <FooterLink asLink={<RouterLink to="/aide" />}>
          Aide
        </FooterLink>
        <FooterLink asLink={<RouterLink to="/projet-et-equipe" />}>
          L'équipe et son projet
        </FooterLink>
        <FooterLink asLink={<RouterLink to="/nous-contacter" />}>
          Nous contacter
        </FooterLink>
        <FooterLink asLink={<FooterLink href="https://github.com/orgs/dataesr/repositories?q=curiexplore-ui-v2&type=&language=&sort=" target="_blank" />}>
          Github
        </FooterLink>
        <FooterLink target="_blank" href={`https://github.com/dataesr/curiexplore-ui-v2/releases/tag/v${process.env.REACT_APP_VERSION}`}>
          {`Version de l'application v${process.env.REACT_APP_VERSION}`}
        </FooterLink>
      </FooterBottom>

    </FooterWrapper>
  );
}
