import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiClipboard, FiArrowRight } from "react-icons/fi";
import { api } from "../../services/api";

export default function AdminDashboard() {
  const [totalInfluencer, setTotalInfluencer] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [infRes, orderRes] = await Promise.all([
        api.get("/influencers"),
        api.get("/admin/bookings"),
      ]);

      setTotalInfluencer(infRes.data?.length || 0);
      setTotalOrders(orderRes.data?.length || 0);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFCFE] p-6 pb-24">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl text-slate-800 tracking-tight">
            Admin <span className="text-purple-600">Dashboard</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1 uppercase tracking-wider">
            Ringkasan data sistem
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* TOTAL INFLUENCER */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-xl mb-4">
              <FiUsers />
            </div>
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">
              Total Influencer
            </p>
            <p className="text-3xl text-slate-800 font-bold">
              {loading ? "…" : totalInfluencer}
            </p>
          </div>

          {/* TOTAL ORDER */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-4">
              <FiClipboard />
            </div>
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">
              Total Order
            </p>
            <p className="text-3xl text-slate-800 font-bold">
              {loading ? "…" : totalOrders}
            </p>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* MANAGE INFLUENCER */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <h2 className="text-xl text-slate-800 mb-2">
              Manajemen Influencer
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Kelola data influencer yang terdaftar di platform.
            </p>
            <Link
              to="/admin/influencer"
              className="flex items-center justify-center gap-2 bg-purple-600 text-white w-full py-4 rounded-2xl hover:bg-purple-700 transition"
            >
              Buka Direktori <FiArrowRight />
            </Link>
          </div>

          {/* TRANSAKSI */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <h2 className="text-xl text-slate-800 mb-2">
              Riwayat Order
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Pantau semua booking yang masuk ke sistem.
            </p>
            <Link
              to="/admin/transactions"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white w-full py-4 rounded-2xl hover:bg-blue-700 transition"
            >
              Lihat Transaksi <FiArrowRight />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
