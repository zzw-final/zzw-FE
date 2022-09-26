import { instance } from "../api/request";

const useAxios = async (type, url, sendData) => {
  try {
    switch (type) {
      case "get":
        return await instance.get(url);
      case "post":
        return await instance.post(url, sendData);
      case "delete":
        return await instance.delete(url);
      case "put":
        return await instance.put(url, sendData);
      default:
        break;
    }
  } catch (error) {
    return console.log(error);
  }
};

export default useAxios;
