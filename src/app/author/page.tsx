"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
//import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface dataType {
  id: number,
  title: string,
  author: string,
  context: string
}

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
        const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store",
      });

      if (!res.ok) {setErr(true)}

      const data = await res.json()
          setData(data)
    
      setIsLoading(false);
    };
    getData()
  }, []);

  const session = useSession();
  const router = useRouter();
  
  //NEW WAY TO FETCH DATA
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data, mutate, error, isLoading } = useSWR(
  //   `/api/posts?username=${session?.data?.user.name}`,
  //   fetcher
  // );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

   if (session.status === "unauthenticated") {
     router?.push("/login");
   }

   const handleSubmit = async (e: React.BaseSyntheticEvent) => { 
    e.preventDefault();
    const title = e.target[0].value;
    const author = e.target[1].value;
    const img = e.target[2].value;
    const context = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title, author, context,
        }),
      });
      
      e.target.reset()
    } catch (err) {
      console.log(err);
    }
   };

   const handleDelete = async (id: string) => {
    // try {await fetch(`/api/posts/${id}`, {method: "DELETE",});  // mutate(); } catch (err) {   console.log(err) }
   };

  if (session.status === "authenticated") {

    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? "loading"
            : 
            data?.map((post: dataType) => (
              
                <div className={styles.post} key={post.id}>
            
                  <h4 className={styles.postTitle}>Title: {post.title}</h4>
                <h5 className={styles.postTitle}>author: {post.author}</h5>
                  <p>post: {post.context}</p>
                  {/* <span className={styles.delete}onClick={() => handleDelete(post._id)}> X</span> */}
                </div>
              ))
             } 
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input type="text" placeholder="Author" className={styles.input} />
          <input type="text" placeholder="Image url" className={styles.input} />
          <textarea
            placeholder="Content"
            className={styles.textArea}
             //cols="30" rows="10"
          ></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
 };

export default Dashboard;
