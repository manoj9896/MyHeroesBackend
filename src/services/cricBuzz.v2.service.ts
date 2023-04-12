import axios from "axios";

const api = axios.create({
  baseURL: `https://cricbuzz-cricket.p.rapidapi.com/`,
  headers: {
    "X-RapidAPI-Key": "6659fc426bmshceca4f0c502e967p189b21jsn697115d9f031",
    "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
  },
});

enum MatchType {
  International = "International",
  League = "League",
  Domestic = "Domestic",
  Women = "Women",
}

interface Team {
  teamId: number;
  teamName: string;
  teamSName: string;
  imageId: number;
}

type MatchOccurrence = "live" | "recent" | "upcoming";

const iplParams = {
  seriesId: 5945,
  seriesName: "Indian Premier League 2023",
};

export class CriketMatch {
  matchType = MatchType.League;
  constructor() {}

  static async getMatchesByMatchType(type: MatchOccurrence = "upcoming") {
    const res = await api.get(`matches/v1/${type}`);
    const { typeMatches }: { typeMatches: Array<any> } = res.data;
    const seriesMatches: Array<any> = typeMatches?.find(
      (typeMatch) => typeMatch?.matchType === MatchType.League
    )?.seriesMatches;

    const matches = seriesMatches?.find(
      (series) => series?.seriesAdWrapper?.seriesId === iplParams?.seriesId
    )?.seriesAdWrapper?.matches;
    return matches;
  }

  static async getImageById(id: number) {
    try {
      const res = await api.get(`img/v1/i1/c${id}/i.jpg`, {
        responseType: "stream",
        params: { p: "de", d: "high" },
      });
      return res;
    } catch (error) {
      const res = await api.get(`img/v1/i1/c${231889}/i.jpg`, {
        responseType: "stream",
        params: { p: "de", d: "high" },
      });
      return res;
    }
  }

  static async getScoreBoard(matchId: number){
    const response = await api.get(`mcenter/v1/${matchId}/scard'`)
  }

  static async getMatchInfo(matchId: number){
    const response = await api.get(`mcenter/v1/${matchId}`)
  }


}
