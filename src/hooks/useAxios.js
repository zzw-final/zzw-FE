import { useEffect, useState } from "react";
import { instance } from "../api/request";

const useAxios = (initialValue) => {
  const [data, setData] = useState(initialValue);
  // const [url, setUrl] = useState();

  async function fetcher(type, url, sendData) {
    // setUrl(url);
    try {
      switch (type) {
        case "get":
          setData(await (await instance.get(url)).data.data);
          break;
        case "post":
          setData(await (await instance.post(url, sendData)).data.data);
          break;
        case "delete":
          setData(await (await instance.delete(url)).data.data);
          break;
        case "put":
          setData(await (await instance.put(url.sendData)).data.data);
          break;
        default:
          break;
      }
    } catch (error) {
      return console.log(error);
    }
  }

  // useEffect(() => {
  //   fetcher();
  // }, [url]);

  console.log("data ?>>>> fetch", data);

  return [data, fetcher];
};

export default useAxios;
