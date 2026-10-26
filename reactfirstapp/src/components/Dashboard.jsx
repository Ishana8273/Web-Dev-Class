import { useAuth } from "../context/useAuth.js";
import LiveClock from "./LiveClock.jsx";
import "./Dashboard.css";

function Dashboard() {
  const { user, navigate } = useAuth();

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="dashboard-kicker">YOUR WORKSPACE</p>
          <h1>Welcome, {user.name}.</h1>
          <p className="dashboard-intro">
            Your ideas have a place to land. Start with a topic and let the
            page shape a useful answer around it.
          </p>
          <button className="primary-action" type="button" onClick={() => navigate("live-text")}>
            Open live text <span aria-hidden="true">-&gt;</span>
          </button>
        </div>
        <LiveClock />
      </section>

      <section className="dashboard-grid" aria-label="Workspace information">
        <article className="dashboard-card featured-card">
          <span className="card-index">01</span>
          <h2>Live topic briefings</h2>
          <p>
            Write Python, React, JavaScript, or HTML and see a focused summary
            appear as you type.
          </p>
          <button type="button" onClick={() => navigate("live-text")}>
            Explore topics <span aria-hidden="true">-&gt;</span>
          </button>
        </article>
        <article className="dashboard-card">
          <span className="card-index">02</span>
          <h2>Your account</h2>
          <p>Signed in as</p>
          <strong>{user.email}</strong>
        </article>
        <article className="dashboard-card">
          <span className="card-index">03</span>
          <h2>Built for curiosity</h2>
          <p>Learn by writing, testing an idea, and watching the interface respond.</p>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;