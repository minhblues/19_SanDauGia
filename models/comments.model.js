const db = require('../utils/db')

module.exports = {
    all: () => db.load('select * from comments'),
    allByUser: user => db.load(`select * from comments where User = \"${user}\"`),
    add: entity => db.add('comments', entity),
    del: (product, user) => db.load(`delete from comments where Product=${product} and User=\"${user}\"`),
    patch: async entity => {
        condition = { Id: entity.Id };
        delete entity.Id;
        await db.patch('comments', entity, condition)
    }


}