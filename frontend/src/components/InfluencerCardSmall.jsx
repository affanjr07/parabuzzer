import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiYoutube, FiCheckCircle } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

export default function InfluencerCardSmall({ data }) {
  const avatar = data.avatar_url || "/avatar-default.png";

  // Fungsi untuk menampilkan ikon platform secara dinamis
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
      className="group block min-w-[170px] bg-white rounded-[2rem] border border-slate-100 p-3 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
    >
      {/* Container Image dengan Overlay Ringan */}
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <img
          src={avatar}
          alt={data.name}
          className="w-full h-40 object-cover bg-slate-50 transition-transform duration-500 group-hover:scale-110"
        />
        {/* Badge Platform (Floating) */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
          {getPlatformIcon(data.platform)}
        </div>
      </div>

      <div className="mt-4 px-1">
        {/* Nama & Verified Icon */}
        <div className="flex items-center gap-1">
          <h3 className="text-[14px] text-slate-800 truncate tracking-tight">
            {data.name}
          </h3>
          <FiCheckCircle className="text-blue-500 w-3 h-3 flex-shrink-0" />
        </div>

        {/* Username/Platform Handle */}
        <p className="text-[11px] text-slate-400 mt-0.5 truncate uppercase tracking-wider">
          @{data.username || data.platform}
        </p>

        {/* Divider Tipis */}
        <div className="h-px w-full bg-slate-50 my-3" />

        {/* Harga */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Mulai dari</span>
          <p className="text-[14px] text-purple-600 tracking-tight">
            Rp {Number(data.price || 0).toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}