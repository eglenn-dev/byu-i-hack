import Login from "@/app/ui/login"
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getSession();
    if (session) redirect("/dashboard");

    return (
        <div>
            <Login />
        </div>
    );
}