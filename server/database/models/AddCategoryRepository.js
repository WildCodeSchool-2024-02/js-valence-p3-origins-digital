const AbstractRepository = require("./AbstractRepository");

class AddCategoryRepository extends AbstractRepository {
  constructor() {
    super({ table: "add_category" });
  }

  async create(categoryId, videoId) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (category_id, video_id) values (?, ?)`,
      [categoryId, videoId]
    );
    return rows.insertId;
  }
}

module.exports = AddCategoryRepository;
