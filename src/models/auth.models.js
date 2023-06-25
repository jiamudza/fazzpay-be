const { v4: uuidv4 } = require("uuid");
const db = require("../helper/connection");
const bcrypt = require("bcrypt");

const authModel = {
  login: ({ email, password }) => {
    // console.log(username, password);
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email=$1`, [email], (err, result) => {
        //username = unique||email = unique
        if (err) return reject(err.message);
        if (result.rows.length == 0) return reject("email/password salah."); //ketika username salah
        bcrypt.compare(
          password,
          result.rows[0].password,
          (err, hashingResult) => {
            if (err) return reject(err.message); //kesalahan hashing(bycript)
            if (!hashingResult) return reject("email/password salah."); //ketika password salah
            return resolve(result.rows[0]);
          }
        );
      });
    });
  },

  register: ({ firstName, email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (user_id, first_name, email, password) VALUES ('${uuidv4()}','${firstName}','${email}','${password}') RETURNING user_id`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          }
          return resolve({
            firstName,
            email,
            password,
          });
        }
      );
    });
  },

  pin: ({pin, userId}) => {
    return new Promise((resolve, reject) => {
        db.query(`update users set pin = ${pin} where user_id = '${userId}'`, 
        (err, result) => {
            console.log(userId)
            if(err) {
                return reject(err.message)
            } else {
                db.query(`select * from users where user_id = '${userId}'`, 
                (error, result) => {
                    if(error) {
                        return reject(error.message)
                    } else {
                        return resolve(result.rows)
                    }
                })
            }
        })
    })
  },

  pinVerify : ({userId, pin}) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from users where user_id = '${userId}'`,
        (err, result) => {
            if(err) return reject(err.message)
            if(result.rows.length == 0) return reject(`User is not found`)
            if(result.rows[0].pin !== pin) return reject(`Your pin is not valid`)
            else return resolve(result.rows[0])
        })
    })
  }
};
module.exports = authModel;
