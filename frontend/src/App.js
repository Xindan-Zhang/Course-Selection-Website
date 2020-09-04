import React from 'react';
import './App.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {Home} from './components/Home'
import {Admin} from './components/Admin'
import {Provider} from './components/Global'
import {Header} from './components/Header'
import {Student} from './components/Student'
import {Register} from './components/Register'
import {FinishRegister} from './components/FinishRegister'


export const App = () => {
  return (
    <Provider>
       
        <Router>
          <Header/>

          <Route exact path = "/register">
            <Register/>
          </Route>

          <Route exact path = "/register/success" render={props => {
            if (sessionStorage.getItem("id") != null) {
              return <FinishRegister/>
            } else {
              return <Redirect to="/"/>
            }
          }}>
           
          </Route>


          <Route exact path = "/">
            <Home />

          </Route>

          <Route exact path = "/admin" render={props => {
            if (sessionStorage.getItem("login") === "true" &&
            sessionStorage.getItem("currentId").toLowerCase().startsWith("admin")) {
              return <Admin/>
            } else {
              return <Redirect to="/"/>
            }
          }}>
            
          </Route>

          <Route exact path = "/student/:id" render={props => {
            if (sessionStorage.getItem("login") === "true" && 
            props.match.params.id === sessionStorage.getItem("currentId")) {
              return <Student/>
            } else {
              return <Redirect to="/"/>
            }
          }}>
            
          </Route> 


        </Router>
    </Provider>
  )
}

