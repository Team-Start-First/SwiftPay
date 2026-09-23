/**
 * Tiny trend line for a numeric series. Pure SVG, no chart library —
 * keeps this dependency-free since the rest of the app doesn't use one.
 */
const Sparkline = ({ data = [], width = 100, height = 32, stroke = "currentColor" }) => {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const trendingUp = data[data.length - 1] >= data[0];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={trendingUp ? 1 : 0.7}
      />
    </svg>
  );
};

export default Sparkline;
