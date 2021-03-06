module.exports = function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { 'x-access-token': user.toke };
  }

  return {};
};
