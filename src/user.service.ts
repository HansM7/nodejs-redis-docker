import { redisService } from "./redis/redis.service";
import { userDB } from "./user.db";

class UserService {
  async getUsers() {
    try {
      // En caso este sea un servicio que haga una petición a una base de datos, se puede usar await
      const users = await userDB;

      const data = await redisService.getCache("users");

      console.log(data);

      if (data) {
        return {
          statusCode: 200,
          message: "All users",
          data: JSON.parse(data),
        };
      }

      // despues de 10 segundos, el cache se eliminará
      await redisService.setCache("users", users, { expiration: 10000 });

      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });

      return {
        statusCode: 200,
        message: "All users",
        data: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Internal Server Error",
        data: error,
      };
    }
  }
}

export const userService = new UserService();
