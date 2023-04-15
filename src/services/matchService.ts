import { MatchDAO } from '../dao/MatchDAO';
import { CricDataClient } from '../externalService/cricDataClient';
const scoreCardService = require("./scoreCardService")

export class MatchService {
    matchDao;
    scoreCardServiceInstance;
    constructor() {
        this.matchDao = new MatchDAO();
        this.scoreCardServiceInstance = new scoreCardService.ScoreCardService();

    }

    async fetchMatchDetails(matchId) {
        const matchDto = await this.matchDao.findById(matchId);
        return matchDto;
    }

    async getRecentMatches(timestampPointer: number) {
        //two scenerios, 1. match IN_PROGRESS, 2. NO_MATCH_ONGOING
        var matchList = this.matchDao.getMatchesArounTimestamp(timestampPointer);
    }

    async fetchMatchInWindow(startTimestamp: number, endTimestamp: number) {
        return this.matchDao.readMatchesByStartAndEndtime(startTimestamp, endTimestamp);
    }

    async fetchScoreCard() {
        try {
            const result = await CricDataClient.getMatchScore("f29a4077-8f04-4cba-90e4-e117b8a10f05");
            if (result) {
                // console.log(result);
                this.scoreCardServiceInstance.processScorecard(result);
                return result;
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}



