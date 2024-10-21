import axios from "axios";
import * as cheerio from "cheerio";
// const cheerio = require("cheerio");

export async function scrapWebsite(url: string) {
  try {
    // Fetch the website content
    const response = await axios.get(url);

    const html = response.data;

    // Load the HTML content into cheerio
    const $ = cheerio.load(html);

    // Remove script and style tags
    $("script, style").remove();

    // Get the text content and remove extra whitespace
    const rawText = $("body").text().replace(/\s+/g, " ").trim();
    // console.log("raw", rawText);

    return rawText;
  } catch (error: any) {
    console.error("Error scraping website:", error.message);
    return null;
  }
}

// Client-side function to fetch scraped content via API  async function scrapWebsiteRefactor(url: string, filter?: boolean) {
export async function scrapWebsiteRefactor(url: string, filter?: boolean) {
  try {
    // Send a GET request to your Next.js API route with axios
    const response = await axios.get(`/api/scrapper`, {
      params: {
        url: url,
        filter: filter ? "true" : "false", // Send filter as a query parameter
      },
    });

    // Check if response is successful
    if (response.status !== 200) {
      throw new Error(`Error fetching scraped content: ${response.statusText}`);
    }

    // Return the scraped content
    return response.data;
  } catch (error: any) {
    console.error("Error fetching scraped content:", error.message);
    return null;
  }
}
