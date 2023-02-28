import API from "./API";
import { imageFromPath } from "../helpers";

export class User {
    private constructor() {
    }

    public static async login(username: string, password: string) {
        const response = await API.Axios.get<{
            token: string,
            id: string,
        }>('/tokens/user', {
            params: { username, password }
        });
        const result = response.data;
        API.login(result.token, result.id, 'user');
        return result;
    }

    public static async signup(username: string, email: string, password: string, image: string | undefined) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        if (image)
            formData.append('image', await imageFromPath(image));
        const response = await API.Axios.post<{
            token: string,
            id: string
        }>('/user', formData);
        const result = response.data;
        API.login(result.token, result.id, 'user');
        return result;
    }

    public static async updateProfile(email: string | null, password: string | null, imagePath: string | null) {
        const formData = new FormData();
        if (email) formData.append('email', email);
        if (password) formData.append('password', password);
        if (imagePath) formData.append('image', await imageFromPath(imagePath));
        await API.Axios.patch<{
            msg: string
        }>(`/user/${sessionStorage.getItem('id')}`, formData);
    }

    public static async getUsername() {
        const response = await API.Axios.get<{
            username: string
        }>(`/user/${sessionStorage.getItem('id')}/username`);
        return response.data.username;
    }

    public static async getEmail() {
        const response = await API.Axios.get<{
            email: string
        }>(`/user/${sessionStorage.getItem('id')}/email`);
        return response.data.email;
    }

    public static async getImage() {
        const response = await API.Axios.get<{
            image: string | null
        }>(`/user/${sessionStorage.getItem('id')}/image`);
        return response.data.image; 
    }

    public static async getGames() {
        const response = await API.Axios.get<{
            games: number[]
        }>(`/user/${sessionStorage.getItem('id')}/games`);
        return response.data.games; 
    }

    public static async buyGame(game_name: string) {
        await API.Axios.put(
            `/user/${sessionStorage.getItem('id')}/games`,
            null,
            {
                params: {
                    game_name
                }
            }
        )
    }
}