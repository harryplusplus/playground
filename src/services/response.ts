import { AiService } from "./ai";
import { KvService } from "./kv";

export class ResponseService {
  #kv: KvService;
  #ai: AiService;

  constructor(kv: KvService, ai: AiService) {
    this.#kv = kv;
    this.#ai = ai;
  }

  async sendMessage(input: { messageId: string; message: string }) {
    const { messageId, message } = input;
    const stream = await this.#ai.sendMessage({ message });

    const task = async () => {
      try {
        for await (const chunk of stream) {
          const text =
            chunk.candidates?.at(0)?.content?.parts?.at(0)?.text ?? "";
          if (!text) continue;
          await this.#kv.push(this.#redisKey(messageId), `m:${text}`);
        }
        await this.#kv.push(this.#redisKey(messageId), `c:`);
      } catch (e) {
        await this.#kv.push(
          this.#redisKey(messageId),
          `e:${JSON.stringify(e)}`
        );
      }
    };

    task();
  }

  #redisKey(messageId: string) {
    return `response:${messageId}`;
  }
}
