import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NotFound from "./pages/NotFound.jsx";
import CourseList from "./components/CourseList.jsx";
import CourseDetail from "./components/CourseDetail.jsx";
import MainLayout from "./Layout/MainLayout.jsx";
import Courses from "./components/Courses.jsx";
import AddCoursePage from "./pages/AddCoursePage.jsx";
const Logout = () => {
  localStorage.clear();
  return <Navigate to='/login' />;
};

const RegisterAndLogout = () => {
  localStorage.clear();
  return <Register />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
                <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/logout" element={<Logout />} />


        <Route path="/" element={<MainLayout />} >
        <Route path="/" element={<ProtectedRoute> <CourseList /> </ProtectedRoute>} />
        <Route path="/courses/:id" element={<ProtectedRoute> <CourseDetail /> </ProtectedRoute>} />
            <Route path='/add-course' element={<ProtectedRoute> <AddCoursePage /> </ProtectedRoute>} />
         <Route path="/courses" element={<Courses />} />
        <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
