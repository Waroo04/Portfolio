export default function Marquee() {
  const items = [
    "Application Security", "Android CTF Design", "Phishing Detection",
    "Reverse Engineering", "Smart Contract Security", "ML Threat Analysis",
    "IoT Hardening", "Web3 Security"
  ];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {items.map((item, i) => (
          <div className="marquee-item" key={i}><span>✦</span>{item}</div>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, i) => (
          <div className="marquee-item" key={`dup-${i}`}><span>✦</span>{item}</div>
        ))}
      </div>
    </div>
  );
}
