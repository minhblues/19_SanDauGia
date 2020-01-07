const db = require('../utils/db')

module.exports = {
    all: () => db.load('select * from banned'),
    allByUser: user => db.load(`select * from banned where Username = \"${user}\"`),
    add: entity => db.add('banned', entity),
    del: (id) => db.load(`delete from banned where Id=${id}`),
    patch: async entity => {
        condition = { Id: entity.Id };
        delete entity.Id;
        await db.patch('banned', entity, condition)
    },
    isBan: (user, product) => db.load(`select * from banned where Username=\"${user}\" and Product=${product}`)
}