import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

export default function ComponentNavItem({ image, text, link}) {
    return (
        <li className='group rounded-lg overflow-hidden'>
            <Link to={link} className='flex flex-col relative'>
                <img className="group-hover:scale-105 transition-all duration-200 ease-linear" src={image} alt="" />
                <p className='py-2 px-4 bg-complement-medium text-neutral-dark transition-all duration-200 ease-linear group-hover:bg-complement-deep group-hover:text-white text-lg font-medium z-10'>{text}</p>
            </Link>
        </li>
    )
}

ComponentNavItem.propTypes = {
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}
