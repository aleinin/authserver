import React, {CSSProperties} from 'react'
import {Title} from "./Title"
import {LoginForm} from "./LoginForm"

export const Login = () => {
    const cardStyle: CSSProperties = {
        position: "fixed",
        top: "50%",
        left:" 50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#eef0f7",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: "10px",
        boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important",
        minWidth: "232px"
    }
    return (
        <div style={cardStyle}>
            <Title title="Login" />
            <LoginForm />
        </div>
    )
}
