import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import { Container, Row, Col } from '@dataesr/react-dsfr';

import CountryProfilePage from './profile';

export default function ExportPage() {
  const { state } = useLocation();
  const { exportList, isoCode } = state;
  const navigate = useNavigate();
  const componentRef = useRef();
  const [loading, setLoading] = useState(true);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'export.pdf',
    onAfterPrint: () => navigate('/'),
    removeAfterPrint: true,
  });

  setTimeout(() => {
    setLoading(false);
    handlePrint();
  }, 5000);

  if (loading) return <div>Préparaion de l'export</div>;

  return (
    <div className="print" ref={componentRef}>
      <Container fluid>
        <Row>
          <Col>
            {exportList.includes('Connaitre le pays') && <CountryProfilePage />}

            'Politique ESRI',
            'Enseignement supérieur',
            'Recherche et innovation',
            'Coopérations internationales',
            'Mobilité étudiante',

          </Col>
        </Row>
        export page
        {exportList}
        {isoCode}
      </Container>
    </div>
  );
}
