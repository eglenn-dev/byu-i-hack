import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import SubmissionForm from "@/app/ui/submissionForm";

export default async function FormPage() {
    const session = await getSession();
    if (!session) return redirect("/login");

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-5xl m-10 font-bold">Report Form</h1>
            <div className="text-center mb-6">Please be aware that these form submissions are not public, and all data used is slightly modified to hide identity.</div>
            <SubmissionForm />
        </div>
    );
}  