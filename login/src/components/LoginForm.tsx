import React, {CSSProperties, FormEvent, useState} from 'react'
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import {Button} from "@material-ui/core"

const formStyle: CSSProperties = {
    display: "flex",
    flexDirection: 'column'
}

export const LoginForm = () => {
    const [login, setLogin] = useState({
        username: '',
        password: '',
        rememberMe: false
    })
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('submited')
        // TODO
    }
    const handleChange = (event: any) => {
        const id = event.target.id
        const value = id === 'rememberMe' ? event.target.checked : event.target.value
        setLogin({
            ...login,
            [id]: value
        })
    }
    const isValid = () => {
        return login.username && login.password
    }
    return (
        <>
            <form style={formStyle} onSubmit={handleSubmit}>
                <TextField
                    style={{marginBottom: '20px'}}
                    id="username"
                    label="Username"
                    variant="outlined"
                    value={login.username}
                    onChange={handleChange}
                />
                <TextField
                    style={{marginBottom: '10px'}}
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={login.password}
                    onChange={handleChange}
                />
                <FormControlLabel
                    style={{marginBottom: '15px'}}
                    control={
                        <Checkbox
                            id="rememberMe"
                            name="rememberMe"
                            color="primary"
                            checked={login.rememberMe}
                            onChange={handleChange}
                        />
                    }
                    label="Remember me"
                />
                <Button disabled={!isValid()} type="submit" variant="contained" color="primary">Login</Button>
            </form>
        </>
    )
}
