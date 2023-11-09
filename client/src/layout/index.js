import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, SwitchTheme } from '@dataesr/react-dsfr';
import Header from './header';
import Footer from './footer';
import ScrollToTop from './scroll-to-top-button';

import './layout.scss';

export default function Layout() {
  const [isSwitchThemeOpen, setIsSwitchThemeOpen] = useState(false);
  return (
    <>
      <Header switchTheme={{ isOpen: isSwitchThemeOpen, setIsOpen: setIsSwitchThemeOpen }} />
      <SwitchTheme isOpen={isSwitchThemeOpen} setIsOpen={setIsSwitchThemeOpen} />
      <div role="alert" id="notice-container" />
      <Container as="main" role="main" fluid id="a11yContent">
        <Outlet />
      </Container>
      <ScrollToTop />
      <Footer switchTheme={{ isOpen: isSwitchThemeOpen, setIsOpen: setIsSwitchThemeOpen }} />
    </>
  );
}
