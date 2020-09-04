import React from 'react'
import {useHistory} from 'react-router-dom'



export const LogoutBtn = () => {

    const history = useHistory();

    const logOut = () => {
        history.push("/")

    }

    return (
        <div>
            <button className="LogOut" onClick={logOut}>Log Out</button>
        </div>
    )
}
