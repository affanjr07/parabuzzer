import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { FiCamera, FiSave, FiMessageCircle, FiCheck, FiX, FiCheckCircle, FiClock } from "react-icons/fi";

export default function InfluencerProfile() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bio, setBio] = useState("");
  const [price, setPrice] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchBookings();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/influencers/me/profile");
      setProfile(res.data);
      setBio(res.data.bio ?? "");
      setPrice(res.data.price ?? "");
      setPreview(res.data.avatar_url ?? null);
    } catch (err) {
      console.error("Fetch profile error:", err);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("bio", bio);
      formData.append("price", Number(price));
      if (avatar) formData.append("avatar", avatar);

      await api.patch("/influencers/me/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profil berhasil diperbarui");
      fetchProfile();
      setAvatar(null);
    } catch (err) {
      console.error("Update profile error:", err);
      alert("Gagal update profil");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get("/influencers/me/bookings");
      setBookings(res.data || []);
    } catch (err) {
      console.error("Fetch bookings error:", err);
    }
  };

  const updateBooking = async (id, status) => {
    const confirmMsg = status === "done" ? "Tandai pesanan ini sebagai selesai?" : `Ubah status ke ${status}?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      await api.patch(`/influencers/me/bookings/${id}`, { status });
      fetchBookings();
    } catch (err) {
      console.error("Update booking error:", err);
      alert("Gagal update booking");
    }
  };

  if (!profile) return <div className="p-10 text-center text-slate-500">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 space-y-8 max-w-5xl mx-auto pb-24">
      
      {/* ================= SECTION: EDIT PROFILE ================= */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-purple-700 h-24 w-full"></div>
        <div className="p-6 -mt-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* AVATAR UPLOAD */}
            <div className="relative group mx-auto md:mx-0">
              <img
                src={preview || "https://placehold.co/150x150"}
                alt="Avatar"
                className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover border-4 border-white shadow-xl"
              />
              <label className="absolute bottom-2 right-2 bg-purple-600 text-white p-2 rounded-xl cursor-pointer shadow-lg hover:bg-purple-700 transition-all scale-90 group-hover:scale-100">
                <FiCamera size={20} />
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>

            {/* PROFILE FORM */}
            <div className="flex-1 w-full space-y-5">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Bio Influencer</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tulis bio profesionalmu di sini..."
                    className="w-full border-2 border-slate-100 rounded-2xl p-4 mt-1.5 focus:border-purple-500 focus:ring-0 outline-none transition-all text-slate-700 min-h-[100px]"
                  />
                </div>

                <div className="max-w-xs">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Rate per Campaign (IDR)</label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full border-2 border-slate-100 rounded-2xl p-4 pl-12 focus:border-purple-500 outline-none transition-all font-bold text-slate-700"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={updateProfile}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-purple-100 transition-all active:scale-95 disabled:opacity-50"
              >
                <FiSave /> {loading ? "Saving..." : "Update Profil"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION: MANAGE BOOKINGS ================= */}
      <div className="space-y-4">
        <h2 className="font-black text-2xl text-slate-800 ml-2">Booking Masuk</h2>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
            <FiClock size={40} className="mx-auto text-slate-200 mb-3" />
            <p className="text-slate-400 font-medium">Belum ada pesanan yang masuk.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((b) => (
              <div key={b.id} className="bg-white border border-slate-100 rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  
                  {/* Info Kiri */}
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-2xl ${
                      b.status === 'approved' ? 'bg-blue-50 text-blue-600' : 
                      b.status === 'done' ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-500'
                    }`}>
                      {b.status === 'done' ? <FiCheckCircle size={24}/> : <FiMessageCircle size={24}/>}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 text-lg leading-tight">{b.campaign_name}</h3>
                      <p className="text-slate-400 text-sm font-medium">Klien: <span className="text-slate-600">{b.profiles?.name || "Anonim"}</span></p>
                      <span className={`inline-block mt-2 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
                        b.status === 'approved' ? 'bg-blue-100 text-blue-600' : 
                        b.status === 'done' ? 'bg-green-100 text-green-600' : 
                        b.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  </div>

                  {/* Aksi Kanan */}
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {/* Status: PENDING */}
                    {b.status === "pending" && (
                      <>
                        <button onClick={() => updateBooking(b.id, "approved")} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm">
                          <FiCheck /> Terima
                        </button>
                        <button onClick={() => updateBooking(b.id, "rejected")} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2.5 rounded-xl font-bold transition-all">
                          <FiX /> Tolak
                        </button>
                      </>
                    )}

                    {/* Status: APPROVED (TOMBOL SELESAI ADA DI SINI) */}
                    {b.status === "approved" && (
                      <div className="flex gap-2 w-full">
                        <Link to={`/chat/${b.id}`} className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md">
                          <FiMessageCircle /> Chat
                        </Link>
                        <button 
                          onClick={() => updateBooking(b.id, "done")} 
                          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-emerald-100"
                        >
                          <FiCheckCircle /> Selesai
                        </button>
                      </div>
                    )}

                    {/* Status: DONE */}
                    {b.status === "done" && (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 px-6 py-2 rounded-xl font-black text-xs border border-green-100 uppercase tracking-widest">
                        <FiCheckCircle /> Pesanan Selesai
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}