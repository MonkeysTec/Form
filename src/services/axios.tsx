import axios from "axios";

const baseURL = "http://localhost:4002/";

const fetchAxios = axios.create({ baseURL: baseURL });

export default fetchAxios;
