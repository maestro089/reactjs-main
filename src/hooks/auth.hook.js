import {useState,useEffect,useCallback} from 'react'

export function AuthHook(){ 
    const [token,setToken] = useState(null)
    const [userId,setUserId] = useState(null)

    // Добавление значения в локальное хранилище 
    const login = useCallback((jwtToken,id)=>{
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem('UserToken',JSON.stringify({token: jwtToken,userId:id}))

    },[])

    // Удаление значения из локального хранилища ( иммитирует выход пользователя из аккаунта )
    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)

        localStorage.removeItem('UserToken')
    },[])


    // проверяем, есть ли запись в локальном хранилище, если есть, то вызывается метод логина, который обновляет данные
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('UserToken'))

        if(data && data.token){
            login(data.token,data.id)
        }
        console.log('use effect',data)
    },[login])

    return {login,logout,token,userId}
}