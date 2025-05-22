import { NextResponse, type NextRequest } from "next/server";
import { KvService } from "@/services/kv";
import { IdempotencyService } from "@/services/idempotency";
import { SessionService } from "@/services/session";
import { AiService } from "@/services/ai";

export const runtime = "edge";

const kvService = new KvService();
const idempotencyService = new IdempotencyService(kvService);
const sessionService = new SessionService(kvService);
const aiService = new AiService();

export async function POST(request: NextRequest) {
  const parsedHeadersOrRes = await parsePostRequest(request);
  if (parsedHeadersOrRes instanceof NextResponse) {
    return parsedHeadersOrRes;
  }

  const { idempotencyKey, sessionId, message } = parsedHeadersOrRes;
  if (await idempotencyService.exist(idempotencyKey)) {
    return new NextResponse(
      JSON.stringify({ error: "Duplicated Idempotency-Key." }),
      { status: 409 }
    );
  }

  await idempotencyService.add(idempotencyKey);
  await sessionService.refresh(sessionId);

  const stream = await aiService.sendMessage({ message });

  const receive = async () => {
    for await (const chunk of stream) {
      const text = chunk.candidates?.at(0)?.content?.parts?.at(0)?.text ?? "";
      if (!text) continue;
      // TODO: add to db
      console.log("@", text);
    }
  };

  receive().catch(console.error);

  return new NextResponse(JSON.stringify({}), { status: 201 });
}

async function parsePostRequest(request: NextRequest) {
  const idempotencyKey = request.headers.get("Idempotency-Key");
  if (!idempotencyKey) {
    return new NextResponse(
      JSON.stringify({ error: "Idempotency-Key is required." }),
      { status: 400 }
    );
  }

  const sessionId = request.headers.get("Session-Id");
  if (!sessionId) {
    return new NextResponse(
      JSON.stringify({ error: "Session-Id is required." }),
      { status: 400 }
    );
  }

  const body = await request.json();
  if (!("message" in body)) {
    return new NextResponse(
      JSON.stringify({ error: "message property is required." }),
      {
        status: 400,
      }
    );
  }

  const { message } = body;
  if (typeof message !== "string") {
    return new NextResponse(
      JSON.stringify({ error: "message property is must string." }),
      {
        status: 400,
      }
    );
  }

  return {
    idempotencyKey,
    sessionId,
    message,
  };
}

// export async function GET(request: NextRequest) {
//   return new NextResponse(readableStream, {
//     status: 200,
//     headers: {
//       "Content-Type": "text/event-stream",
//       "Cache-Control": "no-cache, no-transform",
//       Connection: "keep-alive",
//       "Transfer-Encoding": "chunked",
//     },
//   });
// }
