import supabase from "../lib/supabase.js";

// GET chat by booking
export const getChatByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const { data, error } = await supabase
      .from("chats")
      .select(`
        id,
        message,
        sender_id,
        created_at,
        profiles:sender_id (name)
      `)
      .eq("booking_id", bookingId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("getChatByBooking error:", err);
    res.status(500).json({ error: err.message });
  }
};

// SEND message
export const sendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { booking_id, message } = req.body;

    const { data, error } = await supabase
      .from("chats")
      .insert({
        booking_id,
        sender_id: userId,
        message,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error("sendMessage error:", err);
    res.status(500).json({ error: err.message });
  }
};
