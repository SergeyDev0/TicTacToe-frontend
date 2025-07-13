import axios, { type AxiosResponse } from "axios";
import type { Game, Games, iCreateGame, iCreateGameReq, iMove, iMoveReq } from "./types/games";

async function apiRequest<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}

export const getGames = () => 
  apiRequest<Games[]>(axios.get("http://176.108.251.73:8080/api/games"));

export const getGame = (id: string) => 
  apiRequest<Game>(axios.get(`http://176.108.251.73:8080/api/games/${id}`));

export const createGame = (params: iCreateGame) => 
  apiRequest<iCreateGameReq>(axios.post("http://176.108.251.73:8080/api/games/new", params));

export const moveGame = (id: string, params: iMove) => 
  apiRequest<iMoveReq>(axios.post(`http://176.108.251.73:8080/api/games/${id}/move`, params));