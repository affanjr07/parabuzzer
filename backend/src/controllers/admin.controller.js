import supabase from "../lib/supabase.js";

/* =========================
   GET ALL INFLUENCERS
========================= */
export const getInfluencers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("influencers")
      .select(`
        id,
        username,
        platform,
        followers,
        price,
        bio,
        created_at,
        profiles:user_id (
          id,
          name,
          avatar_url,
          role
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("getInfluencers error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   CREATE INFLUENCER
========================= */
export const createInfluencer = async (req, res) => {
  try {
    const {
      email,
      username,
      platform,
      followers,
      price,
      bio,
    } = req.body;

    if (!email || !username) {
      return res.status(400).json({
        error: "Email dan username wajib diisi",
      });
    }

    // ambil user dari auth
    const { data, error } =
      await supabase.auth.admin.listUsers();

    if (error) throw error;

    const user = data.users.find(
      (u) => u.email === email
    );

    if (!user) {
      return res.status(404).json({
        error: "User belum terdaftar",
      });
    }

    // update role
    await supabase
      .from("profiles")
      .update({ role: "influencer" })
      .eq("id", user.id);

    // insert influencer
    const { data: influencer, error: insertError } =
      await supabase
        .from("influencers")
        .insert([
          {
            user_id: user.id,
            username,
            platform,
            followers,
            price,
            bio,
          },
        ])
        .select()
        .single();

    if (insertError) throw insertError;

    res.status(201).json(influencer);
  } catch (err) {
    console.error("createInfluencer error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   DELETE INFLUENCER
========================= */
export const deleteInfluencer = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("influencers")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({ success: true });
  } catch (err) {
    console.error("deleteInfluencer error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   ADMIN BOOKINGS / TRANSAKSI
========================= */
export const getAdminBookings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase bookings error:", error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("Admin bookings error:", err);
    res.status(500).json({ error: "Server error" });
  }
};



