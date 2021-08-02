angular.module("meanTennis").factory("AuthFactory", AuthFactory);

function AuthFactory() {
  let auth = false;
  return {
    authenticated: auth,
  };
}
