import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import GetData from "./pages/GetData";
import { NavBar } from "./components/NavBar";
import CommunityForum from "./components/communityForum";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getdata" element={<GetData />} />
        <Route path="/analyse" element={<Analysis />} />
        <Route path="/community" element={<CommunityForum/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
