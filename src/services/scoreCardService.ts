import { forEachChild } from 'typescript';
import { performanceCard } from '../models/constants';

export class ScoreCardService {
    constructor() {
    }

    async processScorecard(matchData: any) {
        //parse the score
        // console.log(matchData.data)
        const data = matchData.data;
        console.log(data)
        if (!data || !data.scorecard) {
            throw Error("something went wrong");
        }

        const scorecard = data.scorecard

        //Handle duplicate playerId
        this.parseScoreCard(scorecard)
            .then(parsedData => {
                console.log(parsedData)
            })
            .catch(error => {
                throw error;
            });

        //save the match data

        //update sqaud points

        //call rank update
    }

    async parseScoreCard(scorecard: any) {
        // this.parseBatsman(scorecard);

        const parsedData: any[] = [];

        //parse atmost 2 inning
        for (let i = 0; i < Math.min(scorecard.length, 2); i++) {
            const inningScorecard = scorecard[i];

            const batsmanData = await this.parseBatsman(inningScorecard);
            const bowlerData = await this.parseBowler(inningScorecard);
            const catcherData = await this.parseCatcher(inningScorecard);

            parsedData.push(...batsmanData, ...bowlerData, ...catcherData);
        }

        return this.clubScoreForPlayers(parsedData);
    }

    async parseBatsman(scorecard: any) {
        const battingData = scorecard.batting;
        console.log(battingData);

        if (!battingData) {
            //TODO: error handling here
            return [];
        }

        const parsedData = battingData.map((batsman: any) => {
            //use this template for storing each attributes(like 4 sixes, 3 4s, etc), for now
            // we will calculate fantasy points only
            const pointTemplate = this.getPointTemplate("batsman");
            // console.log(batsman)
            if (!batsman["batsman"]["id"]) {
                return [];
            }

            const runs = batsman.r;
            const fours = batsman["4s"];
            const sixes = batsman["6s"];

            var fantasyPoints = runs + (4 * fours) + (6 * sixes);
            if (runs >= 50 && runs < 100) {
                fantasyPoints += 8; // 8 bonus points for half-century
            } else if (runs >= 100) {
                fantasyPoints += 16; // 16 bonus points for century
            }

            if (batsman["batsman"]["id"]) {
                console.log(batsman)
            }
            return [batsman["batsman"]["id"], fantasyPoints]
        }).filter(item => item.length !== 0);

        return parsedData;
    }

    async parseBowler(scorecard: any) {
        const bowlingData = scorecard.bowling;
        // console.log(bowlingData);

        if (!bowlingData) {
            return [];
        }

        const parsedData = bowlingData.map((bowler: any) => {

            if (!bowler["bowler"]["id"]) {
                return [];
            }

            const points = {
                wickets: 25,    // For every wicket taken (excluding run out)
                fourWickets: 8, // For taking 4 or more wickets in an innings
                fiveWickets: 16 // For taking 5 or more wickets in an innings
            };

            // Calculate fantasy points for the bowler
            let fantasyPoints = 0;
            fantasyPoints += bowler.w * points.wickets; // w - number of wickets taken
            if (bowler.w >= 4) {
                fantasyPoints += points.fourWickets;
            }
            if (bowler.w >= 5) {
                fantasyPoints += points.fiveWickets;
            }

            return [bowler["bowler"]["id"], fantasyPoints];
        }).filter(item => item.length !== 0);

        return parsedData;
    }

    async parseCatcher(scorecard: any) {
        const cathingdata = scorecard.catching;
        // console.log(cathingdata);

        if (!cathingdata) {
            return [];
        }

        const parsedData = cathingdata.map((catcher: any) => {

            if (!catcher["catcher"]["id"]) {
                return [];
            }

            const points = {
                catch: 8,
                stumping: 12,
                runout_direct: 12,
                runout_thrower: 6,
            };

            // assume 'stats' variable holds the catcher stats
            let fantasyPoints = 0;

            if (catcher.catch) {
                fantasyPoints += catcher.catch * points.catch;
            }

            if (catcher.stumped) {
                fantasyPoints += catcher.stumped * points.stumping;
            }

            if (catcher.runout === 1) {
                fantasyPoints += points.runout_direct;
            } else if (catcher.runout === 2) {
                fantasyPoints += points.runout_thrower;
            }

            return [catcher["catcher"]["id"], fantasyPoints]
        }).filter(item => item.length !== 0);

        return parsedData;
    }

    async clubScoreForPlayers(parsedData: any) {
        const summedData: { [key: string]: number } = {};
        for (let [id, score] of parsedData) {
            if (summedData[id]) {
                summedData[id] += score;
            } else {
                summedData[id] = score;
            }
        }

        return summedData;
    }

    async getPointTemplate(role) {
        const points = { ...performanceCard };
        switch (role) {
            case "batsman":
                points.runs = 1; // Assuming 1 run = 1 point
                points.fours = 5; // Assuming 4 runs = 4 points + 1 bonus point
                points.sixes = 8; // Assuming 6 runs = 6 points + 2 bonus points
                points.halfCentury = 8;
                points.century = 16;
                break;
            case "bowler":
                points.wickets = 25;
                points.fourWickets = 8;
                points.fiveWickets = 16;
                break;
            case "allrounder":
                points.runs = 25;
                points.fours = 5;
                points.sixes = 8;
                points.halfCentury = 8;
                points.century = 16;
                points.wickets = 25;
                points.fourWickets = 8;
                points.fiveWickets = 16;
                points.catches = 8;
                points.stumpings = 12;
                points.runOuts = 6;
                break;
            default:
                console.log(`Unknown role: ${role}`);
                break;
        }
        return points;
    }
}