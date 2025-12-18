import { Routes, Route } from "react-router-dom";

// ================= PUBLIC =================
import Home from "../pages/Home";
import InfluencerList from "../pages/InfluencerList";
import InfluencerDetail from "../pages/InfluencerDetail";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Recommended from "../pages/Recommended";
import About from "../pages/About";

// ================= USER =================
import UserProfile from "../pages/UserProfile";
import Review from "../pages/Review";

// ================= INFLUENCER =================
import InfluencerProfile from "../pages/influencer/InfluencerProfile";

// ================= CHAT =================
import ChatRoom from "../pages/chat/ChatRoom";

// ================= ADMIN =================
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateInfluencer from "../pages/admin/CreateInfluencer";
import AdminTransactions from "../pages/admin/AdminTransactions";

// ================= GUARD =================
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/influencer" element={<InfluencerList />} />
      <Route path="/influencer/:id" element={<InfluencerDetail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/recommended" element={<Recommended />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= USER ================= */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute role="user">
            <UserProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/review/:bookingId"
        element={
          <ProtectedRoute role="user">
            <Review />
          </ProtectedRoute>
        }
      />

      {/* ================= INFLUENCER ================= */}
      <Route
        path="/influencer/profile"
        element={
          <ProtectedRoute role="influencer">
            <InfluencerProfile />
          </ProtectedRoute>
        }
      />

      {/* ================= CHAT ================= */}
      <Route
        path="/chat/:bookingId"
        element={
          <ProtectedRoute>
            <ChatRoom />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/influencer"
        element={
          <ProtectedRoute role="admin">
            <CreateInfluencer />
          </ProtectedRoute>
        }
      />

      {/* ✅ INI YANG TADI HILANG */}
      <Route
        path="/admin/transactions"
        element={
          <ProtectedRoute role="admin">
            <AdminTransactions />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
