import axios from "axios";

const basepath = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(basepath).then((response) => response.data);
};
const create = (newPerson) => {
  return axios.post(basepath, newPerson).then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${basepath}/${id}`).then((response) => response.data);
};
export default { getAll, create, remove };