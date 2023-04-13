import { Request, Response, Router } from "express";
import { CriketMatch } from "../services/cricBuzz.v2.service";
import { MatchOccurrence } from "../types";
import loginRequired from "../middleware/auth.required";
import { db, firebaseAuth } from "../config/firestore.config";
import loginOptional from "../middleware/auth.optional";

const iplRouter = Router();

iplRouter.get("/", (req: Request, res: Response) => {
  firebaseAuth
    .getUserByEmail("mkthirdpartylogin@gmail.com")
    .then((result) => {
      console.log("check result");
      res.send("Testing ipl Router");
    })
    .catch((err) => {
      console.log("check err", err);
      res.send("Testing ipl Router");
    });
  // res.send("Testing ipl Router");
});

iplRouter.get("/matches/:matchType", async (req: Request, res: Response) => {
  const { matchType } = req?.params;
  const matches = await CriketMatch.getMatchesByMatchType(
    matchType as MatchOccurrence
  );
  res.json(matches);
});

iplRouter.get("/image/:imageId", async (req: Request, res: Response) => {
  const { imageId } = req?.params;
  const image = await CriketMatch.getImageById(Number(imageId));
  image.data.pipe(res);
});


iplRouter.get('/match', loginOptional, async(req: Request, res: Response) => {
  const user = req['user'];
  let date_obj = new Date();
  const current_date = date_obj.getFullYear() + "-" + (date_obj.getMonth()+1) + "-" + date_obj.getDate();
  if (user) {
    //---
  } else {
    //---
  }
  res.send("---")
})

//TODO-> add auth middleware
iplRouter.get("/match/:matchId/squad", async (req: Request, res: Response) => {
  const matchId = req.params.matchId;
  const squads = await db.doc(`squad/${matchId}`).get();
  res.send(squads.data()[matchId]);
} )

iplRouter.put("/match/:matchId/squad", async (req: Request, res: Response) => {} );


export default iplRouter;
