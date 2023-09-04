const userModel = require("../Module/userModel");

module.exports = {
  create: (req, res) => {
    //logic for entries goes here

    const userData = req.body;
    const { emailId } = userData;
    userModel.userCollection.find({ emailId: emailId })
    .then((data) => {
      if (data.length === 0) {
        return userModel
          .create(req.body)

          .then((data) => {
            return res.send({
              status: "ok",
              msg: "User created successfully.",
              data: data,
            });
          })

          .catch((err) => {
            return res.send({ status: "fail", error: err });
          });
      }
    });
  },

  getAll: (req, res) => {
    return userModel
      .getALL()

      .then((users) => {
        return res.send(users);
      })

      .catch((err) => {
        return res.send({ status: "fail", error: err });
      });
  },

  deleteById: (req, res) => {
    return userModel
      .deleteById(req.body.id)

      .then((deletedUser) => {
        return res.send({ status: "deleted", deletedUser: deletedUser });
      })

      .catch((err) => {
        return res.send({ status: "failed", error: err });
      });
  },

  updateUser: (req, res) => {
    
    const fields = {
      firstName: req.body.firstname,
      lastName: req.body.lastname
    }
    return userModel
      .updateUser(req.body.emailId, fields)

      .then((updatedUser) => {
        console.log(updatedUser);
        return res.send({ status: "updated", updatedUser: updatedUser });
      })

      .catch((err) => {
        return res.send({ status: "failed", error: err });
      });
  },

  loginuser: (req, res) => {
    return userModel
      .getuser(req.body.emailId)

      .then((userData) => {
        // console.log("Controller");
        if (userData) {
          if (userData.password === req.body.password)
            return res.send({
              status: "ok",
              msg: "Login successful",
              type: userData?.type,
              firstName: userData?.firstName,
              lastName: userData?.lastName,
              emailId: userData?.emailId,
              companyName: userData?.companyName,
            });
          else
            return res.send({
              status: "fail",
              msg: "Incorrect Password",
              error: "Login fail",
            });
        } else
          res.send({
            status: "fail",
            msg: "user not exist",
            error: "Login fail",
          });
      })

      .catch((err) => {
        return res.send({ status: "failed", error: err });
      });
  },
};
