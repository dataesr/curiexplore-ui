import { useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function Tooltip({ children, content, className }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`tooltip ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && <div className="tooltip-content">{content}</div>}
    </div>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Tooltip.defaultProps = {
  className: '',
};
