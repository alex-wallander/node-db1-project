const router = require('express').Router()

const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware.js');

const Account = require('./accounts-model.js');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.account)
  next();
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  Account.create(req.body)
  .then(acc => {
    console.log('post request', acc)
    res.status(201).json(acc)
    acc.trim();
  })
  .catch(next);
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Account.updateById(req.params.id, req.body)
  .then((accs) => {
    res.status(200).json(accs)
    accs.trim();
  })
  .catch(next);
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.deleteById(req.params.id)
  .then(() => {
    res.status(200).json({ message:'account has been deleted' })
  })
  .catch(next);
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
  next(err);
})

module.exports = router;
