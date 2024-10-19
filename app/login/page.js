import Login from "@/app/ui/login";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="flex items-center w-screen h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white">
      {" "}
      {/* Center the login form */}
      <div className="m-auto">
        {" "}
        {/* Container for the login form */}
        <Login />
      </div>
    </div>
  );
}
