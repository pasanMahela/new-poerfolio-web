import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ThemeProvider from "./components/ThemeProvider";
import { PartyModeProvider } from "./contexts/PartyModeContext";
import { ToastProvider } from "./components/Toast";
import CursorSpotlight from "./components/CursorSpotlight";
import ClickRipple from "./components/ClickRipple";
import PartyBackground from "./components/PartyBackground";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <PartyModeProvider>
          <ToastProvider>
            <Routes>
              {/* Admin Routes */}
              <Route path="/pasan100323" element={<AdminLogin />} />
              <Route path="/pasan100323/dashboard" element={<AdminDashboard />} />

              {/* Main Portfolio */}
              <Route path="*" element={
                <>
                  <PartyBackground />
                  <CursorSpotlight />
                  <ClickRipple />
                  <div className="relative z-10 min-h-dvh bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
                    <Navbar />
                    <Home />
                    <Footer />
                  </div>
                </>
              } />
            </Routes>
          </ToastProvider>
        </PartyModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
