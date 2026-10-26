import { AuthProvider } from "./context/AuthProvider.jsx";
import { useAuth } from "./context/useAuth.js";
import Dashboard from "./components/Dashboard.jsx";
import LoginPage from "./components/LoginPage.jsx";
import LiveTextPage from "./components/LiveTextPage.jsx";
import Navigation from "./components/Navigation.jsx";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { isLoggedIn, currentPage } = useAuth();

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="app-frame">
      <Navigation />
      {currentPage === "dashboard" ? <Dashboard /> : <LiveTextPage />}
    </div>
  );
}

export default App;