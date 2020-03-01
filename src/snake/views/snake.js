import React from 'react';


const Snake = (props) => {
    let {snakeBody} = props;
    return(
        <div className = 'snake-wrap'>
            {snakeBody.map((item, index) => 
                <div key = {index} className = 'snake-unit' style = {{top: item.top * 8, left: item.left * 8}}></div>
            )}
        </div>
    );
}



export default Snake;