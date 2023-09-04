import { NextResponse } from "next/server";
import { supabase } from "../../../supabase";

export const GET = async (request) => {

  try {
    let { data, error } = await supabase
      .from('posts')
      .select('*')
    
    return new NextResponse(JSON.stringify(data), { status: 200 });
    return new NextResponse(data, { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const { title, author, context } = await request.json();

  try {
    const { data, error } = await supabase.from('posts').insert([
      {
        title: title,
        author: author,
        context: context,
      }
    ])
      .select()

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

