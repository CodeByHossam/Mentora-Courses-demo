/**
 * Mentora Main Application Component
 */
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/responsive-fixes.css";

import { ProgressLoader } from "./components/common/index.js";
import { ErrorBoundary } from "./components/common/index.js";
import { ScrollToTop } from "./components/common/index.js";
import DemoChrome from "./components/demo/DemoChrome";
import AppRoutes from "./AppRoutes";

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <ProgressLoader isVisible={true} message="Loading..." />
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <DemoChrome />
        <ErrorBoundary>
          <main>
            <Suspense fallback={<PageLoader />}>
              <AppRoutes />
            </Suspense>
          </main>
        </ErrorBoundary>
      </Router>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
