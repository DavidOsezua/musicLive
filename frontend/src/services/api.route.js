import axios from "axios";
const URL = "http://localhost:8000";

export const api = axios.create({
  baseURL: URL,
});

export const Url = URL;
