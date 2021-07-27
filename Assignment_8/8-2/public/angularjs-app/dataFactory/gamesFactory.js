angular.module("meanGames").factory("GamesFactory", GamesFactory);

function GamesFactory($http) {
  return {
    getGames,
    getOneGame,
  };

  function getGames() {
    return $http.get("/api/games").then(complete).catch(fail);
  }
  function getOneGame(gameId) {
    return $http.get(`/api/games/${gameId}`).then(complete).catch(fail);
  }

  function complete(res) {
    return res.data;
  }

  function fail(err) {
    return err;
  }
}
