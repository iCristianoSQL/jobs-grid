import { url } from "@/utils/url";
import axios from "axios";

export const api = axios.create({
    baseURL: `${url}`,
    headers: {
        Accept: "application/json",
    },
});