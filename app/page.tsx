import Image from "next/image";
import Login from "./components/Login";

export default async function Home() {
  return (
    <main className="bg-gradient-to-br from-red-400 to-blue-400 w-full h-full">
      <Login />
    </main>
  );
}
