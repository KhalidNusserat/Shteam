import { GameData } from "../helpers";
import API from "./API";

export class Game {
    private constructor() { }

    private static async getGame(game_id: number) {
        const response = await API.Axios.get<{
            game: GameData
        }>(`/game/${game_id}`);
        return response.data.game;
    }

    public static async getAllGames() {
        const response = await API.Axios.get<{
            games: GameData[]
        }>('/game');
        return response.data.games;
    }

    public static async getGamesFromIds(games_ids: number[]) {
        return Promise.all(games_ids.map(async game_id => await this.getGame(game_id)));
    }
}