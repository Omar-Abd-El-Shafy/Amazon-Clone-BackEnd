//route associated with "/user" in server
const express = require("express");
const userRoute = express.Router();
//controller
const userController = require("../controllers/userController");
//midllewares
const auth = require("../MiddleWare/auth");
const isAdmin = require("../MiddleWare/adminAuth");
const {
  registerValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  loginValidator,
  updateUserValidator,
  pageValidator,
} = require("../MiddleWare/validators");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user _id
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         phone:
 *           type: string
 *         role:
 *           type: boolean
 *       required:
 *         - id
 *         - name
 *         - email
 *         - password
 *         - phone
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Creates new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               confirm_password:
 *                 type: string
 *                 format: password
 *               phone:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirm_password
 *               - phone
 *           example:
 *             name: user name
 *             email: user@gmail.com
 *             password: Password@123
 *             confirm_password: Password@123
 *             phone: "01012345678"
 *     responses:
 *       '201' :
 *         description: Created
 *         headers:
 *           x-access-token:
 *             schema:
 *               type: string
 *             description: the user token
 *       '409' :
 *         description: Email or Phone already exists
 */
userRoute.post("/register", registerValidator, userController.register);

/**
 * @swagger
 * /user/forgotPassword:
 *   post:
 *     summary: Creates new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             required:
 *               - email
 *           example:
 *             email: user@gmail.com
 *     responses:
 *       '200' :
 *         description: Password reset link sent to your email account
 *       '409' :
 *         description: User with given email does not exist
 */
userRoute.post(
  "/forgotPassword",
  forgotPasswordValidator,
  userController.forgotPassword
);

/**
 * @swagger
 * /user/password-reset/{id}/{token}:
 *   get:
 *     summary: Checks if valid url when user forgets password
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user _id
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         required: true
 *         description: The user token
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: Valid Url
 *       '400' :
 *         description: Invalid link
 */
userRoute.get(
  "/password-reset/:id/:token",
  auth,
  userController.resetPasswordStart
);

/**
 * @swagger
 * /user/password-reset/{id}/{token}:
 *   post:
 *     summary: Resets password when user forgets password
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user _id
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         required: true
 *         description: The user token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *               confirm_password:
 *                 type: string
 *                 format: password
 *             required:
 *               - password
 *               - confirm_password
 *           example:
 *             password: Password@123
 *             confirm_password: Password@123
 *     responses:
 *       '200' :
 *         description: Password reset successfully
 *       '400' :
 *         description: Invalid link
 */
userRoute.post(
  "/password-reset/:id/:token",
  auth,
  resetPasswordValidator,
  userController.resetPasswordSubmit
);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login by email or phone
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                   password:
 *                     type: string
 *                     format: password
 *                 required:
 *                   - email
 *                   - password
 *               - type: object
 *                 properties:
 *                   phone:
 *                     type: string
 *                   password:
 *                     type: string
 *                     format: password
 *                 required:
 *                   - phone
 *                   - password
 *           examples:
 *             email:
 *               value:
 *                 email: user@gmail.com
 *                 password: Password@123
 *             phone:
 *               value:
 *                 phone: "01012345678"
 *                 password: Password@123
 *     responses:
 *       '200' :
 *         description: Login success
 *         headers:
 *           x-access-token:
 *             schema:
 *               type: string
 *             description: the user token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                 role:
 *                   type: boolean
 *       '400' :
 *         description: Invalid Credentials
 */
userRoute.post("/login", loginValidator, userController.login);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Returns user profile
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: The user token
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: The user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 phone:
 *                   type: string
 *       '404' :
 *         description: User not found
 */
userRoute.get("/", auth, userController.getUserProfile);

/**
 * @swagger
 * /user/allUsers:
 *   get:
 *     summary: Returns all users [valid to admin only]
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: The admin token
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: The number of page to display reviews
 *       - in: query
 *         name: itemsPerPage
 *         schema:
 *           type: integer
 *           default: 8
 *         description: The number of items to display in page
 *     responses:
 *       '200' :
 *         description: The users list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRoute.get("/allUsers", isAdmin, pageValidator, userController.getAllUsers);

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Deletes a user account
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: The user token
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: Deleted
 */
userRoute.delete("/", auth, userController.deleteAccount);

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Updates user name or email or phone
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: The user token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Requires user name or email or phone
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                 required:
 *                   - name
 *               - type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                 required:
 *                   - email
 *               - type: object
 *                 properties:
 *                   phone:
 *                     type: string
 *                 required:
 *                   - phone
 *           examples:
 *             name:
 *               value:
 *                 name: new name
 *             email:
 *               value:
 *                 email: user@gmail.com
 *             phone:
 *               value:
 *                 phone: "01012345678"
 *     responses:
 *       '200' :
 *         description: Profile updated
 */
userRoute.put("/", auth, updateUserValidator, userController.updateProfile);

/**
 * @swagger
 * /user/password:
 *   put:
 *     summary: Updates user password
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: The user token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Requires the password and confirm_password
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *               confirm_password:
 *                 type: string
 *                 format: password
 *             required:
 *               - password
 *               - confirm_password
 *           example:
 *             password: Password@123
 *             confirm_password: Password@123
 *     responses:
 *       '200' :
 *         description: Password updated
 */
userRoute.put(
  "/password",
  auth,
  resetPasswordValidator,
  userController.updatePassword
);

module.exports = userRoute;
