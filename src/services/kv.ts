import { Redis } from "@upstash/redis";

const daySeconds = 24 * 60 * 60;

export class KvService {
  #redis = Redis.fromEnv();

  async get(key: string) {
    return await this.#redis.get<string>(key);
  }

  async set(key: string, value: string) {
    return await this.#redis.set<string>(key, value, { ex: daySeconds });
  }

  async push(key: string, value: string) {
    await this.#redis.rpush(key, value);
    await this.#redis.expire(key, daySeconds);
  }

  async pop(key: string) {
    return await this.#redis.lpop<string>(key, 1);
  }
}
