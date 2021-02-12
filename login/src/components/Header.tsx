import React, {CSSProperties} from 'react'

const headerStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "rgba(10, 10, 10, 0.9)",
    height: "50px",
}


const textStyle: CSSProperties = {
    color: "white",
    marginLeft: "10px",
    fontSize: "2em"
}

export const Header = () =>
    <div style={headerStyle}>
        <span style={textStyle}>aleinin.com</span>
    </div>
