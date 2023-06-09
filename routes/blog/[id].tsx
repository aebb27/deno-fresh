import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost } from "../../utils/posts.ts";
import { CSS } from "https://deno.land/x/gfm@0.2.1/mod.ts";

export const handler: Handlers = {
  async GET(request, context) {
    const { id } = context.params;
    const post = await loadPost(id);
    return context.render({ post });
  },
};

export default function PagePost(props: PageProps) {
  const { post } = props?.data || {};
  return (
    <article class="p-4">
      <h1 class="text-2xl font-bold">{post.title}</h1>
      <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
      <style dangerouslySetInnerHTML={{ __html: CSS }}></style>
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: post.body }}
      >
        {post.body}
      </div>
    </article>
  );
}
