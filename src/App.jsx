import './App.css'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from './appwrite/auth';
import { login, logout } from "./store/authSlice";
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);  // FIXED
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);  // FIXED
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-400"> {/* FIXED */}
      <Header />
      <main className="flex-1"> {/* LET PAGES EXPAND */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
