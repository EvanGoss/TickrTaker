module.exports = (db, Sequelize) => {

  //  Initializes user table. Currently only has email, can also have phone/additional Facebook information.

  var User = db.define('user', {

    id: {type: Sequelize.STRING, primaryKey: true},
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: {type: Sequelize.STRING, unique: true},
    photo: Sequelize.TEXT
  });


  //  PSEUDO-IMPLEMENTED. Updates the user's information. However, not many fields can be changed...
  //  Only email at the moment. Feel free to add/remove fields and change facebook information.

  var updateUser = (req, res, userObject) => {
    if (req.user === undefined) { 
      res.send('user undefined');
      return;
    }
    
    User.find({ where: { id: req.user.dataValues.id }})
    .then(function(user) {
      if (!user) {
        console.log('cannot edit nonexistent user');
        res.redirect('/signin');
      } else {
        console.log('Updating User with ', userObject.userData.email);
        user.update(userObject.userData)
        .then(function(newUserInfo) {
          console.log(newUserInfo.dataValues);
          res.send(newUserInfo.dataValues);
        });
      }
    }).catch(function(err) {
      console.log(err);
    });
  };

  return {
    User: User,
    updateUser: updateUser
  };
};