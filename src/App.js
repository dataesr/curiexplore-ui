import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

// import useLang from './hooks/useLang';
import messagesFR from './translations/fr.json';
import Layout from './layout';
import HomePage from './pages/homepage';
import Country from './pages/country';
import CountryProfilePage from './pages/country/components/profile';

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
            <Route path="/country/:isoCode" element={<Country />}>
              <Route path="" element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<CountryProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}
