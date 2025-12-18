import { useState } from "react";
import { api } from "../services/api";
import InfluencerCard from "../components/InfluencerCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await api.get("/influencers");
    const filtered = res.data.filter((i) =>
      i.username.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pb-24">
      <h1 className="text-xl font-bold mb-4">
        Cari Influencer
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari influencer..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-purple-600 text-white px-4 rounded-lg"
        >
          Cari
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((i) => (
          <InfluencerCard key={i.id} data={i} />
        ))}
      </div>
    </div>
  );
}
