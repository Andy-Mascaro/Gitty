const pool = require('../utils/pool');

class Post {
  id;
  repo;
  memo;

  constructor(row) {
    this.id = row.id;
    this.repo = row.repo;
    this.memo = row.memo;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, repo FROM posts');
    return rows.map((row) => new Post(row));
  }
}

module.exports = { Post };
