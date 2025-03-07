import { useState } from 'react';
import PropTypes from 'prop-types';
import ClipLoader from "react-spinners/ClipLoader";

export default function Button({ style, text, onClick }) {

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        await onClick();
        setIsLoading(false);
    }

    return (
        <button className={`${style} cta`} disabled={isLoading} onClick={handleClick}>
            {isLoading ? <ClipLoader size={20}/> : text}
        </button>
    )
}

Button.propTypes = {
    style: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}