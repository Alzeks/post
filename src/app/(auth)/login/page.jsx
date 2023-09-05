"use client";
//REACT HOOK FORM IS HEAR
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Login = ({ url }) => {
  const session = useSession();
  const router = useRouter();
  const { register, formState: { errors }, handleSubmit } = useForm()
console.log(session);
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "authenticated" && session?.data?.user[0]) {
    router?.push("/");
  }
  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;

    signIn("credentials", {
      email,
      password,
    });
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>Please sign in to see yure page</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      
        <label> Email:
          <input className={styles.input}
            {...register("email", {
              required: 'required',
              minLength: { value: 3, message: 'minLength 3' }
            }
            )}
          />
          <div style={{ color: 'red' }}>{errors?.email && <p> {errors?.email.message}</p>}</div>
        </label>
        <label> password:
          <input className={styles.input}
            {...register("password", {
              required: 'reqired ',
              minLength: { value: 3, message: 'minLength 3' }
            }
            )}
          />
        </label>
        <div style={{ color: 'red' }}>{errors?.password && <p> {errors?.password.message}</p>}</div>
        <button className={styles.button}>Login</button>
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        Login with Google
      </button>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/register">
        Create new account
      </Link>

    </div>
  );
};              

export default Login;
