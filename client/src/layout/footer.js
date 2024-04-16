import { Link as RouterLink } from 'react-router-dom';
import {
  Footer as FooterWrapper,
  FooterTop,
  FooterTopCategory,
  FooterBody,
  FooterBodyItem,
  FooterBottom,
  FooterLink,
  FooterCopy,
  Link,
  Logo,
} from '@dataesr/react-dsfr';
import { renderIcon } from '../utils/renderSocialMediasIcon';

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterTop>
        <FooterTopCategory>
          <FooterLink asLink={<RouterLink to="/projet-et-equipe" title="lien vers l'équipe et son projet" />}>
            L'équipe et son projet
          </FooterLink>
          <FooterLink asLink={<RouterLink to="contact" title="nous contacter" />}>
            Nous contacter
          </FooterLink>
          <FooterLink asLink={<RouterLink to="ressources" title="les ressources mobilisées" />}>
            Ressources mobilisées
          </FooterLink>
          <FooterLink asLink={<Link href="https://github.com/dataesr/curiexplore-ui" title="vers notre page Github" target="_blank" />}>
            {renderIcon('Github')}
            Github
          </FooterLink>
        </FooterTopCategory>
        <FooterTopCategory>
          <FooterLink asLink={<Link href="https://scanr.enseignementsup-recherche.gouv.fr/" title="vers scanR" target="_blank" />}>
            scanR
          </FooterLink>
          <FooterLink asLink={<Link href="https://data.esr.gouv.fr/FR/" title="vers #dataESR" target="_blank" />}>
            #dataESR
          </FooterLink>
          <FooterLink asLink={<Link href="https://data.enseignementsup-recherche.gouv.fr/pages/home/" title="vers la plateforme Open Data" target="_blank" />}>
            Plateforme Open Data
          </FooterLink>
          <FooterLink asLink={<Link href="https://barometredelascienceouverte.esr.gouv.fr/" title="vers le Baromètre de la Science Ouverte" target="_blank" />}>
            Baromètre de la Science Ouverte
          </FooterLink>
        </FooterTopCategory>
        <FooterTopCategory>
          <FooterLink as="h2" asLink={<Link href="https://twitter.com/sup_recherche" title="vers notre page Twitter" target="_blank" />}>
            {renderIcon('Twitter')}
            Twitter
          </FooterLink>
          <FooterLink asLink={<Link href="https://www.linkedin.com/company/enseignementsup-recherche/mycompany/" title="vers notre page Linkedin" target="_blank" />}>
            {renderIcon('Linkedin')}
            Linkedin
          </FooterLink>
          <FooterLink asLink={<Link href="https://www.facebook.com/enseignementsup.recherche" title="vers notre page Facebook" target="_blank" />}>
            {renderIcon('Facebook')}
            Facebook
          </FooterLink>
        </FooterTopCategory>
      </FooterTop>
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
        <FooterLink asLink={<RouterLink to="/mentions-legales" />}>
          Mentions Légales
        </FooterLink>
        <FooterLink asLink={<RouterLink to="/accessibilite" />}>
          Accessibilité : partiellement conforme
        </FooterLink>

        <FooterLink target="_blank" href={`https://github.com/dataesr/curiexplore-ui-v2/releases/tag/v${process.env.REACT_APP_VERSION}`}>
          {`Version de l'application v${process.env.REACT_APP_VERSION}`}
        </FooterLink>
        <FooterCopy>
          Sauf mention contraire, tous les contenus de ce site sont sous
          {' '}
          <Link href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank" rel="noreferrer">licence etalab-2.0</Link>
        </FooterCopy>
      </FooterBottom>
    </FooterWrapper>
  );
}
