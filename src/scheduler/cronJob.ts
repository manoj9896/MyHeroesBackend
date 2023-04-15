const cron = require('node-cron');
import { getCronTime } from "../scheduler/CronUtility"
import { CriketMatch } from "../services/cricBuzz.v1.service"
import { MatchDAO } from '../dao/MatchDAO';

const matchDao = new MatchDAO();
// Set the start time of the job
const startTime = new Date();
const JOB_DURATION = 30; // days 
const MATCH_DAY_DURATION = 12 * 60 * 60 * 1000 // 12 hours duration in millis
let matchInProgress1 = null;
let matchInProgress2 = null;
let masterCron = null;


// master cron, scheduled at 12 each day, TODO: add stopping logic
masterCron = cron.schedule('0 12 * * *', function () {
    console.log('Daily job started');

    let firstMatch, secondMatch;

    fetchCurrentMatches().then(result => {
        firstMatch = result[0];
        secondMatch = result[1];
    }).catch(error => {
        // handle the error
        console.error(error);
    });

    //TODO: need to stop these crons
    if (firstMatch) {
        matchInProgress1 = cron.schedule(getCronTime(firstMatch.startDate), function () { }); // TODO:handler
    }

    if (secondMatch) {
        matchInProgress2 = cron.schedule(getCronTime(secondMatch.startDate), function () { }); // TODO: handler
    }

});

cron.schedule('0 12, * * *', function () {
    if (matchInProgress1) {
        const now = new Date();
        const startTime = matchInProgress1.nextDates(1)[0];
        const elapsedTime = now.getTime() - startTime.getTime();
        const elapsedHours = Math.floor(elapsedTime / (60 * 60 * 1000));

        if (elapsedHours >= JOB_DURATION) {
            console.log('Stopping daily job after 5 hours');
            matchInProgress1.stop();
            matchInProgress1 = null;
        }
    }
});

async function fetchCurrentMatches() {
    const now = new Date();
    const future = new Date(now.getTime() + MATCH_DAY_DURATION);

    const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false
    };
    const startTimestamp = now.toLocaleString('en-US', options);
    const endTimestamp = future.toLocaleString('en-US', options);

    //fetch match details of next 12 hours
    const currentMatches = await matchDao.fetchMatchesInWindow(startTimestamp, endTimestamp);

    // assume two matches a Day for now
    let match1 = null;
    let match2 = null;

    if (typeof currentMatches === 'object' && currentMatches !== null
        && Array.isArray(currentMatches) && currentMatches.length > 0) {

        match1 = currentMatches[0];

        if (currentMatches.length > 1) {
            match2 = currentMatches[1];
        }
    }

    return [match1, match2]
}

function scoreUpdateJob(matchDetails) {
    const intervalId = setInterval((matchDetails) => {
        updateScore(matchDetails);
    }, 180000); // Run the code every 3 minutes

    // Stop the code from running after 5 hours (in milliseconds)
    setTimeout(function () {
        clearInterval(intervalId);
    }, 5 * 60 * 60 * 1000);

}

function updateScore(matchDetails: any) {
    //call score api
    //update score, runs, catches, wickets, and other scoring points
    //update points of players
    //update score of participants
    //update rank of participants
    console.log('Code executed');
}

