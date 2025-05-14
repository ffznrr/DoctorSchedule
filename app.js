require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const router = require("./router/index");
const ErrorHandling = require("./middleware/ErrorHandling");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
    },
  },
  apis: ["./*.js"],
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Credentials:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Unique username chosen by the user
 *         password:
 *           type: string
 *           format: password
 *           description: User’s password
 *       example:
 *         username: johndoe
 *         password: secret123
 */

/**
 * @swagger
 * api/Auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Credentials'
 *     responses:
 *       '201':
 *         description: Success Create Account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Auto-generated user ID
 *                 username:
 *                   type: string
 *                   description: The registered username
 *               example:
 *                 id: 42
 *                 username: johndoe
 *       '400':
 *         description: Bad request — e.g. username already exists or missing fields
 */

/**
 * @swagger
 * api/Auth/login:
 *   post:
 *     summary: Login with username and password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Credentials'
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT access token
 *                 message:
 *                   type: string
 *                   description: Login Success
 *               example:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6Im1hbWFuZ2tldXMiLCJyb2xlIjoiVXNlciIsImlhdCI6MTc0NzIxNDQ0MX0.sz2QZR33zF8P4M94fhWWFhEJIy_1hgpafp_7Ga_8fq4"
 *                 message: "Login Success"
 *       '401':
 *         description: Unauthorized — Username/Password Salah
 */

/**
 * @swagger
 * tags:
 *   - name: Schedule
 *     description: Operations related to fetching and managing schedules
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Schedule record ID
 *         doctor_id:
 *           type: integer
 *           description: Associated doctor’s ID
 *         day:
 *           type: string
 *           description: Day of the week
 *         time_start:
 *           type: string
 *           description: Start time (HH:mm)
 *         time_finish:
 *           type: string
 *           description: Finish time (HH:mm)
 *         quota:
 *           type: integer
 *           description: Max number of appointments
 *         status:
 *           type: boolean
 *           description: Whether schedule is active
 *         doctor_name:
 *           type: string
 *           description: Doctor’s full name
 *         date:
 *           type: string
 *           format: date-time
 *           description: Timestamp of record creation
 *       example:
 *         id: 1
 *         doctor_id: 1
 *         day: "senin"
 *         time_start: "13:00"
 *         time_finish: "14:00"
 *         quota: 10
 *         status: true
 *         doctor_name: "Dr. Fauzan Ramadhana"
 *         date: "2025-05-13T20:42:11.865Z"
 *
 *     PaginatedScheduleResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Success Fetch Data"
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Schedule'
 *         totalCount:
 *           type: integer
 *           example: 4
 *         totalPages:
 *           type: integer
 *           example: 1
 *         currentPage:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 */

/**
 * @swagger
 * /api/Schedule/view:
 *   get:
 *     summary: View all schedules (paginated)
 *     tags:
 *       - Schedule
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/AuthHeader'
 *     responses:
 *       '200':
 *         description: Success Fetch Data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedScheduleResponse'
 *       '401':
 *         description: Unauthorized – missing or invalid JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateScheduleRequest:
 *       type: object
 *       required:
 *         - time_start
 *         - time_finish
 *         - status
 *         - doctorId
 *         - date_range
 *       properties:
 *         time_start:
 *           type: string
 *           description: Start time (HH:mm)
 *           example: "13:00"
 *         time_finish:
 *           type: string
 *           description: Finish time (HH:mm)
 *           example: "14:00"
 *         status:
 *           type: boolean
 *           description: Whether schedule is active
 *           example: false
 *         doctorId:
 *           type: integer
 *           description: ID of the doctor
 *           example: 1
 *         date_range:
 *           type: array
 *           description: Array with start and end date (YYYY-MM-DD)
 *           items:
 *             type: string
 *             format: date
 *           example: ["2025-11-21","2025-11-21"]
 *
 *   parameters:
 *     AuthHeader:
 *       in: header
 *       name: Authorization
 *       description: "Bearer JWT token, format: Bearer {token}"
 *       required: true
 *       schema:
 *         type: string
 *         example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/Schedule/create:
 *   post:
 *     summary: Create schedule entries for a given date range
 *     tags:
 *       - Schedule
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/AuthHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateScheduleRequest'
 *     responses:
 *       '200':
 *         description: Jadwal berhasil dibuat untuk rentang tanggal yang diberikan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Jadwal berhasil dibuat untuk rentang tanggal yang diberikan."
 *       '400':
 *         description: Bad request — Kesalahan terdapat di pemilihan waktu atau format input salah
 *       '401':
 *         description: Unauthorized — missing or invalid JWT
 */

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);
app.use(ErrorHandling);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
