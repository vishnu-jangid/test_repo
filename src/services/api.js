import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `token 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`,
  },
});

export const API = {
  gamesFetch: async (params) => {
    return instance
      .get(`https://api.github.com/search/repositories?${params}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};
