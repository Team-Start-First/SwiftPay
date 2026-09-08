import Navbar from "../components/layout/Nav";
import Hero from "../components/landing/Hero";
import CurrencyConverter from "../components/landing/Currency";
import Testimonials from "../components/landing/Testimonials";
 
/**
 * Route-level composition of the marketing/landing sections.
 * Import paths assume the reorganized structure:
 *   components/layout/Nav.jsx
 *   components/landing/Hero.jsx, Currency.jsx, Testimonials.jsx
 * Adjust paths if you keep a different folder layout.
 *
 * NOTE: if Hero.jsx already renders its own features/pricing sections
 * internally, you may not need to also mount CurrencyConverter here —
 * check whether it's already nested inside Hero to avoid rendering it twice.
 */
const Landing = () => {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <CurrencyConverter />
      <Testimonials />
    </div>
  );
};
 
export default Landing;
 