angular.module("meanGames").factory("GamesFactory", GamesFactory);

function GamesFactory($http) {
  return {
    getGames,
    getOneGame,
    addOneGame,
    updateOneGame,
    deleteGame,
  };

  function getGames() {
    return $http.get("/api/games").then(complete).catch(fail);
  }
  function getOneGame(gameId) {
    return $http.get(`/api/games/${gameId}`).then(complete).catch(fail);
  }
  function addOneGame(game) {
    return $http.post(`/api/games`, game).then(complete).catch(fail);
  }
  function updateOneGame(gameId, game) {
    return $http.put(`/api/games/${gameId}`, game).then(complete).catch(fail);
  }
  function deleteGame(gameId) {
    return $http.delete(`/api/games/${gameId}`).then(complete).catch(fail);
  }

  function complete(res) {
    return res.data;
  }

  function fail(err) {
    return err;
  }
}
