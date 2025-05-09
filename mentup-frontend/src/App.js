import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Navbar2 from './components/NavBar2/Navbar2';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Pricing from './pages/pricing/Pricing';
import MenteeProfile from './pages/MenteeProfile/MenteeProfile';
import AboutUs from './pages/AboutUs/AboutUs';
import AccountSettings from './pages/accountSettings/AccountSettings';
import ApplyMentorship from './pages/applyMentorship/ApplyMentorship';
import Contact from './pages/contact/Contact';
import MentorReview from './pages/mentorReview/MentorReview';
import MentorLogin from './pages/MentorLogin/MentorLogin';
import BrowseMentors from './pages/browseMentors/BrowseMentors';
import Appointments from './pages/appointments/Appointments';
import Mentors from './pages/mentors/Mentors';
import VideoChat from './pages/videochat/VideoChat';
import AdminPanel from './admin/pages/adminPanel/adminPanel';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import AdminDashboard from './admin/pages/adminDashboard/AdminDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); // Mevcut route'u almak için

  useEffect(() => {
    // Kullanıcının oturum açıp açmadığını kontrol et
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Eğer token varsa true, yoksa false
  }, []);

  // Navbar'ı gizlemek istediğiniz route'lar
  const noNavbarRoutes = ['/login', '/signup', '/forgotpassword'];

  return (
    <div className="App">
      {/* Navbar'ı sadece belirli route'larda göster */}
      {!noNavbarRoutes.includes(location.pathname) && (isLoggedIn ? <Navbar2 /> : <NavBar />)}

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/menteeprofile" element={<MenteeProfile />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/accountsettings" element={<AccountSettings />} />
        <Route path="/applymentorship" element={<ApplyMentorship />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentorreview" element={<MentorReview />} />
        <Route path="/mentorlogin" element={<MentorLogin />} />
        <Route path="/browsementors" element={<BrowseMentors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/videochat" element={<VideoChat />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
