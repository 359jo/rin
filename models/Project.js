"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      pending: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      organization: DataTypes.STRING,
      sector: DataTypes.STRING,
      impact: DataTypes.STRING,
      thesis: DataTypes.STRING,
      structure: DataTypes.STRING,
      refugeeInvestmentType: DataTypes.STRING,
      investmentSize: DataTypes.INTEGER,
      img: DataTypes.STRING,
      logo: DataTypes.STRING,
      year: DataTypes.DATE
    },
    {
      tableName: "projects"
    }
  );

  Project.associate = function(models) {
    Project.hasMany(models.Story, { as: "stories" });
    Project.hasMany(models.Location, { as: "locations" });
    Project.belongsTo(models.Contact, { as: "contact" });
    Project.belongsToMany(models.Investor, {
      as: "investors",
      through: "ProjectInvestor"
    });
    Project.belongsToMany(models.Founder, {
      as: "founders",
      through: "ProjectFounder"
    });
    Project.belongsToMany(models.Country, {
      as: "countries",
      through: "ProjectCountry"
    });
    Project.belongsToMany(models.Sdg, { as: "sdgs", through: "ProjectSdg" });
  };

  return Project;
};
