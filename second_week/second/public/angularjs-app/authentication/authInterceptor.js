angular.module("meanTennis").factory("AuthInterceptor", AuthInterceptor);

function AuthInterceptor($window) {
  function request(config) {
    config.headers = config.headers || {};
    if ($window.sessionStorage.token) {
      config.headers.authorization = `Bearer ${$window.sessionStorage.token}`;
    }
    return config;
  }
  return {
    request,
  };
}
