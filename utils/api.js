import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ar-app-nc.herokuapp.com/api',
});

export const getGames = (id) => {
  return api.get(`/games/${id}`).then(({ data }) => {
    return data.soloGame;
  });
};

export const postGames = (gamesObj) => {
  return api.post('/games', gamesObj).then(({ data }) => {
    return data.objectId;
  });
};
