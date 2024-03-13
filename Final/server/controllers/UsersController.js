// بسم الله

const express = require("express");
const bcrypt = require("bcrypt");
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

  .get("/getAllUsers", requireUser(), (req, res, next) => {
    getAll()
      .then((users) => res.send(users))
      .catch(next);
  })

  .get("/getUserById/:id", requireUser(), (req, res, next) => {
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
  .delete("/deleteUser/:_id", requireUser(), (req, res, next) => {
    const { _id } = req.params;
    deleteUser(_id)
      .then(() => res.send({ message: "User deleted" }))
      .catch(next);
  })

  .post("/login", async (req, res) => {
    console.log("Login request received");
    const { email, password } = req.body;
    try {
      const users = await getAll();
      const user = users.find((u) => u.email === email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = await generateJWT(user);
        const loginData = { token, user };
        res.send({ data: loginData, isSuccess: true });
      } else {
        res.send({ data: null, isSuccess: false });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
  .get("/search/:query", requireUser(), async (req, res) => {
    try {
      const query = req.params.query;
      const result = await users.searchUsers(query);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  })
  .put("/updateUserRole/:id", requireUser(), async (req, res) => {
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
