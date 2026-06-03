import { useEffect, useState } from "react";

export function App() {
  const [api, setApi] = useState("loading…");

  useEffect(() => {
    fetch("/api/hello")
      .then((r) => r.json())
      .then((d) => setApi(d.message))
      .catch((e) => setApi(`backend error: ${e.message}`));
  }, []);

  return (
    <main style={{ fontFamily: "system-ui", padding: 40, textAlign: "center" }}>
      <h1 style={{ marginBottom: 8 }}>hello from fromscratch</h1>
      <p style={{ color: "#666" }}>
        edit <code>frontend/src/App.jsx</code> or ask the agent to change something.
      </p>
      <p style={{ marginTop: 32, padding: 16, background: "#f5f5f7", borderRadius: 8 }}>
        backend says: <strong>{api}</strong>
      </p>
    </main>
  );
}
