const db = require('../utils/db');

module.exports = {
    getScore: async userName => {
        ret = await db.load(`select Score,RateTime from users where UserName=\"${userName}\"`);
        if (ret[0])
            if (ret[0].RateTime == 0)
                return 0;
            else return ret[0].Score / ret[0].RateTime
    },
}