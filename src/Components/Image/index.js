import React from 'react';

const Image = ({ src, alt, width, height, className, onClick }) => {
    return (
        <img onClick={onClick} className={className} src={src} alt={alt || 'default'} width={width} height={height} />
    );
};

export default Image;
