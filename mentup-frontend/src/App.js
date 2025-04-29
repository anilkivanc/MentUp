import React from 'react';
import './App.css';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Pricing from './pages/pricing/Pricing';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          {/* Login sayfası için rota */}
          <Route path="/login" element={<Login />} />
          {/* Signup sayfası için rota */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pricing" element={<Pricing />}/>
          <Route path='/menteeprofile' element={<MenteeProfile />}/>
          <Route path='/aboutus' element={<AboutUs />}/>
          <Route path='/accountsettings' element={<AccountSettings />}/>
          <Route path='/applymentorship' element={<ApplyMentorship />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/mentorreview' element={<MentorReview />}/>
          <Route path='/mentorlogin' element={<MentorLogin />}/>
          <Route path='/browsementors' element={<BrowseMentors />} />
          <Route path='/appointments' element={<Appointments />} />
          <Route path='/mentors' element={<Mentors />} />
          <Route path='/browsementors' element={<BrowseMentors />} />,
          <Route path='/videochat' element={<VideoChat />} />
          <Route path='/adminpanel' element={<AdminPanel />} />



        </Routes>
      </Router>
    </div>
  );
}

export default App;
