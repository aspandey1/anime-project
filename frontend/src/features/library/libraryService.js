import axios from "axios";

const API_URL = "/api/users/";

const get = async (values) => {
  const response = await axios.get(API_URL + "getLibrary", {
    params: { email: values.email },
  });

  if (response.data) {
    var arr = [];
    response.data.library.forEach((element) => {
      arr.push(element.animeId);
    });
    localStorage.setItem("library", JSON.stringify(arr));
    localStorage.setItem("rating", JSON.stringify(response.data.library));
  }
  return arr;
};

const add = async (values) => {
  const response = await axios.post(API_URL + "addAnime", values);
  return response.data;
};

const libraryService = {
  add,
  get,
};

export default libraryService;
