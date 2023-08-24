import PropTypes from 'prop-types';
import classNames from 'classnames';

function Quote({
  children, className, author,
}) {
  const _className = classNames(
    'fr-quote fr-quote--column',
    className,
  );

  return (
    <figure className={_className}>
      <blockquote cite="[À MODIFIER | https://lien-vers-la-source.fr || supprimer l'attribut si pas d'url pour la source']">
        <p>
          {children}
        </p>
      </blockquote>
      <figcaption>
        <p className="fr-quote__author">{author}</p>
        <ul className="fr-quote__source">
          <li>
            <cite>Ouvrage</cite>
          </li>
          <li>Détail 1</li>
          <li>Détail 2</li>
          <li>Détail 3</li>
          <li>
            <a target="_blank" href="[À MODIFIER | Lien vers la sources ou des infos complémentaires]">Détail 4</a>
          </li>
        </ul>
        <div className="fr-quote__image">
          <img src="/img/placeholder.1x1.png" className="fr-responsive-img" alt="" />
        </div>
      </figcaption>
    </figure>
  );
}
Quote.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  className: PropTypes.string,
  author: PropTypes.string,
};
Quote.defaultProps = {
  className: '',
  author: '',
};

export default Quote;
