const User = require('../models/user');

exports.all = async function() {
  return await User.find({}, function (err, data) {
    if(err) throw new Error(err);
    return data;
  })
};

exports.create = async function(req, res) {
  await new User(req.body).save(function(err, user) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(user);
  })
};

exports.update = async function(req, res) {

  await User.findByIdAndUpdate(req.body.id, req.body, {"new": true}, function (err, updatedUser) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(updatedUser);
  })
};

exports.delete = async function(req, res) {
  await User.findByIdAndDelete(req.params.id, function (err, deletedUser) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(deletedUser);
  })
};


function processErr(err, response) {
  console.log(err);
  response.status(500);
  response.send(err.message);
}
