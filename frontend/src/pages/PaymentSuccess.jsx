import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <FiCheckCircle className="text-green-600" size={48} />
        </div>

        <h1 className="text-2xl font-black text-slate-800 mb-2">
          Pembayaran Berhasil
        </h1>

        <p className="text-slate-500 mb-8 leading-relaxed">
          Pembayaran berhasil diproses.<br />
          Silakan tunggu influencer menerima dan mengonfirmasi campaign.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-black transition"
        >
          Ke Dashboard
        </button>
      </div>
    </div>
  );
}
