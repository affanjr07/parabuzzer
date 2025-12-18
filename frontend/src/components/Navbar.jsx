import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMenu, FiX, FiUser, FiLogOut, FiLayout, FiStar, FiInfo, FiAlertCircle } from "react-icons/fi";

export default function Navbar() {
  const { pathname } = useLocation();
  const { auth, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State untuk Modal

  const isLoggedIn = !!auth?.user;
  const role = auth?.profile?.role;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll saat Menu Mobile ATAU Modal terbuka
  useEffect(() => {
    document.body.style.overflow = (isOpen || showLogoutModal) ? "hidden" : "unset";
  }, [isOpen, showLogoutModal]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const linkClass = (path) =>
    pathname === path
      ? "text-white bg-white/10 px-4 py-2 rounded-xl"
      : "text-purple-100 hover:text-white hover:bg-white/5 px-4 py-2 rounded-xl transition-all duration-300";

  const MenuLinks = () => (
    <>
      <Link to="/" onClick={closeMenu} className={linkClass("/")}>Home</Link>
      <Link to="/influencer" onClick={closeMenu} className={linkClass("/influencer")}>Influencer</Link>
      <Link to="/recommended" onClick={closeMenu} className={linkClass("/recommended")}>
        <span className="flex items-center gap-1.5"><FiStar size={16} className="text-yellow-400" /> Top</span>
      </Link>
      <Link to="/about" onClick={closeMenu} className={linkClass("/about")}>
        <span className="flex items-center gap-1.5"><FiInfo size={16} /> About</span>
      </Link>
      {role === "influencer" && (
        <Link to="/influencer/profile" onClick={closeMenu} className={linkClass("/influencer/profile")}>Dashboard</Link>
      )}
      {role === "admin" && (
        <Link to="/admin" onClick={closeMenu} className={linkClass("/admin")}>Admin</Link>
      )}
    </>
  );

  return (
    <>
      <nav className={`
        sticky top-0 z-[100] transition-all duration-300 px-4 py-3
        ${scrolled ? "bg-purple-700/90 backdrop-blur-md shadow-lg" : "bg-purple-700"}
      `}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2.5 z-[110]">
            <div className="w-10 h-10 bg-white text-purple-700 rounded-xl flex items-center justify-center shadow-lg">P</div>
            <div className="flex flex-col leading-none text-white text-lg tracking-tight">Para Buzzer</div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1 bg-black/5 p-1 rounded-2xl border border-white/5">
            <MenuLinks />
          </div>

          {/* AUTH ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <Link to="/login" className="bg-white text-purple-700 px-6 py-2 rounded-xl text-sm">Login</Link>
            ) : (
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <Link to="/profile" className="flex items-center gap-2 text-white bg-white/5 px-4 py-2 rounded-xl">
                  <FiUser size={18} /> <span className="text-sm">Profile</span>
                </Link>
                <button 
                  onClick={() => setShowLogoutModal(true)} 
                  className="p-2 text-purple-200 hover:text-red-300 transition-all"
                >
                  <FiLogOut size={18} />
                </button>
              </div>
            )}
          </div>

          {/* HAMBURGER */}
          <button onClick={toggleMenu} className="md:hidden text-white p-2 z-[110]">
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>

        {/* MOBILE OVERLAY MENU */}
        <div className={`
          fixed inset-0 bg-purple-900/98 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 md:hidden z-[100]
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
        `}>
          <div className="flex flex-col items-center gap-6 w-full px-10">
            <MenuLinks />
            <div className="h-px w-32 bg-white/10 my-4" />
            {!isLoggedIn ? (
              <Link to="/login" onClick={closeMenu} className="w-full max-w-[200px] bg-white text-purple-700 py-3 rounded-2xl text-center">Login</Link>
            ) : (
              <div className="flex flex-col gap-6 w-full max-w-[200px]">
                <Link to="/profile" onClick={closeMenu} className="bg-white text-purple-700 py-3 rounded-2xl text-center">Profile</Link>
                <button 
                  onClick={() => { setShowLogoutModal(true); setIsOpen(false); }} 
                  className="text-purple-200 py-2 flex items-center justify-center gap-2"
                >
                  <FiLogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- CUSTOM LOGOUT MODAL UI --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowLogoutModal(false)}
          ></div>

          {/* Modal Card */}
          <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl scale-in-center">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mb-4">
                <FiAlertCircle />
              </div>
              
              <h3 className="text-xl text-slate-800 mb-2">Konfirmasi Keluar</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Apakah Anda yakin ingin mengakhiri sesi ini? Anda harus login kembali untuk mengakses fitur tertentu.
              </p>

              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={() => { logout(); setShowLogoutModal(false); }}
                  className="w-full bg-red-500 text-white py-4 rounded-2xl hover:bg-red-600 transition-colors shadow-lg shadow-red-100"
                >
                  Ya, Logout Sekarang
                </button>
                <button 
                  onClick={() => setShowLogoutModal(false)}
                  className="w-full bg-slate-50 text-slate-500 py-4 rounded-2xl hover:bg-slate-100 transition-colors"
                >
                  Batalkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animasi Sederhana */}
      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .scale-in-center { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </>
  );
}