const ITEMS = [
  "Full Stack Development", "React.js", "Node.js", "Java",
  "Data Structures", "Algorithms", "DBMS", "MySQL",
  "C Programming", "rm2004", "Open to Work",
];

function Row() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center shrink-0" style={{ gap: "2.5rem" }}>
          <span
            className="font-mono uppercase text-[--muted-dim] whitespace-nowrap"
            style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
          >
            {item}
          </span>
          <span style={{ color: "var(--gold)", fontSize: "0.65rem", opacity: 0.5 }} aria-hidden>✦</span>
        </span>
      ))}
    </>
  );
}

export default function Ticker() {
  return (
    <div
      className="ticker-wrap"
      aria-label="Technology skills"
      role="marquee"
    >
      <div
        className="ticker-track"
        style={{ paddingInline: "2.5rem", gap: "2.5rem" }}
        aria-hidden
      >
        <Row />
        <Row />
      </div>
    </div>
  );
}