const codeForToken = async (code) => {
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getGitProfile = async () => {
  return {
    login: 'Bob',
    avatar_url: 'https://www.placecage.com/gif/300/300',
    email: 'bob@bob.com',
  };
};

module.exports = { codeForToken, getGitProfile };
