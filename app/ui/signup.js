"use client";
import styles from "./styles/signup.module.css";
import React, { useState, useEffect, createRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import { signupCaptcha } from "./actions";

export default function Signup({ inviteCode }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = Object.fromEntries(searchParams.entries());
    const nameRef = createRef();

    useEffect(() => {
        if (query.error === "invalid-credentials") {
            setError("Invalid credentials");
            setLoading(false);

            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete('error');
            router.replace(`?${newSearchParams.toString()}`, { scroll: false });
        } else if (query.error === "invalid-captcha") {
            setError("Invalid captcha");
            setLoading(false);
        }
    }, [query, router, searchParams]);

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }, [nameRef]);

    return (
        <div className={styles.main} style={{ cursor: loading ? "wait" : "auto" }}>
            <form className={`form ${styles.mainForm}`}
                onSubmit={(e) => {
                    e.preventDefault();

                    const formData = new FormData(e.target);
                    const name = formData.get("name")?.toString() || "";
                    const username = formData.get("username")?.toString() || "";
                    const email = formData.get("email")?.toString() || "";
                    const password = formData.get("password")?.toString() || "";
                    const recaptcha = formData.get("g-recaptcha-response")?.toString() || "";

                    if (name && username && email && password && recaptcha) {
                        setError("");
                        setLoading(true);
                        signupCaptcha(new FormData(e.target));
                    } else {
                        setError("Please fill out all fields");
                    }
                }}>
                {error === "" ? "" : (
                    <div className={styles.formError}>{error}</div>
                )}
                <span className="input-span">
                    <label htmlFor="name" className="label">Name</label>
                    <input ref={nameRef} type="text" name="name" id="name" />
                </span>
                <span className="input-span">
                    <label htmlFor="username" className="label">Username</label>
                    <input type="text" name="username" id="username" />
                </span>
                <span className="input-span">
                    <label htmlFor="email" className="label">Email</label>
                    <input type="email" name="email" id="email" />
                </span>
                <span className="input-span">
                    <label htmlFor="password" className="label">Password</label>
                    <input type="password" name="password" id="password" />
                </span>
                <div className="g-recaptcha" data-theme="dark" data-sitekey="6LcntmUqAAAAAEwJeunKa_EqI2rL6mYEkRuSk4_h"></div>
                <button className="submit" type="submit">{loading ? "Loading..." : "Sign Up"}</button>
                <Script src="https://www.google.com/recaptcha/api.js" async strategy="afterInteractive" defer></Script>
            </form>
        </div>
    );
}