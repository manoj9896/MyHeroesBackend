import { Request, Response, Router } from "express";
import { CriketMatch } from "../services/cricBuzz.v2.service";
import { MatchOccurrence } from "../types";
import { MatchDAO } from '../dao/MatchDAO';

const iplRouter = Router();

 const matchDao = new MatchDAO();

async function homeMiddleWare(matchObject) {
  // var team1 = matchObject.
}

iplRouter.get("/", homeMiddleWare);

iplRouter.get("/matches/:matchType", async (req: Request, res: Response) => {
  const { matchType } = req?.params;
  const matches = await CriketMatch.getMatchesByMatchType(
    matchType as MatchOccurrence
  );

  console.log(matches)
  matches.forEach(element => processEntities(element));
  res.send(matches);
});

async function processEntities(element){
    const matchInfo = element.matchInfo;
    await matchDao.save(matchInfo);
}

iplRouter.get("/image/:imageId", async (req: Request, res: Response) => {
  const { imageId } = req?.params;
  const image = await CriketMatch.getImageById(Number(imageId));
  image.data.pipe(res);
});


export default iplRouter;
