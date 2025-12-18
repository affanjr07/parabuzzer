import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api";
import { FiStar } from "react-icons/fi";

export default function Review() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    try {
      setLoading(true);

      await api.post("/reviews", {
        booking_id: bookingId,
        rating,
        comment,
      });

      alert("Review berhasil dikirim");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow mt-10">
      <h1 className="text-xl font-black mb-6 text-slate-800">
        Beri Review Influencer
      </h1>

      <label className="block mb-2 font-bold">Rating</label>
      <div className="flex gap-2 mb-4">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className={`p-2 rounded-full ${
              n <= rating ? "text-orange-400" : "text-slate-300"
            }`}
          >
            <FiStar size={24} className="fill-current" />
          </button>
        ))}
      </div>

      <label className="block mb-2 font-bold">Komentar</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="w-full border rounded-xl p-3 mb-6"
        placeholder="Bagaimana pengalaman kamu?"
      />

      <button
        onClick={submitReview}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-black"
      >
        {loading ? "Mengirim..." : "Kirim Review"}
      </button>
    </div>
  );
}
