import React from 'react'
// stateless component

const TogglerButton = props =>{

    return (
        <a onClick={props.onclick}><i class="fas fa-bars"></i></a>
            )
    }   



export default TogglerButton;