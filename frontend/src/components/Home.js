import React, {useState, useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import axios from "axios"


export const Home = () => {
    
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [wrongId, setWrongId] = useState(false);
    const history = useHistory();

    useEffect(() => {
        sessionStorage.clear();
    }, [])


    const submitId = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    'Content-Type': "application/json"
                }
            }

            const login = {
                "username" : account,
                "password": password
            }
            const res = await axios.post("/api/authenticate", login, config);


            sessionStorage.setItem("jwt", "Bearer " + res.data.jwt)
            sessionStorage.setItem("login", "true")
            sessionStorage.setItem("currentId", account)
        
            if (account.toLowerCase().startsWith("admin")) {
                history.push('/admin')
            } else {
                history.push(`/student/${account}`)
            }
            
        } catch (error) {
        
                setWrongId(true)
        }
        
    }

    return (
        <div className="homePage">
            <h2>Welcome To Course Selection</h2>
            <form onSubmit={submitId} className="loginForm">
                <div>
                <label>Enter ID: </label>
                <input type="text" value={account} onChange={ (e) => setAccount(e.target.value)}/>
                </div>
                <div>
                <label>Enter Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button>Log In</button>
                {wrongId ? <span className="warning">Invaid username or password</span> : ""}
            </form>
            <div className="register">
                <span>Register An Account?</span>
                <Link className="registerClick" to="/register">Click Here</Link>
            </div>
        </div>
    )
}
