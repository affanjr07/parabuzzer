import { useState } from "react";
import { api } from "../../services/api";

export default function CreateInfluencer() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    platform: "",
    followers: "",
    price: "",
    bio: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/influencer", {
        email: form.email,
        username: form.username,
        platform: form.platform,
        followers: Number(form.followers),
        price: Number(form.price),
        bio: form.bio,
      });

      alert("Influencer berhasil dibuat");
      setForm({
        email: "",
        username: "",
        platform: "",
        followers: "",
        price: "",
        bio: "",
      });
    } catch (err) {
      alert(
        err.response?.data?.error ||
          "Gagal membuat influencer"
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-lg">
      <h1 className="text-xl font-bold mb-4">
        Tambah Influencer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <input
          name="email"
          placeholder="Email Influencer"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          value={form.email}
          required
        />

        <input
          name="username"
          placeholder="Username"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          value={form.username}
          required
        />

        <input
          name="platform"
          placeholder="Platform (Instagram, Tiktok)"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          value={form.platform}
        />

        <input
          name="followers"
          type="number"
          placeholder="Followers"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          value={form.followers}
        />

        <input
          name="price"
          type="number"
          placeholder="Harga / Post"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          value={form.price}
        />

        <textarea
          name="bio"
          placeholder="Bio influencer"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          value={form.bio}
        />

        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg w-full">
          Simpan Influencer
        </button>
      </form>
    </div>
  );
}
