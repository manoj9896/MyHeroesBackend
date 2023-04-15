import { FirebaseDAO } from './FirebaseDAO';
const { v4: uuidv4 } = require('uuid');
const { db } = require("../dao/FirestoreClient")

const matchCollectionName = "matches";

const matchCollection = db.collection(matchCollectionName);

export class MatchDAO {
    private baseDao: FirebaseDAO

    constructor() {
        this.baseDao = new FirebaseDAO(matchCollectionName);
    }

    async save(matchDto) {
        matchDto.id = this.getMatchId();

        //convert dto to json
        this.baseDao.create(matchDto, matchDto.id);
    }

    getMatchId() {
        return "MT" + uuidv4();
    }

    async findById(matchId) {
        const matchDto = this.baseDao.read(matchId);

        if (!matchDto) {
            throw Error("Match not found");
        }

        return matchDto;
    }

    async fetchMatchesInWindow(startTimestamp: string, endTimestamp: string) {
        const query = matchCollection.where('startDate', '>=', startTimestamp)
            .where('startDate', '<=', endTimestamp);

        const snapshot = await query.get();

        var matches = [];
        snapshot.forEach(doc => {
            matches.push(doc.data())
        });

        return matches;
    }
}