import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import SubmissionForm from "@/app/ui/submissionForm";

export default async function FormPage() {
    const session = await getSession();
    if (!session) return redirect("/login");

    return (
        <div>
            <h1>Completion Form</h1>
            <SubmissionForm />
        </div>
    );
}  