import axios from "axios";

const API =
  axios.create({
    baseURL:
      "http://localhost:5000/api",
  });

export const registerUser =
  async (
    userData: {
      name: string;
      email: string;
      password: string;
    }
  ) => {
    const response =
      await API.post(
        "/auth/register",
        userData
      );

    return response.data;
  };

export const loginUser =
  async (
    userData: {
      email: string;
      password: string;
    }
  ) => {
    const response =
      await API.post(
        "/auth/login",
        userData
      );

    return response.data;
  };

export const createLead =
  async (
    leadData: {
      name: string;
      email: string;
      company: string;
      status?: string;
    }
  ) => {
    const response =
      await API.post(
        "/leads",
        leadData
      );

    return response.data;
  };

export const getLeads =
  async () => {
    const response =
      await API.get(
        "/leads"
      );

    return response.data;
  };