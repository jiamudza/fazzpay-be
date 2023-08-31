const { v4: uuidv4 } = require("uuid");
const db = require("../helper/connection");

const transactionModel = {
  add: ({ senderId, receiverId, amount, senderNumber, receiverNumber }) => {
    return new Promise((resolve, reject) => {
      db.query(
        "insert into transaction (transaction_id, sender_id, receiver_id, sender_number, receiver_number, amount, created_at) values($1,$2,$3,$4,$5,$6,$7)",
        [
          uuidv4(),
          senderId,
          receiverId,
          senderNumber,
          receiverNumber,
          amount,
          new Date(),
        ],
        (err, result) => {
          if (err) return reject(err.message);
          else {
            db.query(
              `select * from users where user_id = '${senderId}'`,
              (err, result) => {
                if (err) return reject(err.message);
                else {
                  if (result.rows[0].balance < amount) {
                    return reject("Your Balance is Insufficient");
                  } else {
                    db.query(
                      `update users set balance = balance - ${amount} where user_id = '${senderId}' returning user_id, first_name, last_name, email, user_image, balance`,
                      (err) => {
                        if (err) return reject(err.message);
                        else {
                          db.query(
                            `update users set balance = balance + ${amount} where user_id = '${receiverId}' returning user_id, first_name, last_name, email, user_image, balance`,
                            (err, result) => {
                              if (err) return reject(err.message);
                              else {
                                db.query(
                                  `select transaction.created_at, transaction.transaction_id, transaction.sender_id, transaction.receiver_id, users.user_id, users.first_name, users.last_name, users.user_image, transaction.amount, users.balance
                                                from transaction
                                                left join users
                                                on transaction.sender_id = users.user_id or transaction.receiver_id = users.user_id
                                                where transaction.sender_id = '${senderId}' or transaction.receiver_id = '${senderId}'
                                                ORDER BY transaction.created_at desc limit 2`,
                                  (err, result) => {
                                    if (err) return reject(err.message);
                                    else return resolve(result.rows);
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        }
      );
    });
  },

  getById: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select sum(amount) from transaction where sender_id = '${userId}'`,
        (err, expand) => {
          if (err) return reject(err.message);
          else {
            db.query(
              `select sum(amount) from transaction where receiver_id = '${userId}'`,
              (err, income) => {
                if (err) return reject(err.message);
                else {
                  db.query(
                    `select
                    transaction.created_at,
                    transaction.transaction_id,
                    transaction.sender_id,
                    transaction.receiver_id,
                    users.user_id,
                    users.first_name,
                    users.last_name,
                    users.user_image,
                    transaction.sender_number,
                    transaction.receiver_number,
                    transaction.amount,
                    users.balance
                  from
                    transaction
                    left join users on transaction.sender_id = users.user_id
                    or transaction.receiver_id = users.user_id
                  where
                    transaction.receiver_id = '${userId}'
                    or transaction.sender_id = '${userId}'`,
                    (err, result) => {
                      if (err) return reject(err.message);
                      else {
                        return resolve({
                          data: result.rows,
                          expense: expand.rows[0].sum,
                          income: income.rows[0].sum,
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    });
  },
};

module.exports = transactionModel;
