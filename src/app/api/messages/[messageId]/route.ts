import { AiService } from "@/services/ai";
import { KvService } from "@/services/kv";
import { ResponseService } from "@/services/response";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const kvService = new KvService();
const aiService = new AiService();
const responseService = new ResponseService(kvService, aiService);

export async function GET(
  request: NextRequest,
  { params }: { params: { messageId: string } }
) {
  const { messageId } = params;

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      request.signal.addEventListener("abort", () => {
        controller.close();
      });

      let attempts = 0;
      while (!request.signal.aborted) {
        const event = await responseService.popEvent(messageId);
        if (event) {
          attempts = 0;
          controller.enqueue(encoder.encode(`data: ${event}\n\n`));
          if (!event.startsWith("m:")) {
            controller.close();
            break;
          }
        } else {
          attempts++;
          if (attempts >= 10) {
            controller.error(new Error("Message is not exist."));
            break;
          } else {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        }
      }
    },
  });

  return new NextResponse(readableStream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
