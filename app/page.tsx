import { scrapWebsite } from "@/lib/scrapper";
import Image from "next/image";

export default async function Home() {
  const result = await scrapWebsite("https://en.wikipedia.org/wiki/Large_language_model");
  // console.log("result", result);

  return <main className="bg-gradient-to-br from-red-400 to-blue-400 w-full h-full"></main>;
}
