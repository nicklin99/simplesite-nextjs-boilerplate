import React from 'react'

const Title = (props) => (
    <h1 className={'title' + (props.style ? ' ' + props.style : '')}>{props.text} {props.children}</h1>
)

export default Title