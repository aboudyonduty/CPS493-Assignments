// بسم الله

const express = require("express");
const {
  getAll,
  seed,
  generateJWT,
  addUser,
  getUsersById,
  deleteUser,
  updateUserRole,
} = require("../models/users");
const { requireUser } = require("../middleware/authorization");
const router = express.Router();

router
  .get("/", requireUser(true), (req, res, next) => {
    res.send(getAll());
  })
  .post("/seed", (req, res, next) => {
    seed();
    res.send({ message: "Users seeded" });
  })

  .get("/getAllUsers", (req, res, next) => {
    getAll()
      .then((users) => res.send(users))
      .catch(next);
  })
  // .get("/getAllUsers", async (req, res, next) => {
  //   try {
  //     const users = await getAll();
  //     const userTokens = await Promise.all(
  //       users.map(async (user) => {
  //         const token = await generateJWT(user);
  //         return { username: user.username, token }; // Include any other user details you need
  //       })
  //     );
  //     res.send(userTokens);
  //   } catch (error) {
  //     next(error);
  //   }
  // });

  .get("/getUserById/:id", (req, res, next) => {
    const { id } = req.params;
    getUsersById(id)
      .then((users) => res.send(users))
      .catch(next);
  })

  .post("/addUser", (req, res, next) => {
    addUser(req.body)
      .then((x) => {
        const data = { data: x, isSuccess: true };
        res.send(data);
      })
      .catch(next);
  })
  .delete("/deleteUser/:_id", (req, res, next) => {
    const { _id } = req.params;
    deleteUser(_id)
      .then(() => res.send({ message: "User deleted" }))
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
  .get("/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const result = await users.searchUsers(query);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  })
  .put("/updateUserRole/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const result = await updateUserRole(id, role);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
