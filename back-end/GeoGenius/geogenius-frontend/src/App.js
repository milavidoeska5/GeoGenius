import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProposeCardPage from "./pages/ProposeCardPage";
import AdminPanel from "./pages/AdminPanel";
import UserProfile from "./pages/UserProfile";
import Chatbot from "./pages/Chatbot";
import QuizStart from "./pages/QuizStart";
import QuizPage from "./pages/QuizPage";


function App() {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Protected routes */}
                  <Route path="/" element={
                      <PrivateRoute><HomePage /></PrivateRoute>
                  } />
                  <Route path="/propose" element={
                      <PrivateRoute><ProposeCardPage /></PrivateRoute>
                  } />
                  <Route path="/admin" element={
                      <PrivateRoute allowedRole="ADMIN"><AdminPanel /></PrivateRoute>
                  } />
                  <Route path="/profile" element={
                      <PrivateRoute><UserProfile /></PrivateRoute>
                  } />
                  <Route path="/chatbot" element={
                      <PrivateRoute><Chatbot /></PrivateRoute>
                  } />
                  <Route path="/quiz" element={
                      <PrivateRoute><QuizStart /></PrivateRoute>
                  } />
                  <Route path="/quiz/:topic" element={
                      <PrivateRoute><QuizPage /></PrivateRoute>
                  } />

                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          </Router>
      </AuthProvider>
  );
}

export default App;
