import React, {CSSProperties} from 'react'

const titleStyle: CSSProperties = {
    fontSize: "2.5em",
    textAlign: "left",
    paddingBottom: "15px",
    borderBottom: "1px solid black",
    marginBottom: "30px",
    fontFamily: "'Raleway', sans-serif"
}
export const Title = (props: {title: string}) => (
    <span style={titleStyle}>{props.title}</span>
)
