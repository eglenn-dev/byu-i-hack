import Signup from "../ui/signup";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SignupPage() {
    const session = await getSession();
    if (session) redirect("/dashboard");

    return (
        <div>
            <Signup />
        </div>
    );
}