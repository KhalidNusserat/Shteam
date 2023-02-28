import { GameData, imageFromPath } from "../helpers";
import API from "./API";

export class Dev {
    private constructor() {
    }

    public static async login(devname: string, password: string) {
        const response = await API.Axios.get<{
            token: string,
            id: string
        }>('/tokens/dev', {
            params: { devname, password }
        });
        const result = response.data;
        API.login(result.token, result.id, 'dev');
        return result;
    }

    public static async signup(devname: string, email: string, password: string, image: string | undefined) {
        const formData = new FormData();
        formData.append('devname', devname);
        formData.append('email', email);
        formData.append('password', password);
        if (image)
            formData.append('image', await imageFromPath(image));
        const response = await API.Axios.post<{
            token: string,
            id: string
        }>('/dev', formData);
        const result = response.data;
        API.login(result.token, result.id, 'dev');
        return result;
    }

    public static async updateProfile(email: string | null, password: string | null, imagePath: string | null) {
        const formData = new FormData();
        if (email) formData.append('email', email);
        if (password) formData.append('password', password);
        if (imagePath) formData.append('image', await imageFromPath(imagePath));
        await API.Axios.patch<{
            msg: string
        }>(`/dev/${sessionStorage.getItem('id')}`, formData);
    }

    public static async getDevName() {
        const response = await API.Axios.get<{
            devname: string
        }>(`/dev/${sessionStorage.getItem('id')}/devname`);
        return response.data.devname;
    }

    public static async getEmail() {
        const response = await API.Axios.get<{
            email: string
        }>(`/dev/${sessionStorage.getItem('id')}/email`);
        return response.data.email;
    }

    public static async getImage() {
        const response = await API.Axios.get<{
            image: string | null
        }>(`/dev/${sessionStorage.getItem('id')}/image`);
        return response.data.image; 
    }

    public static async getGames() {
        const response = await API.Axios.get<{
            games: number[]
        }>(`/dev/${sessionStorage.getItem('id')}/games`);
        return response.data.games; 
    }

    public static async newGame(game: GameData) {
        const formData = new FormData();
        formData.append('name', game.name);
        formData.append('description', game.description);
        formData.append('price', game.price.toString());
        const blob = await imageFromPath(game.image!); 
        formData.append('image', blob);
        await API.Axios.post(
            `/dev/${sessionStorage.getItem('id')}/games`,
            formData
        );
    }
}