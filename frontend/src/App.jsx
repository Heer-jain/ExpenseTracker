import { BrowserRouter as Router, Route,  Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import Budget from './pages/Budget';
import Expense from './pages/Expense';
import Income from './pages/Income';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';
import { AuthProvider } from './context/AuthContext';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const PrivateRoute=({element})=>{
    return isAuthenticated ? element : <Navigate to = "/login"/>
  }

  return (
    <AuthProvider>
    <div>
      <RefreshHandler setIsAuthentcated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/resetPassword/:token' element={<ResetPassword/>}/>
        <Route path="/home" element={
          <PrivateRoute element={<Home/>}/>
        } />
        <Route path="/analytics" element={
          <PrivateRoute element={<Analytics/>}/>
        } />
        <Route path="/budget" element={
          <PrivateRoute element={<Budget/>}/>
        } />
        <Route path="/expense" element={
          <PrivateRoute element={<Expense/>}/>
        } />
        <Route path="/income" element={
          <PrivateRoute element={<Income/>}/>
        } />
        <Route path="/profile" element={
          <PrivateRoute element={<Profile/>}/>
        } />
      </Routes>
    </div>
        </AuthProvider>
  );
}

export default App;
