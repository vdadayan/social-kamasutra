import React from 'react';
import loader from '../../assets/images/loader.svg';

const Preloader = (props) => {
    return(
        <>
            <img src={loader} alt="Preloader"/>
        </>
    );
}

export default Preloader;