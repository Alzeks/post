import { NextResponse } from "next/server";
import { supabase } from "../../../supabase";


export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          name: 'id',
        },
      }, // See the "paths" section below
    ],
    fallback: true, // false or "blocking"
  }
}

export const GET = async (request) => {
 
  try {
    const { data, error } = await supabase.from('comments').select().eq('post_id', '6')

    return new NextResponse(JSON.stringify(data), { status: 200 });
    return new NextResponse(data, { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const { comment, commentator, post_id } = await request.json();
  try {
    const { data: comments, error } = await supabase.from('comments').insert([
      {
        comment,
        commentator,
        post_id
      }
    ])

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};


