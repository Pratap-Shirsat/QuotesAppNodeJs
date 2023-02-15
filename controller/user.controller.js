const { getHashedPassword, generateJWT, validatePassword } = require('../helpers/authentication');
const userServices = require('../services/user.service');
const validateUserSchema = require('./schema/user.schema');

const registerUser = async (req, res) => {
  try {
    /* #swagger.description="Registration of a new user"
      #swagger.summary="API to register a new user"
      #swagger.tags=['User']
      #swagger.parameters['user']={
        description:"user data to store",
        in:"body",
        schema:{$ref:"#/definitions/UserRequest"}
      } */
    const { body: { user } } = req;

    const isValid = validateUserSchema(user);
    if (isValid.code) {
      const finalUser = {};
      const { hash, salt } = getHashedPassword(user.password);
      finalUser.password_hash = hash;
      finalUser.salt = salt;
      finalUser.username = user.username;

      const newUser = await userServices.addNewUser(finalUser);
      const token = generateJWT(newUser.username);
      /* #swagger.responses[200]={
        description: "Created user successfully",
        schema:{$ref:"#/definitions/UserResponse"}
      } */
      return res.status(201).json({ username: newUser.username, token });
    }
    /* #swagger.responses[400]= {
            description: 'validation error',
            schema: {
              $ref: "#/definitions/ValidationResponse"
            }} */
    return res.status(400).send({ error: isValid.errorMessage });
  } catch (error) {
    console.log(error);
    /* #swagger.responses[500]= {
      description: "Unknown server side error",
      schema: { $ref: "#/definitions/ServerSideError" }
    } */
    return res.status(500).send({ message: error?.errors[0]?.message ?? 'Server side error occured!' });
  }
};

const userLogin = async (req, res) => {
  try {
    /* #swagger.description="User login"
      #swagger.summary="API to login by a registered user"
      #swagger.tags=['User']
      #swagger.parameters['user']={
        description:"user data to authenticate credentials",
        in:"body",
        schema:{$ref:"#/definitions/UserRequest"}
      } */
    const { body: { user } } = req;

    const isValid = validateUserSchema(user);
    if (isValid.code) {
      const userData = await userServices.findUserByUsername(user.username);
      if (userData) {
        // authenticate user credentials
        if (validatePassword(userData.salt, userData.password_hash, user.password)) {
          const token = generateJWT(userData.username);
          /* #swagger.responses[200]={
       description: "User successfully logged in",
       schema:{$ref:"#/definitions/UserResponse"}
     } */
          return res.status(200).send({ username: userData.username, token });
        }
        /* #swagger.responses[400]= {
            description: 'validation error',
            schema: {
              $ref: "#/definitions/ValidationResponse"
            }} */
        return res.status(400).send({ error: 'Invalid password' });
      }
      /* #swagger.responses[404]= {
            description: 'User doesnt exists',
            schema: {
              $ref: "#/definitions/ValidationResponse"
            }} */
      return res.status(404).send({ error: `User ${user.username} doesnt exists` });
    }
    return res.status(400).send({ error: isValid.errorMessage });
  } catch (error) {
    console.log(error);
    /* #swagger.responses[500]= {
      description: "Unknown server side error",
      schema: { $ref: "#/definitions/ServerSideError" }
    } */
    return res.status(500).send({ message: 'Server side error occured!' });
  }
};

const getUser = async (req, res) => {
  try {
    /* #swagger.description="Get current user details"
      #swagger.summary="API to get data of logged in user"
      #swagger.tags=['User']
      #swagger.security=[{
        BearerAuth: []
      }] */
    const { auth: { username } } = req;
    const user = await userServices.findUserByUsername(username);

    if (user) {
      /* #swagger.responses[200]={
       description: "User data fetched successfully",
       schema:{$ref:"#/definitions/UserData"}
     } */
      return res.status(200).send({ user });
    }
    /* #swagger.responses[400]= {
            description: 'validation error',
            schema: {
              $ref: "#/definitions/ValidationResponse"
            }} */
    return res.status(400).send({ error: 'Invalid password' });
  } catch (error) {
    console.log(error);
    /* #swagger.responses[500]= {
      description: "Unknown server side error",
      schema: { $ref: "#/definitions/ServerSideError" }
    } */
    return res.status(500).send({ message: 'Server side error occured!' });
  }
};

module.exports = {
  registerUser,
  userLogin,
  getUser,
};
