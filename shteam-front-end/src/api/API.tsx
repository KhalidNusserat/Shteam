import axios from "axios";
import CONSTANTS from "../constants";
import { User } from "./User";
import { Dev } from "./Dev";
import { Game } from "./Game";

export default class API {
    private constructor() {
    }

    private static axios = axios.create({
        baseURL: CONSTANTS.SERVER.URL
    });

    public static get Axios() {
        return API.axios;
    }

    public static login(token: string, id: string, userType: 'user' | 'dev') {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('userType', userType);
        API.axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }

    public static logout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('userType');
        delete API.axios.defaults.headers.common.Authorization;
    }

    public static User = User;

    public static Dev = Dev;

    public static Game = Game;
}