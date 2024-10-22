import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const inference = new HfInference(process.env.HUGGING_FACE_ACCESS_TOKEN as string);

export async function POST(request: NextRequest) {
  const abortController = new AbortController(); // Create an AbortController instance
  const { signal } = abortController;

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
          if (signal.aborted) {
            // Check if the request was aborted
            controller.error("Request aborted");
            return;
          }
          const content = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(content);
        }
        controller.close();
      },
      cancel() {
        console.log("Stream canceled");
        abortController.abort(); // Trigger abort when the stream is canceled
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
