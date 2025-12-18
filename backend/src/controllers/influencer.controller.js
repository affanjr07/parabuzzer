import supabase from "../lib/supabase.js";

/* ======================
   PUBLIC
====================== */

// GET ALL INFLUENCERS
export const getAllInfluencers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("influencers")
      .select(`
        id,
        username,
        bio,
        price,
        platform,
        followers,
        avatar_url,
        created_at
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("getAllInfluencers error:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET INFLUENCER BY ID
export const getInfluencerById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("influencers")
      .select(`
        id,
        username,
        bio,
        price,
        platform,
        followers,
        avatar_url,
        created_at
      `)
      .eq("id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Influencer tidak ditemukan" });
    }

    res.json(data);
  } catch (err) {
    console.error("getInfluencerById error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ======================
   INFLUENCER (LOGIN)
====================== */

// GET MY INFLUENCER PROFILE
export const getMyInfluencerProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("influencers")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      return res.status(404).json({
        error: "Profil influencer belum dibuat",
      });
    }

    res.json(data);
  } catch (err) {
    console.error("getMyInfluencerProfile error:", err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE MY PROFILE
export const updateMyInfluencerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bio, price } = req.body;
    let avatar_url;

    // UPLOAD AVATAR
    if (req.file) {
      const ext = req.file.mimetype.split("/")[1];
      const fileName = `influencer-${userId}-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      avatar_url = data.publicUrl;
    }

    // 🔥 FIX NaN
    const updateData = {};
    if (bio !== undefined) updateData.bio = bio;
    if (price !== undefined) updateData.price = Number(price);
    if (avatar_url) updateData.avatar_url = avatar_url;

    const { data, error } = await supabase
      .from("influencers")
      .update(updateData)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("updateMyInfluencerProfile error:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET MY BOOKINGS (INFLUENCER)
export const getMyInfluencerBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    // ambil influencer id
    const { data: influencer, error: infError } = await supabase
      .from("influencers")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (infError || !influencer) {
      return res.status(404).json({
        error: "Influencer belum terdaftar",
      });
    }

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id,
        campaign_name,
        note,
        status,
        created_at,
        profiles:user_id (
          id,
          name,
          avatar_url
        )
      `)
      .eq("influencer_id", influencer.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("getMyInfluencerBookings error:", err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE BOOKING STATUS
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    // ambil influencer id
    const { data: influencer } = await supabase
      .from("influencers")
      .select("id")
      .eq("user_id", userId)
      .single();

    // update booking milik influencer sendiri
    const { data: booking, error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id)
      .eq("influencer_id", influencer.id)
      .select()
      .single();

    if (error) throw error;

    // AUTO CREATE CHAT (ANTI DUPLIKASI)
    if (status === "approved") {
      const { data: chat } = await supabase
        .from("chats")
        .select("id")
        .eq("booking_id", booking.id)
        .single();

      if (!chat) {
        await supabase.from("chats").insert({
          booking_id: booking.id,
          user_id: booking.user_id,
          influencer_id: booking.influencer_id,
        });
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error("updateBookingStatus error:", err);
    res.status(500).json({ error: err.message });
  }
};
