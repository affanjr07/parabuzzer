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

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // hapus error saat user mengetik
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    // VALIDASI FRONTEND
    const newErrors = {};
    if (!form.email) newErrors.email = "Email wajib diisi";
    if (!form.username) newErrors.username = "Username wajib diisi";
    if (form.followers && form.followers < 0)
      newErrors.followers = "Followers tidak valid";
    if (form.price && form.price < 0)
      newErrors.price = "Harga tidak valid";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await api.post("/admin/influencer", {
        email: form.email,
        username: form.username,
        platform: form.platform,
        followers: Number(form.followers),
        price: Number(form.price),
        bio: form.bio,
      });

      setSuccess("Influencer berhasil ditambahkan");
      setForm({
        email: "",
        username: "",
        platform: "",
        followers: "",
        price: "",
        bio: "",
      });
    } catch (err) {
      setErrors({
        form:
          err.response?.data?.error ||
          "Gagal membuat influencer",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
        
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl text-slate-800">
            Tambah Influencer
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Lengkapi data influencer
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="mb-4 text-sm text-green-600 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
            {success}
          </div>
        )}

        {/* FORM ERROR */}
        {errors.form && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* EMAIL */}
          <div>
            <label className="text-xs font-medium text-slate-500">
              Email Influencer
            </label>
            <input
              name="email"
              className={`w-full mt-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2
                ${errors.email ? "border-red-400 focus:ring-red-300" : "border-slate-200 focus:ring-purple-500"}
              `}
              onChange={handleChange}
              value={form.email}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* USERNAME */}
          <div>
            <label className="text-xs font-medium text-slate-500">
              Username
            </label>
            <input
              name="username"
              className={`w-full mt-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2
                ${errors.username ? "border-red-400 focus:ring-red-300" : "border-slate-200 focus:ring-purple-500"}
              `}
              onChange={handleChange}
              value={form.username}
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* PLATFORM */}
          <div>
            <label className="text-xs font-medium text-slate-500">
              Platform
            </label>
            <input
              name="platform"
              className="w-full mt-1 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
              value={form.platform}
            />
          </div>

          {/* FOLLOWERS & PRICE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="text-xs font-medium text-slate-500">
                Followers
              </label>
              <input
                name="followers"
                type="number"
                className={`w-full mt-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2
                  ${errors.followers ? "border-red-400 focus:ring-red-300" : "border-slate-200 focus:ring-purple-500"}
                `}
                onChange={handleChange}
                value={form.followers}
              />
              {errors.followers && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.followers}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500">
                Harga / Post
              </label>
              <input
                name="price"
                type="number"
                className={`w-full mt-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2
                  ${errors.price ? "border-red-400 focus:ring-red-300" : "border-slate-200 focus:ring-purple-500"}
                `}
                onChange={handleChange}
                value={form.price}
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.price}
                </p>
              )}
            </div>

          </div>

          {/* BIO */}
          <div>
            <label className="text-xs font-medium text-slate-500">
              Bio Influencer
            </label>
            <textarea
              name="bio"
              rows={4}
              className="w-full mt-1 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              onChange={handleChange}
              value={form.bio}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-2xl font-semibold transition"
          >
            Simpan Influencer
          </button>

        </form>
      </div>
    </div>
  );
}
