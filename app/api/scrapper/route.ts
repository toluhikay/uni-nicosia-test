// app/api/scrape/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

// This function will handle the scraping on the server - as cors error does not allow me to hit the server directly from my localhost
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); // Extract query params
  const url = searchParams.get("url");
  const filter = searchParams.get("filter");

  console.log("URL:", url);
  console.log("Filter:", filter);

  if (!url) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  try {
    // Fetch the website content
    const response = await axios.get(url);

    const html = response.data;

    // Load the HTML content into cheerio
    const $ = cheerio.load(html);

    // If filter is true, remove script and style tags
    if (filter === "true") {
      $("script, style").remove();
    }

    // Get the text content and remove extra whitespace
    const rawText = $("body").text().replace(/\s+/g, " ").trim();

    // Return the scraped content as JSON
    return NextResponse.json({ content: rawText });
  } catch (error: any) {
    console.error("Error scraping website:", error.message);
    return NextResponse.json({ error: "Error scraping website" }, { status: 500 });
  }
}
