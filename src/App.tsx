import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const VisualizationPage = lazy(() => import("./app/visualizations/page"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
          <Routes>
            {/* Main Portfolio Route */}
            <Route path="/" element={
              <MainContainer>
                <Suspense fallback={null}>
                  <CharacterModel />
                </Suspense>
              </MainContainer>
            } />

            {/* New Visualization Route */}
            <Route path="/visualizations" element={<VisualizationPage />} />
          </Routes>
        </Suspense>
      </LoadingProvider>
    </BrowserRouter>
  );
};

export default App;
