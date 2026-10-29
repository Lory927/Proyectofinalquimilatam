export default function MoleculeIllustration() {
  const center = { x: 160, y: 130 };
  const radius = 84;
  const atoms = Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    return {
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    };
  });

  return (
    <svg viewBox="0 0 320 260" className="h-auto w-full max-w-xs" aria-hidden="true" focusable="false">
      <g className="origin-center animate-spin-slow">
        {atoms.map((atom, index) => {
          const next = atoms[(index + 1) % atoms.length];
          return (
            <line
              key={`bond-${index}`}
              x1={atom.x}
              y1={atom.y}
              x2={next.x}
              y2={next.y}
              stroke="#FFFFFF"
              strokeOpacity="0.45"
              strokeWidth="6"
              strokeLinecap="round"
            />
          );
        })}
        {atoms.map((atom, index) => (
          <circle
            key={`atom-${index}`}
            cx={atom.x}
            cy={atom.y}
            r="22"
            fill={index % 2 === 0 ? '#FF80F0' : '#B266FF'}
          />
        ))}
      </g>
      <circle cx={center.x} cy={center.y} r="34" fill="#FFFFFF" />
      <text
        x={center.x}
        y={center.y + 12}
        textAnchor="middle"
        fontSize="38"
        fontWeight="700"
        fill="#1E1763"
        fontFamily="Baloo 2, Nunito, sans-serif"
      >
        C
      </text>
    </svg>
  );
}
