import { FiShield, FiZap, FiMessageCircle, FiCheckCircle } from "react-icons/fi";

export default function About() {
  const features = [
    {
      icon: <FiShield className="text-blue-500" />,
      title: "Transaksi Aman",
      desc: "Sistem pembayaran yang terjaga menjamin dana Anda aman hingga pekerjaan selesai."
    },
    {
      icon: <FiZap className="text-yellow-500" />,
      title: "Proses Cepat",
      desc: "Temukan, pilih, dan booking influencer favorit Anda hanya dalam beberapa klik."
    },
    {
      icon: <FiMessageCircle className="text-purple-500" />,
      title: "Komunikasi Langsung",
      desc: "Fitur live chat eksklusif memudahkan koordinasi kampanye setelah booking disetujui."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFCFE] pt-12 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <span className="text-[10px] text-purple-600 uppercase tracking-[0.3em] bg-purple-50 px-4 py-2 rounded-full">
            Tentang Kami
          </span>
          <h1 className="text-4xl text-slate-800 tracking-tight mt-6 mb-4">
            Menghubungkan <span className="text-purple-600">Ide</span> dengan <span className="text-blue-500">Pengaruh</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            ParaBuzzer adalah jembatan digital yang menghubungkan brand visioner dengan influencer kreatif untuk menciptakan dampak nyata.
          </p>
        </div>

        {/* MAIN CONTENT CARD */}
        <div className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-12 shadow-xl shadow-purple-500/5 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl text-slate-800 mb-6 tracking-tight">Visi & Misi Kami</h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                Kami percaya bahwa pemasaran influencer harus bisa diakses oleh siapa saja, mulai dari UMKM hingga perusahaan besar, dengan transparansi penuh tanpa biaya tersembunyi.
              </p>
              <div className="space-y-4">
                {["Transparansi Harga", "Influencer Terverifikasi", "Dukungan 24/7"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FiCheckCircle className="text-green-500 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-[2.5rem] aspect-square flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <p className="text-5xl mb-2 tracking-tighter">500+</p>
              <p className="text-purple-100 text-sm uppercase tracking-widest">Influencer Aktif</p>
            </div>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-purple-200 transition-all group">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-white group-hover:shadow-lg transition-all">
                {f.icon}
              </div>
              <h3 className="text-lg text-slate-800 mb-3 tracking-tight">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 mb-6">Siap untuk memulai kampanye pertama Anda?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl hover:bg-purple-600 transition-all w-full sm:w-auto">
              Cari Influencer
            </button>
            <button className="bg-white text-slate-600 border border-slate-200 px-8 py-4 rounded-2xl hover:bg-slate-50 transition-all w-full sm:w-auto">
              Hubungi Kami
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}