const db = require('../utils/db');

module.exports = {
    getScore: async userName => {
        ret = await db.load(`select Score/RateTime as Score from users where UserName=\"${userName}\"`);
        return ret[0].Score
    },
}