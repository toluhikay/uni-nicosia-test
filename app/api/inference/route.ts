import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const inference = new HfInference(process.env.HUGGING_FACE_ACCESS_TOKEN as string);

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid input, messages should be an array." }, { status: 400 });
    }

    const stream = inference.chatCompletionStream({
      model: "microsoft/Phi-3-mini-4k-instruct",
      messages,
      max_tokens: 500,
    });

    const readableStream = new ReadableStream({
      async pull(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(content); // Remove 'data: ' prefix
        }
        controller.close(); // Close the stream when done
      },
      cancel() {
        console.log("Stream canceled");
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error during inference:", error);
    return NextResponse.json({ error: "Error during inference" }, { status: 500 });
  }
}
