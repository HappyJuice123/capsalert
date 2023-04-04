import axios from "axios";
import { NHS_API_KEY } from "@env";

const baseUrl = "https://api.nhs.uk/medicines";

export const getMedication = (medicationName) =>
  axios({
    method: "get",
    headers: {
      "subscription-key": NHS_API_KEY,
    },
    url: `${baseUrl}/${medicationName}`,
  })
    .then((response) => {
      if (response.data === undefined) {
        return undefined;
      }
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
