import { Request, Response } from "express";
import { userService } from "./user.service";

class UserController {
  async getUsers(_: Request, response: Response) {
    const result = await userService.getUsers();
    response.status(result.statusCode).json(result);
  }
}

export const userController = new UserController();
