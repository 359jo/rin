'use strict';
module.exports = (sequelize, DataTypes) => {
  const MailList = sequelize.define('MailList', {
    email: DataTypes.STRING
  }, {
      tableName: "maillist"
    });
  MailList.associate = function (models) {
    // associations can be defined here
  };
  return MailList;
};