const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from categories'),
    single: async id => {
        ret = await db.load(`select * from categories where CatId = ${id}`);
        return ret[0]
    },
    getIdByCatName: async CatName =>{
        ret = await db.load(`select * from categories where CatName = '${CatName}'`);
        return ret[0];
    },
    add: entity => db.add('categories', entity),
    del: id => db.del('categories', { CatID: id }),
    patch: entity => {
        const condition = { CatID: entity.CatID };
        delete entity.CatID;
        return db.patch('categories', entity, condition);
    },

    allWithDetails: _ => {
        const sql = `
      select c.CatID, c.CatName, count(p.ProID) as num_of_products
      from categories c left join products p on c.CatID = p.CatID
      group by c.CatID, c.CatName`;
        return db.load(sql);
    },
};