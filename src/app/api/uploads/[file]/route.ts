import { readLocalUpload } from "@/lib/storage";

/** Serves product photos uploaded to local disk (development / self-hosting only). */
export async function GET(_request: Request, context: RouteContext<"/api/uploads/[file]">) {
  const { file } = await context.params;
  const upload = await readLocalUpload(file);
  if (!upload) return new Response("Not found", { status: 404 });

  return new Response(upload.data, {
    headers: {
      "Content-Type": upload.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
