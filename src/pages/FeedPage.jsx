import { useState } from "react"
import Aside from "../components/Aside"
import Main from "../components/Main"
import Nav from "../components/Nav"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { auth } from "../firebase/config"

const FeedPage = () => {

  const [user,setUser] = useState(null);

//  kullanıcının bilgisine abone ol
useEffect(() => {
  // anlık olarak aktif kullanıcının bilgisine abone olduk
  // kullanıcı değiştiği anda mevcut kullanıcının
  // bilgisini state'a aktardık
  const unsub = onAuthStateChanged(auth,(currUser) => setUser(currUser));
  // kullanıcı anasayfadan ayrılırsa aboneliği sonlandırma
  return () => unsub()
},[]);

  return (
    <div className="feed h-screen bg-black overflow-hidden" > 

      <Nav user={user} />
      <Main user={user} />
      <Aside/>

    </div>
  )
}

export default FeedPage