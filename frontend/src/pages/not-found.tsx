export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0906",
        gap: "1.5rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--app-font-mono, monospace)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.6)",
        }}
      >
        404
      </span>
      <h1
        style={{
          fontFamily: "var(--app-font-serif, serif)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 300,
          color: "#e8e0d0",
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        Page not found.
      </h1>
      <button
        onClick={() => (window.location.href = "/")}
        style={{
          background: "transparent",
          border: "1px solid rgba(201,169,110,0.4)",
          color: "#c9a96e",
          cursor: "pointer",
          fontFamily: "var(--app-font-mono, monospace)",
          fontSize: "0.68rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: "0.6rem 1.2rem",
        }}
      >
        Go Home
      </button>
    </div>
  );
}
