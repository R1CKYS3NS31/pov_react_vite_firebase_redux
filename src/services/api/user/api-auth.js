import { config } from "../../../config/config";
import { client } from "../client";

export const signUp = async (user) => {
  try {
    let response = await client.post(`${config.apiUrl}/api/auth/signup`, user);
    return await response;
  } catch (error) {
    throw error;
  }
};

export const signin = async (user) => {
  try {
    let response = await client.post(`${config.apiUrl}/api/auth/signin`, user);
    return await response;
  } catch (error) {
    throw error;
  }
};

export const signout = async () => {
  try {
      let response = await client.get(`${config.apiUrl}/api/auth/signout`)
      return await response
  } catch (error) {
      // console.error(error);
      alert(error);
  }
}