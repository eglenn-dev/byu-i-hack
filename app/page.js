import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getSession();
  if (session) redirect('/dashboard');

  return (
    <div className="flex flex-col gap-6 w-full h-screen items-center justify-center p-4">
      <h1 className="text-5xl text-center">Welcome to NeighborView</h1>
      <p className="text-3xl text-center">Keep our neighborhoods safe together</p>
      <a className="pt-2 pb-2 pl-4 pr-4 bg-green-700 rounded-2xl" href={'/login'}>Login</a>
      <a href={'/signup'}>Create an Account</a>
    </div>
  );
}
