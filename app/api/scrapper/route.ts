import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import asyncRetry from "async-retry";

// Define User-Agent headers
const userAgents = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36"];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = `${searchParams.get("url")}?${Math.random()}`;

  if (!url) {
    return NextResponse.json(
      { error: "Missing URL" },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  try {
    // Select random User-Agent header
    const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    // Define async function to retry
    const fetchUrl = async () => {
      const response = await axios.get(url, {
        headers: {
          "User-Agent": userAgent,
        },
      });
      return response;
    };

    // Retry function 3 times with 1-second delay
    const response = await asyncRetry(fetchUrl, {
      retries: 3,
      minTimeout: 1000,
    });

    if (response.status !== 200) {
      throw new Error(`Non-200 status code: ${response.status}`);
    }

    const html = response.data;
    const $ = cheerio.load(html);

    // Remove unnecessary elements
    $("script, style, iframe, img, canvas, svg, figure, figcaption").remove();

    // Remove empty elements
    $("*")
      .filter(function () {
        return $(this).text().trim() === "";
      })
      .remove();

    // Extract readable text
    const text = $("body")
      .text()
      .replace(/\s+/g, " ")
      .replace(/[^\w\s.,!?-]/g, "")
      .trim();

    return NextResponse.json(
      { content: text },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error: any) {
    console.error(`Error scraping ${url}:`, error.message);
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
