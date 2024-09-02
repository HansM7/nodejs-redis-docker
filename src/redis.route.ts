import express, { Request, Response } from "express";
import { redisService } from "./redis/redis.service";

const routerRedis = express.Router();

const prefix = "/redis";

routerRedis.get(prefix, async (_: Request, response: Response) => {
  const result = await redisService.isActive();
  console.log(result);
  response.status(200).json({ result });
});

export default routerRedis;
