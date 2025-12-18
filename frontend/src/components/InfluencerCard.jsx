import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiYoutube, FiCheckCircle, FiUsers } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

export default function InfluencerCard({ data }) {
  const avatar = data.avatar_url || "/avatar-default.png";

  // Mapping Ikon Platform
  const getPlatformIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case "tiktok": return <FaTiktok className="text-slate-800" />;
      case "instagram": return <FiInstagram className="text-pink-600" />;
      case "twitter": return <FiTwitter className="text-blue-400" />;
      case "youtube": return <FiYoutube className="text-red-600" />;
      default: return null;
    }
  };

  return (
    <Link
      to={`/influencer/${data.id}`}
      className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 flex flex-col h-full"
    >
      {/* AREA GAMBAR */}
      <div className="relative aspect-[4/5] overflow-hidden m-2 rounded-[2rem]">
        <img
          src={avatar}
          alt={data.name}
          className="w-full h-full object-cover bg-slate-50 transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Gradasi & Badge Platform */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-sm border border-white/20">
          {getPlatformIcon(data.platform)}
        </div>
      </div>

      {/* AREA KONTEN */}
      <div className="p-5 pt-2 flex flex-col flex-grow">
        {/* Nama & Status */}
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="text-lg text-slate-800 truncate tracking-tight">
            {data.name}
          </h3>
          <FiCheckCircle className="text-blue-500 w-4 h-4 flex-shrink-0" />
        </div>

        {/* Username */}
        <p className="text-xs text-slate-400 uppercase tracking-[0.1em] mb-4">
          @{data.username || data.platform}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
            <FiUsers size={14} className="text-slate-400" />
            <span className="text-[12px] text-slate-600">
              {data.followers?.toLocaleString() || "0"}
            </span>
          </div>
          <span className="text-[10px] text-slate-300 uppercase tracking-widest">Followers</span>
        </div>

        {/* Harga & Action (Sticky di bawah card) */}
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-tighter leading-none mb-1">Price Start</p>
            <p className="text-lg text-purple-600 tracking-tighter">
              Rp {Number(data.price || 0).toLocaleString()}
            </p>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
            <FiInstagram size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}