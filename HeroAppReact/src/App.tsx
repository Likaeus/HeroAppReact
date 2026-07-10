import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBarComponent";
import { useAuth } from "./Context/useAuth";
import AuthPage from "./Pages/AuthPage";
import CarouselPage from "./Pages/CarouselPage";
import CampaignCreationPage from "./Pages/CampaignCreationPage";
import CampaignsPage from "./Pages/CampaignsPage";
import CharacterCreationPage from "./Pages/CharacterCreationPage";
import CharacterListPage from "./Pages/CharacterListPage";
import GalleryPage from "./Pages/GalleryPage";
import MyCreationsPage from "./Pages/MyCreationsPage";

function App() {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="app-shell">
      <NavBar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<CarouselPage />} />
            <Route path="/characters" element={<CharacterListPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/campaigns/create" element={
              isLoading ? <div className="page-loader">Abriendo el atlas…</div> :
              isAuthenticated ? <CampaignCreationPage /> : <Navigate to="/auth" replace state={{ from: "/campaigns/create" }} />
            } />
            <Route path="/list" element={<Navigate to="/characters" replace />} />
            <Route path="/auth" element={isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />} />
            <Route path="/create" element={
              isLoading ? <div className="page-loader">Abriendo el archivo…</div> :
              isAuthenticated ? <CharacterCreationPage /> : <Navigate to="/auth" replace state={{ from: "/create" }} />
            } />
            <Route path="/my-creations" element={
              isLoading ? <div className="page-loader">Abriendo tu archivo…</div> :
              isAuthenticated ? <MyCreationsPage /> : <Navigate to="/auth" replace state={{ from: "/my-creations" }} />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      <footer className="site-footer">
        <span>Epic Enclave</span>
        <p>Un archivo abierto para personajes que aún no tienen historia.</p>
      </footer>
    </div>
  );
}

export default App;
