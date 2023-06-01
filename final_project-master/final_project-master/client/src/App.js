import React from "react";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import TopBar from "./components/topbar/TopBar";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import RegisterForm from "./pages/register/Register";
import LoginForm from "./pages/login/Login";
import { useContext } from "react";
import { Context } from "./context/Context";

/*I am adding random line bee bpp */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>

        <Route
          exact
          path="/register"
          element={user ? <Home /> : <RegisterForm />}
        ></Route>

        <Route exact path="/contact" element={<Contact />}></Route>

        <Route exact path="/about" element={<About />}></Route>

        <Route path="/login" element={user ? <Home /> : <LoginForm />}></Route>

        <Route
          exact
          path="/write"
          element={user ? <Write /> : <LoginForm />}
        ></Route>

        <Route exact path="/post/:postId" element={<Single />}></Route>

        <Route exact path="/post/:categories" element={<Single />}></Route>

        <Route
          exact
          path="/settings"
          element={user ? <Settings /> : <LoginForm />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
