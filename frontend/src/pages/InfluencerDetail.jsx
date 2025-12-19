import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  FiStar,
  FiChevronLeft,
  FiInfo,
  FiCreditCard,
  FiCheckCircle,
  FiSmartphone,
  FiArrowRight,
} from "react-icons/fi";

export default function InfluencerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const role = auth?.user?.role;

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

  // ❌ TIDAK DIUBAH (sesuai permintaan)
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

setOpenBooking(false);
navigate("/payment-success");

    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!influencer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* HEADER */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-4 py-4 flex items-center border-b">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-full"
        >
          <FiChevronLeft size={24} />
        </button>
        <span className="ml-2 font-bold">Detail Influencer</span>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* PROFILE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={influencer.avatar_url || "https://placehold.co/300"}
              alt={influencer.username}
              className="w-40 h-40 rounded-2xl object-cover"
            />

            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-black capitalize">
                {influencer.username}
              </h1>

              <div className="flex items-center gap-2 text-orange-500 font-bold">
                <FiStar className="fill-current" />
                {reviews.length
                  ? (
                      reviews.reduce((a, b) => a + b.rating, 0) /
                      reviews.length
                    ).toFixed(1)
                  : "5.0"}
              </div>

              <p className="italic text-slate-500">
                {influencer.bio ||
                  "Kreator konten profesional yang siap membantu brand berkembang."}
              </p>

              <p className="text-3xl font-black text-purple-600">
                Rp {Number(influencer.price).toLocaleString()}
              </p>

              {/* ✅ BOOKING BUTTON (ROLE SAFE) */}
              <button
                onClick={() => {
                  if (!auth) {
                    navigate("/login", {
                      state: { from: `/influencer/${id}` },
                    });
                    return;
                  }

                  if (role === "admin") {
                    alert("Admin tidak dapat melakukan booking.");
                    return;
                  }

                  if (role === "influencer") {
                    alert("Influencer tidak dapat melakukan booking.");
                    return;
                  }

                  setOpenBooking(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2"
              >
                Booking Sekarang <FiArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div>
          <h2 className="font-black text-xl mb-4">
            Apa Kata Mereka? ({reviews.length})
          </h2>

          {reviews.length === 0 ? (
            <div className="bg-white p-6 rounded-xl text-center text-slate-400">
              <FiInfo size={32} className="mx-auto mb-2" />
              Belum ada review
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white p-4 rounded-xl">
                  <div className="flex text-orange-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={i < r.rating ? "fill-current" : ""}
                      />
                    ))}
                  </div>
                  <p className="text-sm">"{r.comment}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* BOOKING MODAL */}
      {openBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">
            <h3 className="font-black text-xl mb-4 text-center">
              Metode Pembayaran
            </h3>

            <div className="space-y-3 mb-6">
              <div
                onClick={() => setPaymentMethod("qris")}
                className={`p-4 border rounded-xl cursor-pointer ${
                  paymentMethod === "qris" && "border-purple-600 bg-purple-50"
                }`}
              >
                <FiSmartphone /> QRIS / E-Wallet
              </div>

              <div
                onClick={() => setPaymentMethod("bni")}
                className={`p-4 border rounded-xl cursor-pointer ${
                  paymentMethod === "bni" && "border-purple-600 bg-purple-50"
                }`}
              >
                <FiCreditCard /> Transfer Bank
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setOpenBooking(false)}
                className="py-3 rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={handleBooking}
                disabled={loading}
                className="bg-purple-600 text-white py-3 rounded-xl font-black disabled:opacity-50"
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
