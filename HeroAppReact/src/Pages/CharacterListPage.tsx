import CharacterList from "../Components/CharacterListComponent";
import { motion as m } from "framer-motion";
const CharacterListPage = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CharacterList />
    </m.div>
  );
};

export default CharacterListPage;
