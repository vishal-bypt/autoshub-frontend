import React, { useState } from 'react';
import '../../assets/scss/custom/components/_loader.scss';

function Loader({ loading }) {
    return (
        <>
            {loading == true ?
                <div className="loaderclass"></div>
                :
                ``
            }
        </>
    );
}

export default Loader;