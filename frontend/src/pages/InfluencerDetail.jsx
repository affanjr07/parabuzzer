import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { 
  FiStar, FiChevronLeft, FiInfo, FiCreditCard, 
  FiCheckCircle, FiSmartphone, FiArrowRight 
} from "react-icons/fi";

export default function InfluencerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [influencer, setInfluencer] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [openBooking, setOpenBooking] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inf, rev] = await Promise.all([
          api.get(`/influencers/${id}`),
          api.get(`/reviews/influencer/${id}`),
        ]);
        setInfluencer(inf.data);
        setReviews(rev.data || []);
      } catch (err) {
        console.error("Fetch influencer detail error:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleBooking = async () => {
    try {
      setLoading(true);
      await api.post("/bookings", {
        influencer_id: influencer.id,
        campaign_name: "Campaign Instagram",
        note: "Posting feed + story",
        price: influencer.price,
        payment_method: paymentMethod,
      });
      alert("Booking berhasil! Menunggu approval influencer.");
      setOpenBooking(false);
    } catch (err) {
      console.error("Booking error:", err);
      alert("Booking gagal");
    } finally {
      setLoading(false);
    }
  };

  if (!influencer) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-600"></div>
    </div>
  );

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* HEADER NAV (Mobile Friendly) */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-4 py-4 flex items-center border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <FiChevronLeft size={24} className="text-slate-700" />
        </button>
        <span className="ml-2 font-bold text-slate-800">Detail Influencer</span>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        
        {/* ================= PROFILE CARD ================= */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex flex-col md:flex-row p-6 md:p-8 gap-8 items-center md:items-start">
            {/* Avatar Section */}
            <div className="relative">
              <img
                src={influencer.avatar_url || "https://placehold.co/300"}
                alt={influencer.username}
                className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] object-cover shadow-xl border-4 border-white"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white w-8 h-8 rounded-full shadow-lg"></div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tight capitalize">
                  {influencer.username}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded-full border border-purple-100 uppercase tracking-wider">
                    Official Member
                  </span>
                  <div className="flex items-center text-orange-500 font-bold text-sm">
                    <FiStar className="fill-current mr-1" />
                    {reviews.length > 0 ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1) : "5.0"}
                  </div>
                </div>
              </div>

              <p className="text-slate-500 leading-relaxed max-w-lg italic">
                "{influencer.bio || "Kreator konten profesional yang siap membantu brand Anda bersinar di media sosial."}"
              </p>

              <div className="pt-2">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Starting Price</p>
                <p className="text-3xl font-black text-purple-600">
                  <span className="text-lg font-bold mr-1 italic">Rp</span>
                  {Number(influencer.price || 0).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setOpenBooking(true)}
                className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-lg shadow-purple-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Booking Sekarang <FiArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* ================= REVIEWS SECTION ================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-black text-xl text-slate-800">Apa Kata Mereka?</h2>
            <span className="text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg">
              {reviews.length} Review
            </span>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl border border-dashed border-slate-200 text-center">
              <FiInfo size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-400 font-medium tracking-tight">Belum ada review untuk saat ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-purple-200 transition-colors">
                  <div className="flex items-center gap-1 text-orange-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={`w-3 h-3 ${i < r.rating ? "fill-current" : "text-slate-200"}`} />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-3 font-medium">
                    "{r.comment}"
                  </p>
                  <div className="flex items-center gap-2 border-t pt-3 border-slate-50">
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
                      {r.profiles?.name?.charAt(0)}
                    </div>
                    <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">
                      {r.profiles?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= BOOKING MODAL ================= */}
      {openBooking && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl scale-up-animation">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiCreditCard size={32} />
              </div>
              <h2 className="font-black text-2xl text-slate-800">Metode Pembayaran</h2>
              <p className="text-slate-400 text-sm mt-1">Selesaikan booking untuk memulai campaign</p>
            </div>

            <div className="space-y-3 mb-8">
              <div 
                onClick={() => setPaymentMethod("qris")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === "qris" ? "border-purple-600 bg-purple-50" : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <FiSmartphone className={paymentMethod === "qris" ? "text-purple-600" : "text-slate-400"} size={24} />
                  <div>
                    <p className="font-bold text-slate-800">E-Wallet / QRIS</p>
                    <p className="text-xs text-slate-400">OVO, Dana, GoPay, ShopeePay</p>
                  </div>
                </div>
                {paymentMethod === "qris" && <FiCheckCircle className="text-purple-600" />}
              </div>

              <div 
                onClick={() => setPaymentMethod("bni")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === "bni" ? "border-purple-600 bg-purple-50" : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <FiCreditCard className={paymentMethod === "bni" ? "text-purple-600" : "text-slate-400"} size={24} />
                  <div>
                    <p className="font-bold text-slate-800">Transfer Bank</p>
                    <p className="text-xs text-slate-400">Virtual Account BNI / Mandiri</p>
                  </div>
                </div>
                {paymentMethod === "bni" && <FiCheckCircle className="text-purple-600" />}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setOpenBooking(false)}
                className="py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleBooking}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-purple-100 transition-all disabled:opacity-50"
              >
                {loading ? "..." : "Konfirmasi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}