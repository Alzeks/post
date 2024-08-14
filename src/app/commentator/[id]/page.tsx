'use client'

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from '@/supabase/index'

interface IParams { params: { id: number } }

const BlogPost: React.FC<IParams> = ({ params },{comments}) => {
  const [data, setData] = useState([]);
  const [dataComments, setDataComents] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {

      const comment = await fetch(`/api/comments/${params.id}?postId=${params.id}`, {
        cache: "no-store",
      });

      if (!comment.ok) { setErr(true) }
      const postComments = await comment.json()

      setData(postComments);

      setIsLoading(false);
    };
    getData()
  }, []);

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const post_id = params.id
    const commentator = null
    const comment = e.target[1].value;
    const context = e.target[0].value;

    try {
      await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          post_id, comment, commentator
        }),
      });
      e.target.reset()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}><div>
      <div className={styles.top}>
        <div className={styles.info}>

          <div >{data.map((comment: any) => <div key={comment.id} className={styles.comment}>
            {comment.comment}
            </div>)}
            </div>
          {/* <h2 className={styles.title}>{'Your comment to shosen post'}</h2> */}
        </div>
      </div>

      <div className={styles.content}></div>

    </div>

      <div className={styles.addComment}>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Comment</h1>
          <input type="text" placeholder="author" className={styles.input} />
          <textarea
            placeholder="Comment"
            className={styles.textArea}
          //cols="30" rows="10"
          ></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default BlogPost;

// export async function getStaticProps(){
//   let {data: comments, error} =await supabase.from('comments').select('*')
//   console.log(comments);
  
//   return {
//     props: {comments: 8},
//   }
// }
