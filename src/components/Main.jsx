import { useEffect, useState } from "react"
import Form from "./Form"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "../firebase/config"
import Spinner from "./Spinner"
import Post from "../Post"

const Main = ({user}) => {
  const [tweets, setTweets] = useState(null);
  // koleksiyonun referansını alma
  const tweetsCol = collection(db,"tweets")

  // filtreleme ayarlarını tanımlama
  const options = query(tweetsCol,orderBy("createdAt","desc"))
 

useEffect(() => {

  // tweetler koleksiyonuna abone ol
   const unsub = onSnapshot(options,(snapshot) => {

    // geçici dizi
    const tempTweets = [];

  // bütün dökumanların dön veri ve id'lerinden oluşan objeleri geçici objeye aktar
    snapshot.forEach((doc) => 
    tempTweets.push({id:doc.id, ...doc.data()})
    )
    // geçici dizideki verileri state a aktar
    setTweets(tempTweets);
   });

   return () => unsub();
   
},[])

  return (
    <main className="border border-gray-700 overflow-y-auto">
        <header className="font-bold p-4 border-b-[1px] border-gray-700">
            Anasayfa
        </header>
        <Form user={user} />
        {/* tweetleri listele */}
        {!tweets ?
         <div className="flex justify-center my-10"><Spinner style={"w-6 h-6 text-blue-600"} /></div>  
         : tweets.map((tweet) => <Post tweet={tweet} key={tweet.id} /> )}
    </main>
  )
}

export default Main