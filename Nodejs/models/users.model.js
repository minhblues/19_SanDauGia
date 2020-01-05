const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from users'),

    singleByUserName: async username => {
        const rows = await db.load(`select * from users where Username = '${username}'`);
        if (rows.length === 0)
            return null;
        return rows[0];
    },
    singleByEmail: async email => {
        const rows = await db.load(`select * from users where Email = '${email}'`);
        if (rows.length === 0)
            return null;
        return rows[0];
    },
    add: entity => db.add('users', entity),
    del: id => db.del('users', { f_ID: id }),
    getScore: async userName => {
        ret = await db.load(`select Score,RateTime from users where Username=\"${userName}\"`);

        if (ret[0])
            if (ret[0].RateTime == 0)
                return 0;
            else return ret[0].Score / ret[0].RateTime
    },
    patch: entity => {
        const condition = { Username: entity.Username };
        delete entity.Username;
        return db.patch('users', entity, condition);
      },

}