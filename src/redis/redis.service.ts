import { createClient } from "redis";

// Se crea una instancia de redis con la url de conexión, en mi caso desde docker
const client = createClient({ url: "redis://localhost:6379" });

class RedisService {
  async setCache(
    key: string,
    value: unknown,
    options: { expiration?: number } = {}
  ) {
    try {
      await this.connectToClient();
      await client.set(key, JSON.stringify(value), {
        PX: options.expiration,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCache(key: string) {
    try {
      await this.connectToClient();
      const data = await client.get(key);
      if (!data) return null;
      return data;
    } catch (error) {
      return null;
    }
  }

  async connectToClient() {
    if (!client.isReady && !client.isOpen) {
      await client.connect();
    }
  }

  async isActive() {
    try {
      await this.connectToClient();
      await client.ping();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const redisService = new RedisService();
