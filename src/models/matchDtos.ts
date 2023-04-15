class MatchDTO {
  id: string;
  seriesId: number;
  seriesName: string;
  matchDesc: string;
  matchFormat: string;
  startDate: string;
  endDate: string;
  state: string;
  team1: TeamDTO;
  team2: TeamDTO;
  venueInfo: VenueDTO;
  seriesStartDt: string;
  seriesEndDt: string;
  isTimeAnnounced: boolean;
  stateTitle: string;
  isFantasyEnabled: boolean;

  constructor({ matchId, seriesId, seriesName, matchDesc, matchFormat, startDate, endDate, state, team1, team2, venueInfo, seriesStartDt, seriesEndDt, isTimeAnnounced, stateTitle, isFantasyEnabled }) {
    this.id = matchId;
    this.seriesId = seriesId;
    this.seriesName = seriesName;
    this.matchDesc = matchDesc;
    this.matchFormat = matchFormat;
    this.startDate = startDate;
    this.endDate = endDate;
    this.state = state;
    this.team1 = team1;
    this.team2 = team2;
    this.venueInfo = venueInfo;
    this.seriesStartDt = seriesStartDt;
    this.seriesEndDt = seriesEndDt;
    this.isTimeAnnounced = isTimeAnnounced;
    this.stateTitle = stateTitle;
    this.isFantasyEnabled = isFantasyEnabled;
  }
}

class TeamDTO {
  id: number;
  teamName: string;
  teamSName: string;
  imageId: number;

  constructor({ teamId, teamName, teamSName, imageId }) {
    this.id = teamId;
    this.teamName = teamName;
    this.teamSName = teamSName;
    this.imageId = imageId;
  }
}

class VenueDTO {
  id: number;
  ground: string;
  city: string;
  timezone: string;
  latitude: string;
  longitude: string;

  constructor({ id, ground, city, timezone, latitude, longitude }) {
    this.id = id;
    this.ground = ground;
    this.city = city;
    this.timezone = timezone;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

module.exports = {
  MatchDTO,
  TeamDTO,
  VenueDTO,
};