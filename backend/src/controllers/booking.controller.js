import supabase from "../lib/supabase.js";

/* ======================
   USER CREATE BOOKING
====================== */
export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      influencer_id,
      campaign_name,
      note,
    } = req.body;

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        user_id: userId,           // 🔑 profiles.id
        influencer_id,             // 🔑 influencers.id
        campaign_name,
        
        note,
        status: "pending",         // menunggu influencer
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error("createBooking error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ======================
   USER VIEW OWN BOOKINGS
====================== */
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ ambil booking user
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // 2️⃣ ambil influencer data
    const influencerIds = bookings.map(b => b.influencer_id);

    const { data: influencers } = await supabase
      .from("influencers")
      .select("id, username, avatar_url, price")
      .in("id", influencerIds);

    // 3️⃣ merge data
    const result = bookings.map(b => ({
      ...b,
      influencer: influencers.find(i => i.id === b.influencer_id),
    }));

    res.json(result);
  } catch (err) {
    console.error("getMyBookings error:", err);
    res.status(500).json({ error: err.message });
  }
};


