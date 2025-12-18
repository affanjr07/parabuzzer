import supabase from "../lib/supabase.js";

export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = data.user;
  next();
};

export const requireRole = (role) => {
  return async (req, res, next) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", req.user.id)
      .single();

    if (profile.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
};
