import { useState } from "react";
import { useAuth } from "../context/useAuth.js";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login(name.trim(), email.trim());
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-mark">LT</div>
        <p className="login-kicker">LIVE TEXT STUDIO</p>
        <h1>Make the web feel personal.</h1>
        <p className="login-copy">
          Sign in to explore your dashboard and turn any topic into a live,
          useful briefing.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="user-name">Your name</label>
          <input
            id="user-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Aisha Khan"
            autoComplete="name"
            required
          />

          <label htmlFor="user-email">Email address</label>
          <input
            id="user-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <button type="submit">
            Enter your workspace <span aria-hidden="true">-&gt;</span>
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;