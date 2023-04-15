const express = require('express');
const matchRouter = express.Router();
import { Response } from 'express';
import { MatchService } from "../services/matchService"
import { RecentMatchRequest } from "../models/MatchRequests"
import { MatchDAO } from '../dao/MatchDAO';
import { CricDataClient } from '../externalService/cricDataClient';

const matchDao = new MatchDAO();

//TESTING
matchRouter.get('/', async (req: RecentMatchRequest, res: Response) => {
    const matchService = new MatchService();
    matchService.fetchScoreCard()
        .then(data => {
            // console.log(data)
            res.send(data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error fetching scorecard');
        });

});


// GET matches
//Fetch match by matchId
matchRouter.get('/:matchId', async (req, res) => {
    const matchService = new MatchService();
    const { matchId } = req?.params;
    const match = await matchService.fetchMatchDetails(matchId);
    res.json(match);
});


// GET matches
//Fetch match by matchId
matchRouter.get('/recent-matches', async (req: RecentMatchRequest, res: Response) => {
    const { timestampPointer } = req.query;
    const matchService = new MatchService();
    const match = await matchService.getRecentMatches(timestampPointer);
    res.json(match);
});


export default matchRouter;
