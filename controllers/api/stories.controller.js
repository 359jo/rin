const storyValidator = require("../validators/story.validator");
const db = require("../../models/index");
const Op = db.Sequelize.Op;

module.exports.getStories = (req, res) => {
  db.Story.findAll({
    include: [
      {
        model: db.Project,
        as: "project",
        include: [
          { model: db.Location, as: "locations" },
          { model: db.Contact, as: "contact" },
          { model: db.Investor, through: { attributes: [] }, as: "Investors" },
          { model: db.Founder, through: { attributes: [] }, as: "Founders" },
          { model: db.Country, through: { attributes: [] }, as: "Countries" },
          { model: db.Sdg, through: { attributes: [] }, as: "Sdgs" }
        ]
      }
    ]
  }).then(result => {
    res.json(result);
  });
};

module.exports.getStoriesPage = (req, res) => {
  const firstStoryIndex = Number(req.query.first);
  const lastStoryIndex = Number(req.query.last);

  db.Story.findAndCountAll({
    offset: firstStoryIndex,
    limit: lastStoryIndex - firstStoryIndex
  }).then(result => {
    res.json(result);
  });
};

module.exports.getStory = (req, res) => {
  db.Story.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: db.Project,
        as: "project",
        include: [
          { model: db.Location, as: "locations" },
          { model: db.Contact, as: "contact" },
          { model: db.Investor, through: { attributes: [] }, as: "Investors" },
          { model: db.Founder, through: { attributes: [] }, as: "Founders" },
          { model: db.Country, through: { attributes: [] }, as: "Countries" },
          { model: db.Sdg, through: { attributes: [] }, as: "Sdgs" }
        ]
      }
    ]
  })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.send(err);
    });
};

module.exports.addStory = (req, res) => {
  let data = req.body;
  db.Story.create(data)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.send(err);
    });
};

module.exports.updateStory = (req, res) => {
  let data = req.body;
  db.Story.update(data, {
    where: {
      id: req.params.id
    }
  })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

module.exports.deleteStory = (req, res) => {
  db.Story.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

module.exports.searchStories = (req, res) => {
  db.Story.findAll({
    where: {
      buisness: {
        [Op.like]: `%${req.query.value}%`
      }
    },
    limit: 10
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(404).json(err);
    });
};
