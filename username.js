let username = '';

function setUsername(newUsername) {
  username = newUsername;
}

function getUsername() {
  return username;
}

module.exports = { setUsername, getUsername };
