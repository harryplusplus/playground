import { NextResponse, type NextRequest } from "next/server";
import { KvService } from "@/services/kv";
import { IdempotencyService } from "@/services/idempotency";
import { ResponseService } from "@/services/response";
import { AiService } from "@/services/ai";

export const runtime = "edge";

const kvService = new KvService();
const idempotencyService = new IdempotencyService(kvService);
const aiService = new AiService();
const responseService = new ResponseService(kvService, aiService);

export async function POST(request: NextRequest) {
  const parsedHeadersOrRes = await parsePostRequest(request);
  if (parsedHeadersOrRes instanceof NextResponse) {
    return parsedHeadersOrRes;
  }

  const { messageId, message } = parsedHeadersOrRes;
  if (await idempotencyService.exist(messageId)) {
    return new NextResponse(
      JSON.stringify({ error: "Duplicated Message-Id." }),
      { status: 409 }
    );
  }

  await idempotencyService.add(messageId);
  await responseService.start({ messageId, message });

  return new NextResponse(JSON.stringify({}), { status: 201 });
}

async function parsePostRequest(request: NextRequest) {
  const messageId = request.headers.get("Message-Id");
  if (!messageId) {
    return new NextResponse(
      JSON.stringify({ error: "Message-Id is required." }),
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
    messageId,
    message,
  };
}
