import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Col } from '@dataesr/react-dsfr';

export default function AdaptativeList({ elements, defaultN }) {
  const [n, setN] = useState(defaultN);
  const [isMore, setIsMore] = useState(true);
  const [isLess, setIsLess] = useState(false);
  const [list, setList] = useState(elements.slice(0, n));

  useEffect(() => {
    setList(elements.slice(0, n));
  }, [n, elements]);

  useEffect(() => {
    setIsMore(n < elements.length);
    setIsLess(n > defaultN);
  }, [n, defaultN, elements]);

  const handleMore = () => {
    setN(elements.length);
  };

  const handleLess = () => {
    setN(defaultN);
  };

  return (
    <>
      {list}
      {isMore && (
        <Col n="12 md-3">
          <Button
            secondary
            onClick={handleMore}
          >
            Voir plus
          </Button>
        </Col>
      )}
      {isLess && (
        <Col n="12 md-3">
          <Button
            secondary
            onClick={handleLess}
          >
            Voir moins
          </Button>
        </Col>
      )}
    </>
  );
}

AdaptativeList.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.element).isRequired,
  defaultN: PropTypes.number,
};

AdaptativeList.defaultProps = {
  defaultN: 4,
};
