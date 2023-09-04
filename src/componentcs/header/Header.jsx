'use client'


import Link from 'next/link'
import styles from './header.module.css'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const session = useSession();
  const router = useRouter();
  const login = () => {
    router.push('/login')
  }
  const getout = () => {
    router.push('/')
    signOut();
    
  }
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>Posttask</Link>
      <div className={styles.links}>

        {session.status === 'anauthenticated' && <button onClick={login}>Login</button>}

        {session.status === 'authenticated' && (
          <div>
            {
               session?.data?.user[0]?.isAuthor ? < Link href={'/author'}>Author </Link> :
              //session?.data?.user.isAuthor ? < Link href={'/author'}>Author </Link> :
                < Link href={'/commentator'}>Commentator </Link>
            }
            <button onClick={getout}>LogUot</button>
          </div>
        )}
      </div>
    </div>
  )
}
