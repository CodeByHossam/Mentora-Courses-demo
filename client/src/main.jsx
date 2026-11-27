import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import { store } from "./store/store";
import { demoFetch } from "./store/api/demoRouter";
import App from "./App";
import "./index.css";

const DEMO_URL_PATTERNS = [
  /\/api\//i,
  /localhost:5000/i,
  /mentora-courses-api\.onrender\.com/i,
  /^#demo-/i,
  /^mailto:/i,
  /source\.zoom\.us/i,
];

const isDemoUrl = (url) =>
  DEMO_URL_PATTERNS.some((pattern) => pattern.test(String(url || "")));

// Components that bypass RTK Query still reach the same localStorage router.
const originalFetch = window.fetch.bind(window);
window.fetch = (input, options) => {
  const url = typeof input === "string" ? input : input?.url || "";
  if (!isDemoUrl(url)) return originalFetch(input, options);
  return demoFetch(input, options);
};

// Downloads and meeting links are simulated; never leave the static demo.
window.open = (url) => {
  if (isDemoUrl(url)) {
    toast.info("Demo link opened locally — no external request was made.");
  }
  return null;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
