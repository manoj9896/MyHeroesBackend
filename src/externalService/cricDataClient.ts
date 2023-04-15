import axios from "axios";

const api = axios.create({
    baseURL: `https://api.cricapi.com`,
    headers: {
    },

});

export class CricDataClient {
    constructor() { }

    static async getMatchScore(matchId: string) {
        try {
            const res = await api
                .get("v1/match_scorecard", {
                    params: {
                        apiKey: "a09a6281-1bfa-4c85-95e5-c90d81ebd39d",
                        offset: 0,
                        id: matchId
                    },
                });

                // console.log(res.data)
                return res.data
        }
        catch (err) {
            console.error(err);
            throw new Error("Error fetching recent matches");
        }
    }
}
