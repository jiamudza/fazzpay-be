const db = require("../helper/connection");

const userModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query("select * from users", (err, result) => {
        if (err) return reject(err.message);
        else return resolve(result.rows);
      });
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
              }', first_name ='${
                firstName || result.rows[0].first_name
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
