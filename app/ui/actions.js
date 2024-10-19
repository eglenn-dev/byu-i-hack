"use server";
import {
    checkUniqueEmail,
    createUserIfUnique,
    getUsernameByKey,
} from "@/model/accounts-model";
import { login } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export async function loginCaptcha(formData) {
    const responseToken = formData.get("g-recaptcha-response");
    if (responseToken === "") return "";
    const response = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${process.env.CAPTCHA_SECRET_KEY}&response=${responseToken}`,
        }
    );
    const data = await response.json();
    if (
        data.success &&
        (data.hostname === process.env.DEV_DOMAIN ||
            data.hostname === process.env.MAIN_DOMAIN)
    ) {
        const response = await login(formData);
        if (!response) return "Invalid credentials";
        if (response.status === 200) {
            return;
        } else if (response.status === 401) {
            redirect("/?error=invalid-credentials");
        }
    } else {
        redirect("/?error=invalid-captcha");
    }
}

export async function signupCaptcha(formData) {
    const responseToken = formData.get("g-recaptcha-response");
    if (responseToken === "") return "";
    const response = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${process.env.CAPTCHA_SECRET_KEY}&response=${responseToken}`,
        }
    );
    const data = await response.json();
    if (
        data.success &&
        (data.hostname === process.env.DEV_DOMAIN ||
            data.hostname === process.env.MAIN_DOMAIN) &&
        (await checkUniqueEmail(formData.get("email")?.toString() || ""))
    ) {
        await createUserIfUnique(
            formData.get("email")?.toString() || "",
            formData.get("username")?.toString() || "",
            formData.get("name")?.toString() || "",
            formData.get("password")?.toString() || ""
        );
        await login(formData);
    }
}

export async function deleteUserPost(postKey) {
    const session = await getSession();
    if (!session) return;
    const postUserKey = await getPostUser(postKey);
    const postUsername = await getUsernameByKey(postUserKey);
    if (session.user.username !== postUsername) return;
    await deletePost(session?.user.username, postKey);
}

export async function getRating(postKey) {
    return await getAverageRating(postKey);
}
