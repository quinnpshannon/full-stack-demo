import { useState, useEffect } from "react";
import { Routes, Route} from 'react-router-dom'
import Register from "./pages/register.jsx"
import Books from "./pages/books.jsx"
import Login from "./pages/login.jsx"
import Navbar from "./components/Navbar.jsx"
function App() {
  const [token, setToken] = useState("")
  const [user, setUser] = useState({})

  return (
    <>
      <Navbar user = {user}/>
      {/* {token?<h1>Welcome {user.username}!</h1>:<h3>Please log in.</h3>} */}
      {token?
      <Routes>
        <Route path="*" element={<Books user={user}/>} />
      </Routes>
      :
      <Routes>
        <Route path="/register" element={<Register setToken={setToken} setUser={setUser} />} />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
      </Routes>
      }
    </>
  );
}

export default App;
