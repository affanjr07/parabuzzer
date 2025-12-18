import { Link } from "react-router-dom";
import { 
  FiUsers, 
  FiDollarSign, 
  FiTrendingUp, 
  FiSettings, 
  FiArrowRight, 
  FiPlusCircle,
  FiActivity
} from "react-icons/fi";

export default function AdminDashboard() {
  
  // Data Statik untuk Ringkasan Statistik
  const stats = [
    { label: "Total Influencer", value: "128", icon: <FiUsers />, color: "bg-blue-50 text-blue-600" },
    { label: "Pendapatan Bulan Ini", value: "Rp 12.5M", icon: <FiDollarSign />, color: "bg-green-50 text-green-600" },
    { label: "Transaksi Aktif", value: "43", icon: <FiActivity />, color: "bg-purple-50 text-purple-600" },
    { label: "Growth", value: "+12%", icon: <FiTrendingUp />, color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-[#FBFCFE] p-6 pb-24">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl text-slate-800 tracking-tight">
            Admin <span className="text-purple-600">Console</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1 uppercase tracking-[0.1em]">
            Kelola ekosistem influencer dan pantau transaksi
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-xl mb-4`}>
                {item.icon}
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-xl text-slate-800">{item.value}</p>
            </div>
          ))}
        </div>

        {/* MAIN ACTIONS */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* KELOLA INFLUENCER CARD */}
          <div className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:border-purple-200 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-[1.5rem] flex items-center justify-center text-2xl">
                <FiUsers />
              </div>
              <Link to="/admin/influencer/add" className="text-purple-600 hover:bg-purple-50 p-2 rounded-full transition-colors">
                <FiPlusCircle size={24} />
              </Link>
            </div>
            
            <h2 className="text-xl text-slate-800 mb-2">Manajemen Influencer</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              Verifikasi pendaftar baru, perbarui profil talent, atau hapus influencer yang sudah tidak aktif dari direktori.
            </p>
            
            <Link
              to="/admin/influencer"
              className="flex items-center justify-center gap-2 bg-slate-900 text-white w-full py-4 rounded-2xl hover:bg-purple-600 transition-all group-hover:shadow-lg group-hover:shadow-purple-200"
            >
              Buka Direktori <FiArrowRight />
            </Link>
          </div>

          {/* TRANSAKSI CARD */}
          <div className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center text-2xl">
                <FiDollarSign />
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mt-2 mr-2"></div>
            </div>
            
            <h2 className="text-xl text-slate-800 mb-2">Riwayat Transaksi</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              Pantau arus kas masuk, konfirmasi pembayaran dari brand, dan pastikan pencairan dana influencer berjalan lancar.
            </p>
            
            <Link
              to="/admin/transactions"
              className="flex items-center justify-center gap-2 bg-slate-900 text-white w-full py-4 rounded-2xl hover:bg-blue-600 transition-all group-hover:shadow-lg group-hover:shadow-blue-200"
            >
              Lihat Transaksi <FiArrowRight />
            </Link>
          </div>

        </div>

        {/* FOOTER ACTION (OPTIONAL) */}
        <div className="mt-10 flex justify-center">
          <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm transition-colors">
            <FiSettings /> Dashboard Settings
          </button>
        </div>

      </div>
    </div>
  );
}