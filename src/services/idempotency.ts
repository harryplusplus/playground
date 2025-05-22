import { KvService } from "./kv";

export class IdempotencyService {
  #kv: KvService;

  constructor(kv: KvService) {
    this.#kv = kv;
  }

  async exist(messageId: string) {
    const value = await this.#kv.get(this.#redisKey(messageId));
    return value !== null;
  }

  async add(messageId: string) {
    await this.#kv.set(this.#redisKey(messageId), "1");
  }

  #redisKey(messageId: string) {
    return `idempotency:${messageId}`;
  }
}
