const db = require("../helper/connection");

const userModel = {
  query: function (search, display_name, sortBy, limit, offset) {
    let orderQuery = `ORDER BY display_name ${sortBy} LIMIT ${limit} OFFSET ${offset}`;

    if (!search && !display_name) {
      return orderQuery;
    } else if (search && display_name) {
      return `WHERE display_name LIKE '%${search}%' AND display_name LIKE '${display_name}%' ${orderQuery}`;
    } else if (search || display_name) {
      return `WHERE display_name LIKE '%${search}%' OR display_name LIKE '${display_name}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },

  get: (search, display_name, sortBy = "ASC", limit = 10, offset = 0) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from users ${userModel.query(
          search,
          display_name,
          sortBy,
          limit,
          offset
        )}`,
        (err, result) => {
          if (err) return reject(err.message);
          else return resolve(result.rows);
        }
      );
    });
  },

  getById: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from users where user_id = '${userId}'`,
        (err, result) => {
          if (err) return reject(err.message);
          else return resolve(result.rows[0]);
        }
      );
    });
  },

  updateProfile: ({
    userId,
    email,
    phone,
    userImage,
    firstName,
    lastName,
    balance,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from users where user_id = '${userId}'`,
        (err, result) => {
          if (err) {
            return reject(err.message + "err");
          } else {
            db.query(
              `UPDATE users SET  email ='${
                email || result.rows[0].email
              }', phone ='${phone || result.rows[0].phone}',  user_image ='${
                userImage || result.rows[0].user_image
              }', display_name ='${
                firstName || result.rows[0].display_name
              }', last_name ='${
                lastName || result.rows[0].last_name
              }' WHERE user_id='${userId}'`,
              (err, results) => {
                if (err) {
                  return reject(err.message);
                } else {
                  return resolve({
                    userId,
                    email,
                    userImage,
                    phone,
                    firstName,
                    lastName,
                    balance,
                  });
                }
              }
            );
          }
        }
      );
    });
  },

  updateImage: ({ userId, userImage }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from users where user_id = '${userId}'`,
        (err, result) => {
          if (err) {
            return reject(err.message + "err");
          } else {
            db.query(
              `UPDATE users SET user_image ='${
                userImage || result.rows[0].user_image
              }' WHERE user_id='${userId}'`,
              (err, results) => {
                if (err) {
                  return reject(err.message);
                } else {
                  return resolve({
                    userId,
                    userImage,
                    result: result.rows[0],
                  });
                }
              }
            );
          }
        }
      );
    });
  },

  topup: ({ userId, balance }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from users where user_id = '${userId}'`,
        (err, result) => {
          if (err) return reject(err.message);
          else {
            db.query(
              `update users SET balance = '${
                parseInt(balance) + parseInt(result.rows[0].balance) ||
                parseInt(balance)
              }' where user_id = '${userId}'`,
              (err) => {
                if (err) return reject(err.message);
                else {
                  return resolve({
                    userId,
                    balance,
                  });
                }
              }
            );
          }
        }
      );
    });
  },
};

module.exports = userModel;
