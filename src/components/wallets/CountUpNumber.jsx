import { useEffect, useRef, useState } from "react";

/**
 * Animates from the previous value to `value` whenever it changes.
 * Used for wallet balances so switching wallets or adding/withdrawing
 * money feels alive instead of the number just snapping.
 */
const CountUpNumber = ({ value, formatter = (n) => n.toFixed(2), duration = 500 }) => {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const frameRef = useRef();

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) * (1 - progress); // ease-out
      setDisplay(from + (to - from) * eased);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{formatter(display)}</>;
};

export default CountUpNumber;
