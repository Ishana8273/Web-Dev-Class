import { useEffect, useState } from "react";
import LiveClock from "./LiveClock.jsx";
import "./LiveTextPage.css";

const topics = [
  {
    name: "Python",
    keywords: ["python"],
    description: "A beginner-friendly programming language used for automation, data science, web apps, and artificial intelligence.",
    uses: "Automation, data analysis, machine learning, backend development",
    fact: "Python uses readable indentation to organize blocks of code.",
  },
  {
    name: "React",
    keywords: ["react", "jsx"],
    description: "A JavaScript library for building interactive user interfaces from reusable components.",
    uses: "Web applications, dashboards, forms, and component-based interfaces",
    fact: "React updates the interface when component state changes.",
  },
  {
    name: "JavaScript",
    keywords: ["javascript", "js"],
    description: "A programming language that adds behavior and interactivity to websites and web applications.",
    uses: "Browser interactions, APIs, servers, games, and mobile applications",
    fact: "JavaScript can run in browsers and on servers using environments such as Node.js.",
  },
  {
    name: "HTML",
    keywords: ["html"],
    description: "The markup language used to give web pages their structure and meaning.",
    uses: "Headings, paragraphs, forms, links, images, and page structure",
    fact: "Semantic HTML helps browsers, search engines, and assistive technologies understand a page.",
  },
];

function LiveTextPage() {
  const [text, setText] = useState("");
  const trimmedText = text.trim();
  const words = trimmedText ? trimmedText.split(/\s+/) : [];
  const normalizedText = trimmedText.toLowerCase();
  const relatedTopic = topics.find((topic) =>
    topic.keywords.some((keyword) => normalizedText.includes(keyword)),
  );
  const suggestedTopics = ["Python", "React", "JavaScript", "HTML"];

  useEffect(() => {
    document.title = trimmedText
      ? `${trimmedText.slice(0, 24)} - Live Text`
      : "Live Text Editor";
  }, [trimmedText]);

  return (
    <main className="live-text-page">
      <section className="live-text-shell">
        <LiveClock />

        <div className="live-text-intro">
          <div className="live-text-status">
            <span className="status-dot" />
            <span>{relatedTopic ? "Topic found" : "Listening live"}</span>
          </div>
          <h1>{trimmedText || "Your words, in real time."}</h1>
          <p className="intro-copy">
            Type a topic and your personal mini-briefing will appear as you
            write.
          </p>
        </div>

        <label className="text-box-label" htmlFor="live-text-input">
          Write something
        </label>
        <textarea
          id="live-text-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Start typing here..."
          rows="7"
        />

        <div className="topic-suggestions" aria-label="Topic suggestions">
          <span>Try:</span>
          {suggestedTopics.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => setText(topic)}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="live-text-footer">
          <span>{words.length} words</span>
          <span>{text.length} characters</span>
        </div>

        <section className="related-topic" aria-live="polite">
          {relatedTopic ? (
            <>
              <div className="topic-heading">
                <div>
                  <p className="topic-kicker">LIVE TOPIC BRIEF</p>
                  <h2>{relatedTopic.name}</h2>
                </div>
                <span className="topic-badge">MATCHED</span>
              </div>
              <p className="topic-description">{relatedTopic.description}</p>
              <dl className="topic-details">
                <div>
                  <dt>Common uses</dt>
                  <dd>{relatedTopic.uses}</dd>
                </div>
                <div>
                  <dt>Quick fact</dt>
                  <dd>{relatedTopic.fact}</dd>
                </div>
              </dl>
            </>
          ) : (
            <>
              <p className="topic-kicker">LIVE TOPIC BRIEF</p>
              <h2>{trimmedText ? "Keep exploring" : "Try a topic"}</h2>
              <p>
                {trimmedText
                  ? "Try Python, React, JavaScript, HTML, or JSX to see related information."
                  : "Type a technology or programming topic to see related information here."}
              </p>
            </>
          )}
        </section>
      </section>
    </main>
  );
}

export default LiveTextPage;