const db = require('../lib/db');

module.exports = {
    all: () => db.load('select * from categories'),
    single: id => db.load(`select * from categories where CatID = ${id}`),
    add: entity => db.add('categories', entity),
    del: id => db.del('categories', { CatID: id }),
    patch: entity => {
        const condition = { CatID: entity.CatID };
        delete entity.CatID;
        // console.log(condition, entity);
        return db.patch('categories', entity, condition);
    }
};