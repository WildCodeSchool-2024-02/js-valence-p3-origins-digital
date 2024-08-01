const AbstractRepository = require("./AbstractRepository");

class VideoRepository extends AbstractRepository {
  constructor() {
    super({ table: "video" });
  }

  async create(video) {
    const [result] = await this.database.query(
      `insert into ${this.table} (title, description, thumbnail, isPrivate, source) values (?, ?, ?, ?, ?)`,
      [
        video.title,
        video.description,
        video.thumbnail,
        video.isPrivate,
        video.source,
      ]
    );
    return result.insertId;
  }

  async createFavorite(userId, videoId) {
    const [result] = await this.database.query(
      `insert ignore into add_favorite (user_id, video_id) values (?, ?)`,
      [userId, videoId]
    );
    return result.insertId;
  }

  async createRate(rate) {
    const [result] = await this.database.query(
      `insert into rating (rating, user_id, video_id) values(?,?,?) on duplicate key update rating = values(rating), created_at = current_timestamp`,
      [rate.rating, rate.userId, rate.id]
    );
    return result.affectedRows;
  }

  async createComment(comment) {
    const [result] = await this.database.query(
      `insert into commenting (comment, user_id, video_id) values(?,?,?)`,
      [comment.comment, comment.userId, comment.id]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from video`);
    return rows;
  }

  async readAllVideosByCategories() {
    const [rows] = await this.database.query(
      `select v.*, c.name 
      from add_category ad 
      join category c on c.id = ad.category_id 
      join video v on v.id = ad.video_id
      group by v.id, v.title, v.description, v.created_at, c.name
      order by v.created_at`
    );
    return rows;
  }

  async readBestRatedVideos() {
    const [rows] = await this.database.query(
      `select v.*, AVG(r.rating) as average_rating 
      from rating r 
      join video v on v.id = r.video_id 
      group by v.id, v.title, v.description, v.created_at 
      order by average_rating desc 
      limit 5;`
    );
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async readByAverageRate(id) {
    const [rows] = await this.database.query(
      `select round(avg(rating), 2) from rating join video on rating.video_id = video.id where video.id = ?`,
      [id]
    );
    return rows[0];
  }

  async readCommentsByVideo(id) {
    const [rows] = await this.database.query(
      `select c.id, c.comment, u.avatar,u.username, c.created_at from commenting c 
      join user u on u.id=c.user_id 
      join video v on v.id=c.video_id where v.id = ? order by c.created_at desc`,
      [id]
    );
    return rows;
  }

  async readCategoriesByVideo(id) {
    const [rows] = await this.database.query(
      `select distinct v.title, c.name, ad.id from add_category ad 
      join category c on c.id = ad.category_id
      join video v on v.id = ad.video_id where v.id= ? order by c.name`,
      [id]
    );
    return rows;
  }

  async update(video, id) {
    const [result] = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [video, id]
    );
    return result.affectedRows;
  }

  async updateCategoriesByVideo(data, id) {
    const [result] = await this.database.query(
      `update add_category set ? where id = ?`,
      [data, id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result.affectedRows;
  }

  async deleteVideoComment(videoId, id) {
    const [result] = await this.database.query(
      `delete from commenting where video_id = ? and id = ?`,
      [videoId, id]
    );
    return result.affectedRows;
  }

  async deleteVideoCategory(videoId, id) {
    const [result] = await this.database.query(
      `delete from add_category where video_id = ? and id = ?`,
      [videoId, id]
    );
    return result.affectedRows;
  }
}

module.exports = VideoRepository;
