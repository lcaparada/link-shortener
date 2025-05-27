import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

const httpClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
