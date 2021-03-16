const Accounts = require('./accounts-model.js')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.name || !req.body.budget) {
    res.status(400).json({ message: 'name and budget are required' })
  } else if (typeof req.body.name !== 'string' ) {
    res.status(400).json({ message: 'name of account must be a string' })
  } else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    res.status(400).json({ message: 'name of account must be between 3 and 100' })
  } else if (typeof req.body.budget !== 'number') {
    res.status(400).json({ message: 'budget of account must be a number' })
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    res.status(400).json({ message:'budget of account is too large or too small'})
  } else {
    req.body.name = req.body.name.trim();
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Accounts.getAll()
    const name = req.body.name.trim()
    const results = account.filter(item => {
      if(item.name === name) {
        return item
      } 
    }) 
      if (results.length > 0) {
        return res.status(400).json({ message: 'that name is taken'})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}
    // if(!account.name.trim()) {
      // res.status(400).json({ message:'that name is taken'})
    // } else {
      // req.account = account.name.trim()

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params;
  try {
    const account = await Accounts.getById(id);
    if(!account) {
      res.status(404).json({ message:'account not found' })
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err)
  }
};
