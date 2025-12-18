import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api";
import { FiUser, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", { name, email, password });
      setRegistered(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Pendaftaran gagal, coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFCFE] flex items-center justify-center px-4 relative">
      <div className="w-full max-w-[400px] bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-purple-500/5 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
            P
          </div>
          <h1 className="text-2xl text-slate-800 tracking-tight">Buat Akun Baru</h1>
          <p className="text-sm text-slate-400 mt-1">Mulai campaign influencer Anda hari ini</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-500 text-xs rounded-2xl flex items-center gap-2">
            <FiCheckCircle className="rotate-180" /> {error}
          </div>
        )}

        {registered && (
          <div className="mb-6 p-4 bg-green-50 text-green-600 text-sm rounded-2xl flex items-center gap-3">
            <FiCheckCircle /> Akun berhasil dibuat! Mengalihkan...
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="group">
            <label className="text-[11px] text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Nama Lengkap</label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 focus:ring-4 focus:ring-purple-500/5 transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 focus:ring-4 focus:ring-purple-500/5 transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 focus:ring-4 focus:ring-purple-500/5 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || registered}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl hover:bg-purple-600 transition-all active:scale-95 shadow-lg mt-4 disabled:opacity-50"
          >
            {loading ? "Menyimpan Data..." : registered ? "Terdaftar!" : "Daftar Sekarang"}
          </button>
        </form>

        <div className="text-center mt-8 text-sm">
          <p className="text-slate-400">
            Sudah memiliki akun?{" "}
            <Link to="/login" className="text-purple-600 underline underline-offset-4">
              Login disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}