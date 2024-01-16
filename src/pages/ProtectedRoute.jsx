import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../firebase/config'

const ProtectedRoute = () => {
// kullanıcının yetkisi var mı?
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        // anlık olarak kullanıcının oturumunu izler
        // verdiğimiz fonksiyon her oturum değiştiğinde çalışır
        // ve parametre olarak aktif  kullanıcıyı alır 
       const unsub = onAuthStateChanged(auth,(user) => {
            // console.log(user)
            if(user){
                setIsAuth(true);
            }else{
                setIsAuth(false);
            }
        })

        return () => unsub();
    },[]);

    // kullanıcının yetkisi yoksa login e yönlendir
    if(isAuth === false){
        return <Navigate to={"/"} replace={true} />
    }
    // kullanıcının yetkisi varsa alt route a geçmesine izin ver
  return (
    <Outlet/>
  )
}

export default ProtectedRoute