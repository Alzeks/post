'use client'

import React, { useContext } from "react";
import Image from 'next/image'
//import styles from './page.module.css'                   
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {

  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/login");
  }

  return (
    <div >
      Main Page
      <div>React hook form in page Login</div>
    </div>
  )
}

