import Signup from "../ui/signup";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <Signup />
      </div>
    </div>
  );
}
