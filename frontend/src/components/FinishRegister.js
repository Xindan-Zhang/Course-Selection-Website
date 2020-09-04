import React from 'react'
import {Link} from 'react-router-dom'

export const FinishRegister = () => {
    return (
        <div className="finishRegister">
            <h2>Registration Successful</h2>
            {!sessionStorage.getItem("id").startsWith("admin") ?
            <React.Fragment>
                <span>{`Your student ID is ${sessionStorage.getItem("id")}`}</span>
                <span>Please use your student ID as your login username</span>
            </React.Fragment> :
            <span>{`Your username is ${sessionStorage.getItem("id")}`}</span>}
            <Link className="finishRegisterLink" to="/">Go to Login Page</Link>
        </div>
    )
}
