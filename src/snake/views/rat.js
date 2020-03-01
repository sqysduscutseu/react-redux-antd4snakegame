import React from 'react';

const Rat = (props) => {
    let ratprops = props;
    return(
        <div className = 'rat-wrap' >
            <div className = 'rat' style = {ratprops}></div>
        </div>
    )
}

export default Rat;