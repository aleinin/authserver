import React, {CSSProperties} from 'react'

const footerStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "rgba(10, 10, 10, 0.9)",
    height: "50px",
    position: "fixed",
    left: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

const textStyle: CSSProperties = {
    color: "rgb(240, 240, 240)",
    marginLeft: "10px",
    fontSize: "0.9em",
    verticalAlign: "center"
}

export const Footer = () =>
    <div style={footerStyle}>
        <span style={textStyle}>
            Copyright © 2021 aleinin.com | Image by <a href="https://unsplash.com/photos/9XngoIpxcEo">Jr Korpa</a>
        </span>
    </div>
