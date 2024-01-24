import axios from "axios";

const ApiUrl = "http://localhost:8000/api/add";
const ApiUrl2 = "http://localhost:8000/api/getAll";

const addNewHero = () => {
  return axios.post(`${ApiUrl}`);
};

const getAll = () => {
  return axios.get(`${ApiUrl2}`);
};
const out = {
  PostHero: addNewHero,
  GetHeroes: getAll,
};
export default out;
