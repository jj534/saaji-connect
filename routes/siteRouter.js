const siteRouter = require('express').Router();
const Site = require('./../models/Site');

siteRouter.post('/create', async (req, res) => {
  try {
    const { url } = req.body;
    const existing = await Site.find({ url });

    if (existing && existing.length > 0) {
      res.status(400).send({ msg: '이미 존재하는 URL 입니다' });
      return;
    }

    const result = await new Site({ url }).save();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

siteRouter.get('/', async (req, res) => {
  try {
    const docs = await Site.find({}).sort({ createdAt: -1 });
    res.send(docs);
  } catch (e) {
    res.status(500).send(e);
  }
});

siteRouter.post('/:id/toggle-state', async (req, res) => {
  try {
    const doc = await Site.findById(req.params.id);
    doc.solved = undefined;
    doc.state = (doc.state + 1) % 3;
    const result = await doc.save();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

siteRouter.post('/:id/cmt/add', async (req, res) => {
  try {
    const { text, isAdmin } = req.body;
    const doc = await Site.findById(req.params.id);
    const newCmts = (doc.cmts && [...doc.cmts]) || [];
    newCmts.push({
      text,
      isAdmin,
    });
    doc.cmts = newCmts;
    const result = await doc.save();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = siteRouter;
