const fetch = require('cross-fetch');

const codeForToken = async (code) => {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  const resp = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: JSON > stringify({ client_id, client_secret, code }),
  });
  const respBody = await resp.json();
  return respBody.access_token;
};

module.exports = { codeForToken };
