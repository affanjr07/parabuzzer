import supabase from "../lib/supabase.js";

export const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { booking_id, rating, comment } = req.body;

    // ambil booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("id, influencer_id, user_id, status")
      .eq("id", booking_id)
      .single();

    if (bookingError || !booking) {
      return res.status(404).json({ error: "Booking tidak ditemukan" });
    }

    if (booking.user_id !== userId) {
      return res.status(403).json({ error: "Bukan booking kamu" });
    }

    if (booking.status !== "done") {
      return res.status(400).json({ error: "Booking belum selesai" });
    }

    // cegah double review
    const { data: existing } = await supabase
      .from("reviews")
      .select("id")
      .eq("booking_id", booking_id)
      .single();

    if (existing) {
      return res.status(400).json({ error: "Review sudah ada" });
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        booking_id,
        influencer_id: booking.influencer_id,
        user_id: userId,
        rating,
        comment,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error("createReview error:", err);
    res.status(500).json({ error: err.message });
  }
};

// get review influencer
export const getReviewsByInfluencer = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("reviews")
    .select(`
      id,
      rating,
      comment,
      created_at,
      profiles:user_id (
        name
      )
    `)
    .eq("influencer_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};
