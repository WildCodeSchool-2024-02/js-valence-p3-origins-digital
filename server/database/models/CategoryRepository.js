const AbstractCategory = require("./AbstractRepository");

class CategoryRepository extends AbstractCategory {
  constructor() {
    super({ table: "category" });
  }

  async create(name) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (name) values (?)`,
      [name]
    );
    return rows.insertId;
  }


  async readByName(name) {
    const [rows] = await this.database.query(
      `select id from ${this.table} where name = ?`,
      [name]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }
}

module.exports = CategoryRepository;
