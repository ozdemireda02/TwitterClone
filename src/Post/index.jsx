import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import moment from "moment/moment";
import { auth, db } from "../firebase/config";
import DropDown from "./DropDown";
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useState } from "react";
import EditMode from "./EditMode";
// moment/locale/tr ile türkçeye çevrilebiliyor.

const Post = ({ tweet }) => {

  const [isEditMode,setIsEditMode] = useState(false);

  // tweet in atılma tarihini hesaplama
  const date = moment(tweet?.createdAt?.toDate()).fromNow();
  
  // aktif kullanıcı bu tweet'i like'ladı mı ?
  const isLiked = tweet.likes.find((id) => id === auth.currentUser.uid)
  
  // tweet i kaldırır
  const handleDelete = async () => {
    if (confirm("Tweeti silmeyi onaylıyor musunuz?")) {
      // kaldıracağımız dökumanın referansını alma
      const tweetRef = doc(db, "tweets", tweet.id);
      // dokümanı kaldır/tweeti sil
      await deleteDoc(tweetRef);
    }
  };
// like olayını izler
  const handleLike = async() => {
    // güncellenecek belgenin referansını alma
    const ref = doc(db,"tweets",tweet.id);
    // aktif kullanıcının id'sini likes dizisine ekle
    await updateDoc(ref,{
      likes: isLiked // bu kullanıcı tweet i like'ladı mı
      ? arrayRemove(auth.currentUser.uid) //like'ı kaldır
      : arrayUnion(auth.currentUser.uid), //like at
    })
  };


  return (
    <div className="relative flex gap-3 px-3 py-6 border-b-[1px] border-gray-700">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt="user-image"
      />
      <div className="w-full">
        {/* üst kısım > kullanıcı bilgileri */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">
              @{tweet.user.name.toLowerCase().replace(" ", "_")}
            </p>
            <p className="text-gray-400">{date}</p>
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <DropDown setIsEditMode={setIsEditMode} handleDelete={handleDelete} />
          )}
        </div>
        {/* orta kısım > tweet içeriği */}
        <div className="my-3">
          {isEditMode && <EditMode tweet={tweet} close={()=>setIsEditMode(false)} />}
          {!isEditMode && tweet.textContent && <p className="my-2">{tweet.textContent}</p>}
          {!isEditMode && tweet.imageContent && (
            <img
              className="my-2 rounded-lg w-full object-contain max-h-[400px]"
              src={tweet.imageContent}
            />
          )}
        </div>
        {/* alt kısım > etkileşim butonları */}
        <div className="flex justify-between">
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]">
            <BiMessageRounded />
          </div>
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00ff2a69]">
            <FaRetweet />
          </div>
          <div onClick={handleLike} className="flex items-center gap-2 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#ff009571]">
            {isLiked ? <FcLike /> : <AiOutlineHeart/>}
            <span>{tweet.likes.length}</span>
          </div>
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#4a48507a]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
