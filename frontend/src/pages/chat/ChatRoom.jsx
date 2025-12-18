import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import supabase from "../../services/supabaseClient";
import { FiSend, FiChevronLeft } from "react-icons/fi";

export default function ChatRoom() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  // 1. LOCK SCROLL BODY: Mencegah seluruh halaman discroll saat di room ini
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Kembalikan saat keluar dari chat
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchChat();
    const channel = supabase
      .channel("chat-" + bookingId)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chats", filter: `booking_id=eq.${bookingId}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [bookingId]);

  const fetchChat = async () => {
    try {
      const res = await api.get(`/chats/booking/${bookingId}`);
      setMessages(res.data || []);
    } catch (err) {
      console.error("Fetch chat error:", err);
    }
  };

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;
    const tempText = text;
    setText("");
    try {
      await api.post("/chats", { booking_id: bookingId, message: tempText });
    } catch (err) {
      console.error("Gagal mengirim pesan", err);
    }
  };

  return (
    /**
     * Penjelasan Layout:
     * - fixed inset-0: Memaksa container memenuhi layar dan tidak bisa gerak.
     * - pb-[56px]: Memberi ruang tepat seukuran BottomNav agar input chat naik ke atasnya.
     */
    <div className="fixed inset-0 flex flex-col bg-[#0f172a] text-white pb-[56px] overflow-hidden">
      
      {/* HEADER: Tetap di atas (Sticky) */}
      <header className="flex-none flex items-center gap-3 bg-purple-700 p-4 shadow-lg z-30">
        <button onClick={() => navigate(-1)} className="hover:bg-purple-800 p-1 rounded-full">
          <FiChevronLeft size={24} />
        </button>
        <div>
          <h1 className="font-bold text-base leading-none">Live Chat</h1>
          <p className="text-[10px] text-purple-200 mt-1 uppercase tracking-wider">ID: {bookingId}</p>
        </div>
      </header>

      {/* CHAT AREA: Hanya bagian ini yang bisa discroll */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 scroll-smooth">
        {messages.map((m, index) => {
          const isMe = !m.profiles?.name; 
          return (
            <div key={m.id || index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] px-4 py-2 rounded-2xl shadow-md ${
                isMe ? "bg-purple-600 rounded-tr-none" : "bg-slate-800 rounded-tl-none border border-slate-700"
              }`}>
                {!isMe && <p className="text-[10px] font-bold text-purple-400 mb-1">{m.profiles?.name}</p>}
                <p className="text-sm break-words">{m.message}</p>
                <div className="flex justify-end mt-1">
                  <span className="text-[9px] opacity-60">
                    {new Date(m.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </main>

      {/* FOOTER: Menempel di atas BottomNav */}
      <footer className="flex-none p-3 bg-slate-800 border-t border-slate-700">
        <form onSubmit={sendMessage} className="flex items-center gap-2 max-w-4xl mx-auto">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ketik pesan..."
            className="flex-1 bg-slate-700 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-purple-500 outline-none text-white"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="bg-purple-600 p-3 rounded-xl disabled:opacity-50 active:scale-95 transition-transform"
          >
            <FiSend size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
}