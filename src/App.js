import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

// import useLang from './hooks/useLang';
import messagesFR from './translations/fr.json';
import Layout from './layout';
import HomePage from './pages/homepage';
import Country from './pages/country';
import CountryProfilePage from './pages/country/components/profile';
import CountryHigherEducationPage from './pages/country/components/higher-education';
import CountryResearchPage from './pages/country/components/research';
import CountryPolicyPage from './pages/country/components/policy';
import ActorsPage from './pages/country/components/actors';
import FranceCooperationPage from './pages/country/components/france-cooperation';
import InternationalCooperationPage from './pages/country/components/international-cooperation';
import StudentsMobilityPage from './pages/country/components/students-mobility';
import ContactsAndResourcesPage from './pages/country/components/contacts-and-resources';
import DirectoryPage from './pages/directory';

const messages = {
  'fr-FR': messagesFR,
  // TODO: verifier pour tous les navigateurs
};

export default function App() {
  const lang = navigator.language;
  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/pays/:isoCode" element={<Country />}>
              <Route path="" element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<CountryProfilePage />} />
              <Route path="enseignement-sup" element={<CountryHigherEducationPage />} />
              <Route path="recherche" element={<CountryResearchPage />} />
              <Route path="politique-esri" element={<CountryPolicyPage />} />
              <Route path="acteurs" element={<ActorsPage />} />

              <Route path="cooperation-avec-la-france" element={<FranceCooperationPage />} />
              <Route path="cooperation-internationale" element={<InternationalCooperationPage />} />
              <Route path="mobilite-etudiante" element={<StudentsMobilityPage />} />
              <Route path="contacts-et-ressources" element={<ContactsAndResourcesPage />} />
            </Route>
            <Route path="/annuaire" element={<DirectoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}
