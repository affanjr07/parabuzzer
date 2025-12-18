import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { api } from "../services/api";
import InfluencerCardSmall from "../components/InfluencerCardSmall";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Icons
import { 
  FiChevronRight, 
  FiZap, 
  FiStar, 
  FiUsers, 
  FiCpu, 
  FiTarget, 
  FiGrid, 
  FiArrowRight 
} from "react-icons/fi";

// Asset (Pastikan path ini benar di folder project Anda)
import bannerHome from "../assets/banners/banner.png";
import bannerReview from "../assets/banners/banner2.png";
import bannerPromo from "../assets/banners/banner3.png";

export default function Home() {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Data Banner untuk Slider
  const banners = [
    { id: 1, img: bannerHome, title: "Find Best Influencer" },
    { id: 2, img: bannerReview, title: "Grow Your Business" },
    { id: 3, img: bannerPromo, title: "Connect with Brands" },
  ];

  // Data Kategori
  const categories = [
    { name: "Tiktok", icon: <FiZap className="text-pink-500" />, bg: "bg-pink-50" },
    { name: "Entertainment", icon: <FiStar className="text-yellow-500" />, bg: "bg-yellow-50" },
    { name: "Mom & Kids", icon: <FiUsers className="text-blue-500" />, bg: "bg-blue-50" },
    { name: "Gaming", icon: <FiCpu className="text-purple-500" />, bg: "bg-purple-50" },
    { name: "Foodie", icon: <FiTarget className="text-orange-500" />, bg: "bg-orange-50" },
    { name: "Lainnya", icon: <FiGrid className="text-slate-500" />, bg: "bg-slate-50" },
  ];

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

  return (
    <div className="bg-[#FBFCFE] min-h-screen pb-24 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto overflow-hidden">
        
        {/* ================= HERO SECTION (SLIDER) ================= */}
        <section className="px-4 mt-6">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={15}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            className="rounded-[2.5rem] shadow-2xl shadow-purple-900/10 overflow-hidden border-4 border-white"
          >
            {banners.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative group overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-[220px] md:h-[420px] object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  />
                  {/* Overlay gradasi untuk teks (opsional) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 text-white hidden md:block">
                    <h2 className="text-3xl font-black tracking-tight drop-shadow-lg">{item.title}</h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* ================= CATEGORY SECTION ================= */}
        <section className="px-4 mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-black text-2xl tracking-tight text-slate-800">
              Kategori <span className="text-purple-600">Terpopuler</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-5">
            {categories.map((cat) => (
              <div 
                key={cat.name} 
                className="group flex flex-col items-center gap-3 p-5 rounded-[2.5rem] bg-white border border-slate-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 ${cat.bg} flex items-center justify-center rounded-[1.5rem] text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  {cat.icon}
                </div>
                <span className="text-[11px] md:text-xs font-black text-slate-500 uppercase tracking-widest text-center">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= RECOMMENDED SECTION ================= */}
        <section className="mt-16">
          <div className="px-4 flex justify-between items-end mb-8">
            <div>
              <h2 className="font-black text-2xl text-slate-800 tracking-tight">
                Rekomendasi <span className="text-purple-600">Influencer</span>
              </h2>
              <p className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-tighter italic">Pilihan terbaik untuk campaign Anda</p>
            </div>
            <Link
              to="/influencer"
              className="flex items-center gap-2 text-sm font-black text-purple-600 bg-purple-50 px-5 py-2.5 rounded-2xl hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              LIHAT SEMUA <FiChevronRight />
            </Link>
          </div>

          <div className="relative group">
            {/* Scroll Area */}
            <div className="flex gap-6 overflow-x-auto px-4 pb-10 no-scrollbar scroll-smooth">
              {loading ? (
                /* Skeleton Loader */
                [...Array(5)].map((_, i) => (
                  <div key={i} className="min-w-[200px] md:min-w-[240px] h-72 bg-slate-100 animate-pulse rounded-[2.5rem]" />
                ))
              ) : influencers.length === 0 ? (
                <div className="w-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 mx-4">
                  <FiUsers size={48} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-slate-400 font-bold">Belum ada influencer terdaftar</p>
                </div>
              ) : (
                influencers.slice(0, 10).map((item) => (
                  <div key={item.id} className="min-w-[200px] md:min-w-[240px] transition-transform duration-300 hover:-translate-y-2">
                    <InfluencerCardSmall data={item} />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ================= PROMO CARD SECTION ================= */}
        <section className="px-4 mt-10 mb-10">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl shadow-slate-200">
            <div className="relative z-10 max-w-lg text-center md:text-left">
              <div className="inline-block px-4 py-1 bg-purple-600 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-4">
                Exclusive Opportunity
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight">
                Tingkatkan Brand Awareness <br className="hidden md:block" /> Sekarang Juga!
              </h3>
              <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                Ribuan influencer siap membantu mempromosikan produk Anda ke target pasar yang tepat. Proses cepat dan aman.
              </p>
              <Link to ="/influencer">
                <button className="flex items-center gap-3 bg-white text-slate-900 font-black px-10 py-4 rounded-2xl shadow-xl hover:bg-purple-100 transition-all active:scale-95 mx-auto md:mx-0 group">
                Mulai Booking <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              </Link>

            </div>

            {/* Elemen Dekoratif */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]" />
            <div className="absolute top-10 right-10 w-2 h-2 bg-purple-500 rounded-full animate-ping" />
          </div>
        </section>

      </div>
      
      {/* CSS Inline untuk Sembunyikan Scrollbar (Bisa dipindah ke index.css) */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .swiper-pagination-bullet { background: #E2E8F0; opacity: 1; height: 6px; width: 6px; transition: all 0.3s; }
        .swiper-pagination-bullet-active { background: #9333EA !important; width: 24px; border-radius: 5px; }
      `}} />
    </div>
  );
}