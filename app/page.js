import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getSession();
  if (session) redirect('/dashboard');

  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      <a href={'/login'}>Login</a>
      <a href={'/signup'}>Signup</a>
    </div>
  );
}
