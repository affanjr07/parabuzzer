import { useEffect, useState } from "react";
import { api } from "../services/api";
import InfluencerCard from "../components/InfluencerCard";

export default function Recommended() {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommended();
  }, []);

  const fetchRecommended = async () => {
    try {
      const res = await api.get("/influencers");

      // contoh logic recommended:
      // bisa diganti (followers terbanyak / rating / harga termurah)
      const sorted = [...res.data].sort(
        (a, b) => (a.price || 0) - (b.price || 0)
      );

      setInfluencers(sorted.slice(0, 12));
    } catch (err) {
      console.error("Fetch recommended error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-24">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Recommended Influencer
        </h1>

        {loading && (
          <p className="text-gray-500 text-sm">Loading...</p>
        )}

        {!loading && influencers.length === 0 && (
          <p className="text-gray-500 text-sm">
            Belum ada influencer
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {influencers.map((inf) => (
            <InfluencerCard key={inf.id} data={inf} />
          ))}
        </div>
      </div>
    </div>
  );
}
