const jwt = require('jsonwebtoken');
const Jwt = require("../config/checkJwt");
const constant = require("../config/constant");
const db = require("../models");
const Member = db.member;
const sha1 = require('sha1');
const { QueryTypes } = require('sequelize');


// Create and Save a new member
exports.login = async (req, res) => {
  const username = req.body.user_name;
  let userPwd = req.body.user_pwd;

  

  //sha1
  userPwd = sha1(userPwd);

  // Check member exists?
  const checkMember = await Member.findOne({
    where: {
      username: username,
      password: userPwd
    }, raw: true, logging: false
  });

  if (checkMember) {
    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: checkMember.id, username: checkMember.username },
      constant.jwtSecret,
      { expiresIn: constant.jwtSecretExp }
    );
    //Send the jwt in the response

    res.send({
      "connexion": true,
      "jwtToken": token,
      "roles": checkMember.role,
      "id": checkMember.id,
      "username": checkMember.username
    });
    return;
  } else {
    console.log("ERROR - function login can not find member with username", username);
    res.send({
      "connexion": false
    });
  }
};

exports.account = async (req, res) => {

  const curentLogin = Jwt.getCurrentLogin(req);
  // Check member exists?
  const checkMember = await Member.findOne({
    where: {
      id: curentLogin.userId
    }, raw: true, logging: false
  });

  if (checkMember) {

    // PLAYER
    let member = {};
    member.id = checkMember.id;
    member.username = checkMember.username;
    member.name = checkMember.name;
    member.roles = checkMember.role;
    member.phoneNumber = checkMember.phoneNumber;
    member.email = checkMember.email;


    res.send({
      "member": member,
      "connexion": true,
      "member_id": checkMember.id,
    });
  } else {
    if (curentLogin && curentLogin.userId) {
      console.log(new Date() + ': Check sync data: Member ' + curentLogin.userId + ' exports.account fail');
    } else {
      console.log(new Date() + ': Check sync data: exports.account fail with curentLogin null');
    }
    res.send({
      "connexion": false
    });
  }
};
