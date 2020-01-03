const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from users'),
    single: id => db.load(`select * from users where user_ID = ${id}`),
    singleByUserName: async username => {
        const rows = await db.load(`select * from users where Username = '${username}'`);
        if (rows.length === 0)
            return null;
        return rows[0];
    },
    singleByEmail: async email =>{
        const rows = await db.load(`select * from users where Email = '${email}'`);
        if(rows.length === 0)
            return null;
        return rows[0];
    },
    add: entity => db.add('users', entity),
    del: id => db.del('users', { f_ID: id }),
};