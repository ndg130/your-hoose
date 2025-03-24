import PropTypes from 'prop-types';

export default function SimpleHeader({subheaderText, headerText, description, style, align, backgroundImage}) {
    return (
        <section className={`header-component ${style} relative px-6 py-24 sm:py-32 lg:px-8`}>
            {backgroundImage && (
                <div className='absolute inset-0 w-full h-full z-0 opacity-30'>
                    <img src={backgroundImage} className='h-full w-full object-cover'/>
                </div>                
            )}

            <div className={`relative mx-auto max-w-5xl text-${align ? align : 'center'} z-10`}>
                {subheaderText && (
                    <p className="subheader text-base/7 font-semibold">{subheaderText}</p>
                )}
                <h2 className="header mt-2 text-5xl font-semibold tracking-tight md:text-7xl">{headerText}</h2>
                {description && (
                    <p className="description mt-8 text-pretty text-lg font-medium md:text-xl/8">
                        {description}
                    </p>                    
                )}

            </div>
        </section>
    )
}

SimpleHeader.propTypes = {
    subheaderText: PropTypes.string,
    headerText: PropTypes.string.isRequired,
    description: PropTypes.string,
    style: PropTypes.string.isRequired,
    align: PropTypes.string,
    backgroundImage: PropTypes.img
}
