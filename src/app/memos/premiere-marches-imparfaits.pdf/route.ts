import memo from "./memo.json";

export const dynamic = "force-static";
export function GET() {
  return new Response(Buffer.from(memo, "base64"), { headers: { "Content-Type": "application/pdf", "Content-Disposition": 'attachment; filename="premiere-marches-imparfaits.pdf"' } });
}
