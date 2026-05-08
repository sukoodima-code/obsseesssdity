import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import GenresPage from "./pages/GenresPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage";
import AssistantPage from "./pages/AssistantPage";
import NotFoundPage from "./pages/NotFoundPage";
import { MoodProvider } from "./theme/MoodContext";
import ReelsPage from "./pages/ReelsPage";

export default function App() {
  return (
    <MoodProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/playlists/:playlistId" element={<PlaylistDetailPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </MoodProvider>
  );
}

