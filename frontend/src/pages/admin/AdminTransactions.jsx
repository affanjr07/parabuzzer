import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/admin/bookings");
      setTransactions(res.data || []);
    } catch (err) {
      console.error("Fetch transactions error:", err);
    }
  };

  const formatPrice = (value) =>
    value ? Number(value).toLocaleString("id-ID") : "0";

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-6">
        Transaksi Booking
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Campaign</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Influencer</th>
              <th className="p-3 text-left">Harga</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-3 font-medium">
                  {t.campaign_name}
                </td>

                {/* USER */}
                <td className="p-3">
                  {t.profiles?.name || t.profiles?.username || "-"}
                </td>

                {/* INFLUENCER */}
                <td className="p-3">
                  {t.influencers?.username || "-"}
                </td>

                {/* HARGA */}
                <td className="p-3">
                  Rp {formatPrice(t.price)}
                </td>

                {/* STATUS */}
                <td className="p-3 capitalize">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold
                      ${t.status === "approved" && "bg-green-100 text-green-600"}
                      ${t.status === "pending" && "bg-orange-100 text-orange-600"}
                      ${t.status === "rejected" && "bg-red-100 text-red-600"}
                      ${t.status === "completed" && "bg-blue-100 text-blue-600"}
                    `}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}

            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400">
                  Belum ada transaksi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
