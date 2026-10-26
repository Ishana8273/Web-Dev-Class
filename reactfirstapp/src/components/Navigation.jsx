import { useAuth } from "../context/useAuth.js";
import "./Navigation.css";

function Navigation() {
  const { user, currentPage, navigate, logout } = useAuth();

  return (
    <header className="site-navigation">
      <button className="brand-button" type="button" onClick={() => navigate("dashboard")}>
        <span className="brand-symbol">LT</span>
        <span>Live Text</span>
      </button>

      <nav aria-label="Main navigation">
        <button
          className={currentPage === "dashboard" ? "nav-link active" : "nav-link"}
          type="button"
          onClick={() => navigate("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={currentPage === "live-text" ? "nav-link active" : "nav-link"}
          type="button"
          onClick={() => navigate("live-text")}
        >
          Live Text
        </button>
      </nav>

      <div className="nav-user">
        <span className="nav-user-name">{user.name}</span>
        <button className="logout-button" type="button" onClick={logout}>
          Log out
        </button>
      </div>
    </header>
  );
}

export default Navigation;