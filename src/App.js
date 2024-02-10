import React, { createContext, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import All from "./Pages/All";
import Tasks from "./Pages/Tasks";
import Marketing from "./Pages/marketing";
import Roadmap from "./Pages/roadmap";
import Board from "./Pages/createBoard";
import Page404 from "./Pages/404";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const LoginContext = createContext({ isLogin: false, setLogin: () => {} });

export default function App() {
  const [isLogin, setLogin] = useState(false);
  console.log(isLogin);

  return (
    <Router>
      <LoginContext.Provider value={{ isLogin, setLogin }}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="/signup"
            element={isLogin ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/marketing"
            element={isLogin ? <Marketing /> : <Navigate to="/" />}
          />
          <Route
            path="/roadmap"
            element={isLogin ? <Roadmap /> : <Navigate to="/" />}
          />
          <Route
            path="/board"
            element={isLogin ? <Board /> : <Navigate to="/" />}
          />
          <Route
            path="/task"
            element={isLogin ? <All /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </LoginContext.Provider>
    </Router>
  );
}
export { LoginContext };
