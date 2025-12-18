import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { 
  FiUser, FiMail, FiShield, FiLogOut, 
  FiMessageCircle, FiClock, FiCheckCircle, 
  FiXCircle, FiStar 
} from "react-icons/fi";

export default function UserProfile() {
  const { auth, logout } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (auth) {
      fetchBookings();
    }
  }, [auth]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/me");
      setBookings(res.data || []);
    } catch (err) {
      console.error("Fetch bookings error:", err);
    }
  };

  if (!auth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <FiUser size={48} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">Kamu belum login</p>
        <Link to="/login" className="mt-4 text-purple-600 font-semibold hover:underline">Masuk ke Akun</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* HEADER SOLID */}
      <div className="h-32 bg-purple-700 w-full shadow-inner"></div>

      <div className="max-w-4xl mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KIRI: INFO PROFILE */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="p-6 text-center border-b border-slate-50">
                <div className="w-20 h-20 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-sm">
                  {auth.profile?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <h1 className="text-xl font-bold text-slate-800 truncate">
                  {auth.profile?.name || "User"}
                </h1>
                <span className="inline-block px-3 py-1 mt-2 text-[10px] font-bold tracking-wider uppercase bg-purple-50 text-purple-700 rounded-full border border-purple-100">
                  {auth.profile?.role}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <FiMail className="shrink-0 text-purple-400" />
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold leading-none mb-1">Email</p>
                    <p className="text-sm truncate font-medium">{auth.user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <FiShield className="shrink-0 text-purple-400" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold leading-none mb-1">Status Akun</p>
                    <p className="text-sm font-medium">Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KANAN: RIWAYAT BOOKING */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  Riwayat Booking
                  <span className="bg-purple-100 text-purple-700 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    {bookings.length}
                  </span>
                </h2>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-3xl">
                  <FiClock size={40} className="mx-auto text-slate-200 mb-3" />
                  <p className="text-slate-400 text-sm">Belum ada aktivitas booking</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="group bg-white border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-purple-300 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl shrink-0 ${
                          b.status === 'approved' ? 'bg-green-100 text-green-600' : 
                          b.status === 'rejected' ? 'bg-red-100 text-red-600' : 
                          b.status === 'done' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {b.status === 'approved' ? <FiCheckCircle size={22}/> : 
                           b.status === 'rejected' ? <FiXCircle size={22}/> : 
                           b.status === 'done' ? <FiCheckCircle size={22}/> : <FiClock size={22}/>}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-base leading-tight mb-1 group-hover:text-purple-700 transition-colors">
                            {b.campaign_name}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-opacity-10 ${
                              b.status === 'approved' ? 'text-green-600 bg-green-600' : 
                              b.status === 'rejected' ? 'text-red-500 bg-red-500' : 
                              b.status === 'done' ? 'text-blue-600 bg-blue-600' : 'text-orange-500 bg-orange-500'
                            }`}>
                              {b.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto">
                        {/* BUTTON CHAT: Muncul jika status Approved */}
                        {b.status === "approved" && (
                          <Link
                            to={`/chat/${b.id}`}
                            className="flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 w-full sm:w-auto"
                          >
                            <FiMessageCircle size={18} />
                            Chat Influencer
                          </Link>
                        )}

                        {/* BUTTON REVIEW: Muncul jika status Done */}
                        {b.status === "done" && (
                          <Link
                            to={`/review/${b.id}`}
                            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 w-full sm:w-auto"
                          >
                            <FiStar size={18} className="fill-current" />
                            Beri Review
                          </Link>
                        )}

                        {b.status === "pending" && (
                          <div className="flex items-center justify-center gap-2 text-slate-400 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-xs font-bold w-full sm:w-auto">
                            PENDING...
                          </div>
                        )}

                        {b.status === "rejected" && (
                          <div className="text-center text-red-400 bg-red-50 px-4 py-2.5 rounded-xl border border-red-50 text-xs font-bold w-full sm:w-auto">
                            DITOLAK
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}