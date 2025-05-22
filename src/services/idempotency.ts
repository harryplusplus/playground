import { KvService } from "./kv";

export class IdempotencyService {
  #kv: KvService;

  constructor(kv: KvService) {
    this.#kv = kv;
  }

  async exist(idempotencyKey: string) {
    const value = await this.#kv.get(this.#redisKey(idempotencyKey));
    return value !== null;
  }

  async add(idempotencyKey: string) {
    await this.#kv.set(this.#redisKey(idempotencyKey), "1");
  }

  #redisKey(idempotencyKey: string) {
    return `idempotency-key:${idempotencyKey}`;
  }
}
