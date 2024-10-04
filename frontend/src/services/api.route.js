import axios from "axios";
const URL = "http://137.184.195.214:8000";

export const api = axios.create({
  baseURL: URL,
});

export const Url = URL;
