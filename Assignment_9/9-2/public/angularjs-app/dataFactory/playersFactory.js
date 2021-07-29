angular.module("meanTennis").factory("PlayersFactory", PlayersFactory);

function PlayersFactory($http) {
  return {
    getPlayers,
    getOnePlayer,
    addPlayer,
    updateOnePlayer,
    deletePlayer,
  };

  function getPlayers() {
    return $http.get("/api/players").then(complete).catch(fail);
  }
  function getOnePlayer(playerId) {
    return $http.get(`/api/players/${playerId}`).then(complete).catch(fail);
  }
  function addPlayer(player) {
    return $http.post(`/api/players`, player).then(complete).catch(fail);
  }
  function updateOnePlayer(playerId, player) {
    return $http
      .put(`/api/players/${playerId}`, player)
      .then(complete)
      .catch(fail);
  }
  function deletePlayer(playerId) {
    return $http.delete(`/api/players/${playerId}`).then(complete).catch(fail);
  }

  function complete(res) {
    return res.data;
  }

  function fail(err) {
    return err;
  }
}
