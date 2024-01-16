import { useState } from "react";
import { auth,provider } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  // kaydol modunda mıyız?
  const [isSignUp, setIsSignUp] = useState(false);
  // email ve password u state de tutuyoruz
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isForgetPass, setIsForgetPass] = useState(false);
  

  const navigate = useNavigate();

  // hesaba giriş ya da oluştur
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // yeni hesap oluştur
      createUserWithEmailAndPassword(auth, email, pass)
      .then(() => {
        toast.success("Hesabınız başarıyla oluşturuldu");
        navigate("/feed");
      })
      .catch((err) => toast.error(`üzgünüz bi hata oluştu ... ${err.code}`));
    } else {
      // var olan hesapta oturum aç
      signInWithEmailAndPassword(auth ,email, pass)
      .then(() => {
        toast.info("Hesabınıza giriş yapıldı");
        navigate("/feed");
      })
      .catch((err) => {
        // eğerki hata kodu şifre yanlış yazılınca ortaya çıkan kod ise
        // o zaman şifremi unuttum yazısını göster.
        
        if(err.code === 'auth/invalid-credential'){
          setIsForgetPass(true);
        };
        toast.error(`üzgünüz bi hata oluştu ... ${err.code}`)});
    }
    
  };

  //  şifre sıfırlama e postası gönder
  const sendMail = () => {
    sendPasswordResetEmail(auth,email)
    .then(() => {toast.info("Epostanıza şifre sıfırlama bağlantısı gönderildi");})
    .catch(() => {toast.error("Mail gönderilmedi")} )
  };

  // google ile giriş
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then(() => navigate('/feed'));
  };
  

  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="/x-logo.webp" />
        </div>
        <h1 className="text-center font-bold text-xl">Twitter'a Giriş Yap</h1>
        <button onClick={loginWithGoogle} className="flex items-center bg-white py-2 px-10 rounded-full text-black cursor-pointer gap-3 transition hover:bg-gray-300">
          <img className="h-[20px]" src="/google-logo.svg" alt="" />
          <span className="whitespace-nowrap">Google İle Giriş Yap </span>
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            required
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="mt-5">Şifre</label>
          <input
            type="password"
            required
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray]"
            onChange={(e) => setPass(e.target.value)}
          />
          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {isSignUp ? "Kaydol" : "Giriş Yap"}
          </button>
          <p className="mt-5 flex gap-4 ">
            <span className="text-gray-500">Hesabınız yoksa</span>
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 cursor-pointer select-none"
            >
              {isSignUp ? "Giriş Yapın" : "Kaydolun"}
            </span>
          </p>
        </form>
        {isForgetPass && (
          <p onClick={sendMail} className="text-center text-red-500">
            Şifrenizi mi unuttunuz?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
