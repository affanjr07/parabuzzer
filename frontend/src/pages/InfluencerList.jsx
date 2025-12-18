import { useEffect, useState } from "react";
import { api } from "../services/api";
import InfluencerCard from "../components/InfluencerCard";
import { FiSearch, FiFilter, FiUsers, FiTrendingUp } from "react-icons/fi";

export default function InfluencerList() {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = ["Semua", "Tiktok", "Entertainment", "Lifestyle", "Gaming", "Foodie"];

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const res = await api.get("/influencers");
        setInfluencers(res.data || []);
      } catch (err) {
        console.error("Fetch influencers error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  // Filter Logika
  const filteredInfluencers = influencers.filter((inf) => {
    const matchesSearch = inf.username.toLowerCase().includes(searchQuery.toLowerCase());
    // Jika backend punya kolom category, aktifkan baris di bawah:
    // const matchesCategory = activeCategory === "Semua" || inf.category === activeCategory;
    return matchesSearch; 
  });

  return (
    <div className="bg-[#FBFCFE] min-h-screen pb-24">
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                Explore <span className="text-purple-600">Influencers</span>
              </h1>
              <p className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-tighter">
                Temukan partner kreatif untuk pertumbuhan brand Anda
              </p>
            </div>

            {/* SEARCH BAR */}
            <div className="relative group max-w-md w-full">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Cari username influencer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-purple-600 focus:bg-white rounded-[1.5rem] outline-none transition-all shadow-sm font-medium"
              />
            </div>
          </div>

          {/* CATEGORY CHIPS */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar mt-8 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                  activeCategory === cat
                    ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200"
                    : "bg-white border-slate-100 text-slate-400 hover:border-purple-200 hover:text-purple-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* STATS SUMMARY (Optional UI Touch) */}
        <div className="flex gap-6 mb-10 overflow-hidden">
            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><FiUsers /></div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Total Talent</p>
                    <p className="text-lg font-black text-slate-800">{influencers.length}</p>
                </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center"><FiTrendingUp /></div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Active Today</p>
                    <p className="text-lg font-black text-slate-800">Available</p>
                </div>
            </div>
        </div>

        {/* MAIN GRID */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-slate-100 animate-pulse h-72 rounded-[2rem]"></div>
            ))}
          </div>
        ) : filteredInfluencers.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch size={40} />
            </div>
            <p className="text-slate-400 font-bold">Influencer tidak ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredInfluencers.map((item) => (
              <div key={item.id} className="transition-transform duration-300 hover:-translate-y-2">
                <InfluencerCard data={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}