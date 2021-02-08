const handleRegister = (req, res, db, bcrypt) => {
  const { name, password, email } = req.body;
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);

  if (!name || !password || !email) {
    return res.status(400).json('incorrect form submission')
  }

  db.transaction(trx => {
    trx
    .insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(emailLogin => {
      return trx('users')
        .returning('*')
        .insert({
            name: name,
            email: emailLogin[0],
            joined: new Date()
          })
        .then(user => {
            res.json(user[0])
          })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
    .catch(err => res.status(400).json('unable to register'))

}

export default { handleRegister };