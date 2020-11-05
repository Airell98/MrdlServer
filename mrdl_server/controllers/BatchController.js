const Batch = require("../models").CurrentBatch;
const {User }= require("../models")

class BatchController {
  static getBatch(req, res, next) {
    Batch.findAll()
      .then((data) => {
        res.status(200).json({
          batch: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static createBatch(req, res, next) {
    const { batch } = req.body;
    let currentBatch = Number(batch);
    Batch.create({ batch: currentBatch })
      .then((data) => {
        res.status(201).json({
          batch: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateBatch(req, res, next) {
    const { batch, id } = req.body;
    let currentBatch = Number(batch);
    Batch.update(
      { batch: currentBatch },
      {
        where: {
          id,
        },
      }
    )
      .then((data) => {
        res.status(200).json({
          batch: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateUserStatusByBatch(req, res, next) {
    let theBatch = 0;
    Batch.findAll()
      .then((currentBatch) => {
        theBatch = currentBatch[0].batch;
        console.log(theBatch, "ini batch nya brok")
        return User.update(
          {
            sts: "true",
          },
          {
            where: {
              batch:theBatch
            },
          }
        );
      })
      .then((response) => {
        res.status(200).json({
          msg: "berhasil",
        });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = BatchController;
