const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Invalid user')
  }

  db('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db('users')
          .where('email', '=', email)
          .returning('*')
          .then(data => res.json(data[0]))
      } else {
        res.status(400).json('wrong credensial')
      }
    })
    .catch(err => res.status(400).json('wrong credensial'))
}

export default { handleSignin };