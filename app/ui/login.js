"use client";
import React, { useState, useEffect, createRef } from "react";
import Script from "next/script";
import { useSearchParams, useRouter } from "next/navigation";
import { loginCaptcha } from "./actions";
import styles from "./styles/login.module.css";

export default function Login(style) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = Object.fromEntries(searchParams.entries());
    const emailRef = createRef();

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
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, [emailRef]);

    return (
        <div className={styles.main} style={{ ...style.style, cursor: loading ? "wait" : "auto" }}>
            <form className={`form ${styles.form}`}
                onSubmit={(e) => {
                    e.preventDefault();

                    const formData = new FormData(e.target);
                    const email = formData.get("email")?.toString() || "";
                    const password = formData.get("password")?.toString() || "";
                    const recaptcha = formData.get("g-recaptcha-response")?.toString() || "";

                    if (email && password && recaptcha) {
                        setError("");
                        setLoading(true);
                        loginCaptcha(new FormData(e.target));
                    } else {
                        setError("Please fill out all fields");
                    }
                }}>
                {error === "" ? "" : (
                    <div className={styles.formError}>{error}</div>
                )}
                <span className="input-span">
                    <label htmlFor="email" className="label">Email</label>
                    <input ref={emailRef} required type="email" name="email" id="email" />
                </span>
                <span className="input-span">
                    <label htmlFor="password" className="label">Password</label>
                    <input required type="password" name="password" id="password" />
                </span>
                <div className="g-recaptcha" data-theme="dark" data-sitekey="6LcntmUqAAAAAEwJeunKa_EqI2rL6mYEkRuSk4_h"></div>
                <button className="submit" type="submit">{loading ? "Loading..." : "Login"}</button>
            </form>
            <Script src="https://www.google.com/recaptcha/api.js" async strategy="afterInteractive" defer></Script>
        </div>
    );
}