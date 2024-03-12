import HeroComponent from "../Components/HeroComponent";
import { motion as m } from "framer-motion";
const CarouselPage = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroComponent />
    </m.div>
  );
};

export default CarouselPage;
