angular.module("meanGames").factory("UsersFactory", UsersFactory);

function UsersFactory($http) {
  return {
    register,
    login,
  };

  function register(user) {
    return $http.post("/api/register", user).then(complete).catch(fail);
  }
  function login(user) {
    return $http.post(`/api/login`, user).then(complete).catch(fail);
  }

  function complete(res) {
    return res.data;
  }

  function fail(err) {
    return err;
  }
}
