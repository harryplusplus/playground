import { KvService } from "./kv";

export class SessionService {
  #kv: KvService;

  constructor(kv: KvService) {
    this.#kv = kv;
  }

  async refresh(sessionId: string) {
    const value = await this.#kv.get(this.#redisKey(sessionId));
    if (value === null) {
      await this.#kv.set(this.#redisKey(sessionId), "1");
    } else {
      await this.#kv.expire(this.#redisKey(sessionId));
    }
  }

  #redisKey(sessionId: string) {
    return `session-id:${sessionId}`;
  }
}
