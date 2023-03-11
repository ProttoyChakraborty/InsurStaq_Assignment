import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Admin from "./admin/Admin";
import Users from "./users/Users";
import './App.css';
import Verify from "./Verify/Verify";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/verify/:id" element={<Verify />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
