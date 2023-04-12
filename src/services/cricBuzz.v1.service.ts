import axios from "axios";

const api = axios.create({
  baseURL: `https://livescore6.p.rapidapi.com/`,
  headers: {
    "X-RapidAPI-Key": "bd1d5c376bmsh6d68e0754bd619fp10d1efjsnb24b9d11f315",
    "X-RapidAPI-Host": "livescore6.p.rapidapi.com",
  },
});

const iplParams = {
  Sid: "13193",
  Snm: "Indian Premier League",
  Scd: "ipl",
  Cnm: "India",
  Csnm: "India",
  Ccd: "india",
  Cid:"443" // compId
};

export class CriketMatch {
  constructor() {}

  static async getMatches() {
    api
      .get("matches/v2/list-by-date", {
        params: {
          Category: "cricket",
          Date: "20230407", // YYMMDD
        },
      })
      .then((res) => {
        const { Stages }: { Stages: Array<any> } = res.data;
        const todayMatches = Stages?.find((stage) => {
          return stage?.Sid === iplParams.Sid;
        });

        console.log("check matches todays ", todayMatches?.Events);
      });
  }
}
