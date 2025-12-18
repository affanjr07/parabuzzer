import supabase from "../lib/supabase.js";

/**
 * REGISTER
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validasi input
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email, dan password wajib diisi",
      });
    }

    // 2. Register ke Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // 3. Update table profiles (karena sudah ada trigger insert)
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ name })
      .eq("id", data.user.id);

    if (profileError) {
      return res.status(400).json({
        error: "Gagal menyimpan profile",
      });
    }

    res.status(201).json({
      message: "Registrasi berhasil",
      user: data.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validasi input
    if (!email || !password) {
      return res.status(400).json({
        error: "Email dan password wajib diisi",
      });
    }

    // 2. Login ke Supabase Auth
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // 3. Ambil profile user
    const { data: profile, error: profileError } =
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

    if (profileError) {
      return res.status(400).json({
        error: "Profile tidak ditemukan",
      });
    }

    res.json({
      user: data.user,
      profile,
      access_token: data.session.access_token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
