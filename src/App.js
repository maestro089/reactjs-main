import React from "react";
import "./App.css";
import Navbar from "./templates/navbar";
import TodoList from './Todo/TodoList'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import AccPage from './pages/Acc';
import {AuthContext} from './context/AuthContext'
import {AuthHook} from './hooks/auth.hook'

export default function App() {
    // импортируем функции из хука, для того чтобы их переписать в контексте и передавать на остальные страницы
    const {login,logout,token,userId} = AuthHook()

    // в зависимости от токена - выставляем значение isAuth - true / false
    const isAuth = !!token
    return (
      <AuthContext.Provider value={{login,logout,token,userId,isAuth}}>
      <Router>
        <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/todos" component={TodoList} />
        <Route path="/users" component={UserPage} />
        <Route path="/acc" component={AccPage} />
      </Switch>
      </Router>
      </AuthContext.Provider>
    );
}

const Home =()=>{
  return(
    <div>Users page</div>
  )

  }


const UserPage =()=>{
  return(
    <div>Users page</div>
  )
}
