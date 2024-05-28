import { NavLink,BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "../public/logo.png";
import Homepage from "./pages/Homepage";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <BrowserRouter basename="/">

    <div className="App">
      <header className="App-header">
        <div className="logo">
         <Link to="/">
         <img src={logo} className="App-logo" alt="logo" />
         </Link>
        </div>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/create">Create</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        
      </main>

      <Toaster />
    </div>

    </BrowserRouter>
  );
}

export default App;
