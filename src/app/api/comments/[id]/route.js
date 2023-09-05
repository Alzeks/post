import { NextResponse } from "next/server";
import { supabase } from "../../../../supabase";

export const GET = async (request) => {
const { searchParams } = new URL(request.url);
const postId = searchParams.get('postId')

//const postNumber = request.url.slice(35, request.url.length)
  try {
    const { data, error } = await supabase.from('comments').select().eq('post_id', postId)
    
    return new NextResponse(JSON.stringify(data), { status: 200 });
    return new NextResponse(data, { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};


