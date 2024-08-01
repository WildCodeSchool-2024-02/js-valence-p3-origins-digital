const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (username, email, hashed_password, is_admin, avatar) values (?, ?, ?, ?, ?)`,
      [
        user.username,
        user.email,
        user.hashedPassword,
        user.isAdmin,
        user.avatar,
      ]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select id, username, email, hashed_password, is_admin, avatar from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `select id, username, email, avatar, created_at, is_admin from ${this.table}`
    );

    return rows;
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return rows[0];
  }

  async readFavorites(id) {
    const [rows] = await this.database.query(
      `select v.*, v.id as videoId, u.username, ad.created_at from add_favorite ad
       join user u on u.id=ad.user_id 
       join video v on v.id=ad.video_id
       where u.id=? order by ad.created_at desc`,
      [id]
    );
    return rows;
  }

  async readCommentsByUser(id) {
    const [rows] = await this.database.query(
      `select v.*, v.id as videoId, c.comment, u.username, c.created_at, c.id from commenting c
         join user u on u.id=c.user_id
         join video v on v.id=c.video_id
         where u.id= ? order by v.title`,
      [id]
    );
    return rows;
  }

  async readRatesByUser(id) {
    const [rows] = await this.database.query(
      `select v.title, v.id, r.rating, u.username, r.created_at from rating r
       join user u on u.id=r.user_id
       join video v on v.id=r.video_id
       where u.id = ? order by r.created_at`,
      [id]
    );
    return rows;
  }

  async readRateByUserByVideo(userId, videoId) {
    const [rows] = await this.database.query(
      `select r.rating from rating r
       join user u on u.id=r.user_id
       join video v on v.id = r.video_id
       where u.id = ? and v.id = ?`,
      [userId, videoId]
    );
    return rows[0];
  }
  // async update(user) {
  //   ...
  // }

  async delete(id) {
    const [rows] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return rows.affectedRows;
  }

  async deleteFavorite(userId, videoId) {
    const [rows] = await this.database.query(
      `delete from add_favorite where user_id = ? and video_id = ?`,
      [userId, videoId]
    );
    return rows.affectedRows;
  }

  async deleteComment(id) {
    const [rows] = await this.database.query(
      `delete from commenting where id = ?`,
      [id]
    );
    return rows.affectedRows;
  }
}

module.exports = UserRepository;
