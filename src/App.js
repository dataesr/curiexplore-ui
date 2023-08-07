import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import ScrollToTop from './scrollToTopAuto';

// import useLang from './hooks/useLang';
import messagesFR from './translations/fr.json';
import AccessibilityPage from './pages/accessibility';
import ActorPage from './pages/country/components/actors/[id]';
import ActorsPage from './pages/country/components/actors';
import ContactPage from './pages/contact';
import Country from './pages/country';
import CountryHigherEducationPage from './pages/country/components/higher-education';
import CountryLinksPages from './pages/country/components/country-links';
import CountryPolicyPage from './pages/country/components/policy';
import CountryProfilePage from './pages/country/components/profile';
import CountryResearchPage from './pages/country/components/research';
import DirectoryPage from './pages/directory';
import ExportPage from './pages/country/components/export';
import FranceCooperationPage from './pages/country/components/france-cooperation';
import HomePage from './pages/homepage';
import InternationalCooperationPage from './pages/country/components/international-cooperation';
import Layout from './layout';
import MentionsLegalesPage from './pages/mentions-legales';
import NotFound from './pages/not-found';
import RessourcesPage from './pages/ressources/ressources';
import SimilarCountriesPage from './pages/country/components/similar-countries';
import StudentsMobilityPage from './pages/country/components/students-mobility';
import TeamProjectPage from './pages/team-project';
import WebTracking from './components/WebTracking';

const messages = {
  'fr-FR': messagesFR,
};

export default function App() {
  const lang = navigator.language;
  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <WebTracking>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/pays/:isoCode" element={<Country />}>
                <Route path="" element={<Navigate to="profil" replace />} />
                <Route path="profil" element={<CountryProfilePage />} />
                <Route path="enseignement-sup" element={<CountryHigherEducationPage />} />
                <Route path="recherche" element={<CountryResearchPage />} />
                <Route path="politique-esri" element={<CountryPolicyPage />} />
                <Route path="acteurs" element={<ActorsPage />} />
                <Route path="acteurs/:actorId" element={<ActorPage />} />
                <Route path="cooperation-avec-la-france" element={<FranceCooperationPage />} />
                <Route path="cooperation-internationale" element={<InternationalCooperationPage />} />
                <Route path="mobilite-etudiante" element={<StudentsMobilityPage />} />
                <Route path="pays-similaires" element={<SimilarCountriesPage />} />
                <Route path="liens-utiles" element={<CountryLinksPages />} />
                <Route path="export" element={<ExportPage />} replace />
              </Route>
              <Route path="/annuaire" element={<DirectoryPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="ressources" element={<RessourcesPage />} />
              <Route path="projet-et-equipe" element={<TeamProjectPage />} />
              <Route path="mentions-legales" element={<MentionsLegalesPage />} />
              <Route path="accessibilite" element={<AccessibilityPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WebTracking>
    </IntlProvider>
  );
}
