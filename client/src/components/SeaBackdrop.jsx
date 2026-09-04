export default function SeaBackdrop() {
  return (
    <div className="sea-backdrop" aria-hidden="true">
      <span className="caustic c1" />
      <span className="caustic c2" />
      <span className="caustic c3" />
      <svg className="tide" viewBox="0 0 1440 180" preserveAspectRatio="none">
        <path
          fill="rgba(125, 211, 208, 0.28)"
          d="M0,96 C240,160 480,32 720,80 C960,128 1200,40 1440,96 L1440,180 L0,180 Z"
        />
        <path
          fill="rgba(14, 116, 144, 0.22)"
          d="M0,120 C200,60 460,170 720,120 C980,70 1220,150 1440,110 L1440,180 L0,180 Z"
        />
        <path
          fill="rgba(8, 47, 73, 0.18)"
          d="M0,140 C260,180 520,100 780,140 C1040,180 1260,120 1440,150 L1440,180 L0,180 Z"
        />
      </svg>
    </div>
  );
}
