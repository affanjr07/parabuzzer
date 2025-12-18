import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // State untuk feedback sukses

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      
      const authData = {
        user: res.data.user,
        profile: res.data.profile,
        token: res.data.access_token,
      };

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("auth", JSON.stringify(authData));
      
      setAuth(authData);
      setIsSuccess(true); // Tampilkan UI sukses

      // Tunggu 1.5 detik agar user bisa melihat feedback sukses
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.error || "Login gagal, silakan cek kembali.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFCFE] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-50 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-50 rounded-full blur-3xl" />

      <div className="w-full max-w-[400px] bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-purple-500/5 relative z-10">
        
        {/* LOGO & HEADER */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-purple-600 text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-purple-200">
            P
          </div>
          <h1 className="text-2xl text-slate-800 tracking-tight">Selamat Datang</h1>
          <p className="text-sm text-slate-400 mt-1">Masuk ke akun Para Buzzer Anda</p>
        </div>

        {/* FEEDBACK UI */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-2xl flex items-center gap-3 text-red-500 text-sm animate-shake">
            <FiAlertCircle className="flex-shrink-0" size={18} />
            <p>{error}</p>
          </div>
        )}

        {isSuccess && (
          <div className="mb-6 p-4 bg-green-50 rounded-2xl flex items-center gap-3 text-green-600 text-sm animate-bounce-in">
            <FiCheckCircle className="flex-shrink-0" size={18} />
            <p>Login Berhasil! Mengalihkan...</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              placeholder="Alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-500/20 transition-all outline-none text-slate-600"
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-500/20 transition-all outline-none text-slate-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || isSuccess}
            className={`w-full py-4 rounded-2xl text-white transition-all shadow-lg shadow-purple-200 flex justify-center items-center gap-2
              ${isSuccess ? 'bg-green-500 shadow-green-100' : 'bg-purple-600 hover:bg-purple-700 active:scale-95'}
              ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isSuccess ? "Berhasil!" : "Masuk Sekarang"}
          </button>
        </form>

        <p className="text-center text-sm mt-8 text-slate-500">
          Belum bergabung?{" "}
          <Link to="/register" className="text-purple-600 hover:text-purple-700 underline underline-offset-4">
            Daftar Akun
          </Link>
        </p>
      </div>
    </div>
  );
}