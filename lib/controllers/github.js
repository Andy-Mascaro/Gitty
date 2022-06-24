const { Router } = require('express');
const { GitUser } = require('../models/GitUser');
const { codeForToken, getGitProfile } = require('../services/github');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
    );
  })

  .get('/callback', async (req, res) => {
    const { code } = req.query;
    const githubToken = await codeForToken(code);
    const githubProfile = await getGitProfile(githubToken);

    let user = await GitUser.findByUsername(githubProfile.login);

    if (!user) {
      user = await GitUser.insert({
        username: githubProfile.login,
        email: githubProfile.email,
        avatar: githubProfile.avatar_url,
      });
    }
    const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });

    res.cookie(process.env.COOKIE_NAME, payload, {
      httpOnly: true,
      maxAge: ONE_DAY_IN_MS,
    });
    redirect('/api/v1/github/dashboard');
  });
