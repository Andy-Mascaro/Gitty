const pool = require('../utils/pool');

class GitUser {
  id;
  username;
  email;
  avatar;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.avatar = row.avatar;
  }

  static async insert({ username, email, avatar }) {
    if (!username) throw new Error('Username is required');
    const { rows } = await pool.query(
      `INSERT INTO git_users (username, email, avatar) VALUES ($1, $2, $3) RETURNING *`,
      [username, email, avatar]
    );
    console.log('username', rows[0]);
    return new GitUser(rows[0]);
  }

  static async findByUsername(username) {
    const { rows } = await pool.query(
      `SELECT * FROM git_users WHERE username=$1`,
      [username]
    );
    if (!rows[0]) return null;
    return new GitUser(rows[0]);
  }
  toJSON() {
    return { ...this };
  }
}

module.exports = { GitUser };
