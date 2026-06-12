import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { DataProvider } from "@/context/DataContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import ProjectDetail from "@/pages/ProjectDetail";
import Assets from "@/pages/Assets";
import AssetDetail from "@/pages/AssetDetail";
import Onboarding from "@/pages/Onboarding";
import Leadership from "@/pages/Leadership";
import Submit from "@/pages/Submit";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/assets/:id" element={<AssetDetail />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/leadership" element={<Leadership />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/submit/:id" element={<Submit />} />
            </Routes>
          </Layout>
          <Toaster position="top-right" richColors closeButton />
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
