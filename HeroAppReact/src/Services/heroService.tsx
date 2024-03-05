import axios from "axios";

const BaseUrl = "http://localhost:8000/api";

const ApiUrls = {
  addCharacter: `${BaseUrl}/addCharacter`,
  addCharacterImage: `${BaseUrl}/addCharacter/image`,
  getAllCards: `${BaseUrl}/getAllCards`,
  getOneCard: (id: string) => `${BaseUrl}/getOneCard/${id}`,
  updateCard: (id: string) => `${BaseUrl}/updateCard/${id}`,
  deleteCard: (id: string) => `${BaseUrl}/deleteCard/${id}`,
};

const addNewHero = () => {
  return axios.post(ApiUrls.addCharacter);
};

const addHeroImage = () => {
  return axios.post(ApiUrls.addCharacterImage);
};

const getAllHeroCards = () => {
  return axios.get(ApiUrls.getAllCards);
};

const getHeroCardById = (id: string) => {
  return axios.get(ApiUrls.getOneCard(id));
};

const updateHeroCard = (id: string) => {
  return axios.put(ApiUrls.updateCard(id));
};

const deleteHeroCard = (id: string) => {
  return axios.delete(ApiUrls.deleteCard(id));
};

const HeroService = {
  addNewHero,
  addHeroImage,
  getAllHeroCards,
  getHeroCardById,
  updateHeroCard,
  deleteHeroCard,
};

export default HeroService;
