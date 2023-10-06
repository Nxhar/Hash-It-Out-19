import React from 'react'

const Button = (props) => {
    return (
            <a className="fancy" href="/">
                <span className="top-key"></span>
                <span className="text">{props.BtnName}</span>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
            </a>
    )
}

export default Button