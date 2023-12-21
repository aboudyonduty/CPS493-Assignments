const express = require('express');
const { getAll, seed, generateJWT, getUserByEmail } = require('../models/users');
const { requireUser } = require('../middleware/authorization');
const router = express.Router();

router.get('/', requireUser(true), (req, res, next) => {

  res.send(getAll());

})
  .post('/seed', (req, res, next) => {
    seed();
    res.send({ message: 'Users seeded' });
  })

  .get('/getAllUsers', (req, res, next) => {
    getAll()
      .then(users => res.send(users))
      .catch(next);
  })


  .get('/getUserByEmail/:email', (req, res, next) => {
    const { email } = req.params;
    getUserByEmail(email)
      .then(user => res.send(user))
      .catch(next);
  })
  .post("/login", (req, res, next) => {
    const { email, password } = req.body;
    getAll()
      .then(async (users) => {
        const user = users.find(
          (x) => x.email === email && x.password === password
        );
        if (user) {
          const token = await generateJWT(user);
          const loginData = { token, user };

          const data = { data: loginData, isSuccess: true };
          res.send(data);
        } else {
          const data = { data: null, isSuccess: false };
          res.send(data);
        }
      })
      .catch(next);
  })
  .get('/search/:query', async (req, res) => {
    try {
      const query = req.params.query;
      const result = await users.searchUsers(query);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


module.exports = router;