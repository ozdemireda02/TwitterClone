import { BrowserRouter, Route, Routes } from "react-router-dom"
import FeedPage from "./pages/FeedPage"
import AuthPage from "./pages/AuthPage"
import ProtectedRoute from "./pages/ProtectedRoute"

const App = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<AuthPage/>} />
    {/* todo > bu route'a sadece oturumu açık kullanıcılar girebilsin */}
    <Route element={<ProtectedRoute />} >
    <Route path="/feed" element={<FeedPage/>} />
    </Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
