import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { Dashboard } from "./Pages/Dashboard";
import { Send } from "./Pages/Send";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="" element={<SignIn />} />

          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
