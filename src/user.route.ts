import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

const prefix = "/users";

router.get(`${prefix}`, userController.getUsers);

export default router;
