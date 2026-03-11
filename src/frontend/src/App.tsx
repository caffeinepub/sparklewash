import { AdminPage } from "./pages/AdminPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  const path = window.location.pathname;

  if (path === "/admin" || path === "/admin/") {
    return <AdminPage />;
  }

  return <HomePage />;
}
