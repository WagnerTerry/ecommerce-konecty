import axios from "axios";

const baseURL = "https://backendts-wagnerterry.vercel.app/products";

export default class api {
  static getProduct = async () => {
    const { data } = await axios.get(baseURL);
    return data;
  };
}
