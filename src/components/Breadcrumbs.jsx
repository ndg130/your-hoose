import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function BreadCrumbs({ items, style, accent }) {
    return (
      <nav aria-label="breadcrumb" className={`breadcrumbs ${style}`}>
        <ol className="max-w-7xl mx-auto py-2 px-4 flex space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.href ? (
                <a href={item.href} className="link hover:underline">
                  {item.label}
                </a>
              ) : (
                <span aria-current="page" className="current-page font-medium">
                  {item.label}
                </span>
              )}
              {index < items.length - 1 && <span className="mx-2" aria-hidden="true">{accent ? accent : '/'}</span>}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
  
BreadCrumbs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string
        })
    ).isRequired,
    style: PropTypes.string.isRequired,
    accent: PropTypes.string
};
  