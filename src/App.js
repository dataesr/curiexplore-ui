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
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}
