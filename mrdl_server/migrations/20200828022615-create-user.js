'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      fighter_id: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      mymail: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      email_verified: {
        type: Sequelize.STRING
      },
      tgl_member: {
        type: Sequelize.DATE
      },
      tanggal_valid: {
        type: Sequelize.DATE
      },
      img: {
        type: Sequelize.TEXT
      },
      nama_toko: {
        type: Sequelize.STRING
      },
      img_toko: {
        type: Sequelize.TEXT
      },
      bank: {
        type: Sequelize.STRING
      },
      no_rekening: {
        type: Sequelize.STRING
      },
      nama_pemilik_rekening: {
        type: Sequelize.STRING
      },
      img_verifikasi_number: {
        type: Sequelize.TEXT
      },
      img_verifikasi_image: {
        type: Sequelize.TEXT
      },
      no_identitas: {
        type: Sequelize.STRING
      },
      domisili: {
        type: Sequelize.STRING
      },
      referror: {
        type: Sequelize.STRING
      },
      verifikasi: {
        type: Sequelize.STRING
      },
      keterangan_penolakan_verifikasi: {
        type: Sequelize.STRING
      },
      credit: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      sts: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      payment_status: {
        type: Sequelize.STRING
      },
      kode_midtrans: {
        type: Sequelize.STRING
      },
      voucher: {
        type: Sequelize.STRING
      },
      api_token: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};