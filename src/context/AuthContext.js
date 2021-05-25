import {createContext} from 'react'


// создаем пустой контекст с шаблонными значениями 
export const AuthContext = createContext({
    token: null,
    userId: null,
    login: null,
    logout: null,
    isAuth: false
})