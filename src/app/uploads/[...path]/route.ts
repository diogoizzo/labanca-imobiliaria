import fs from "node:fs";
import path from "node:path";

// MIME básico por extensão
const MIME: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".avif": "image/avif",
};

// Se seus arquivos estão em /app/public/uploads (volume montado):
const UPLOAD_ROOT = "/app/public/uploads";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const rel = ((await params)?.path ?? []).join("/");
    // evita path traversal
    const filePath = path.join(UPLOAD_ROOT, rel);
    if (!filePath.startsWith(UPLOAD_ROOT)) {
        return new Response("Forbidden", { status: 403 });
    }
    try {
        const stat = fs.statSync(filePath);
        if (!stat.isFile()) return new Response("Not found", { status: 404 });

        const ext = path.extname(filePath).toLowerCase();
        const type = MIME[ext] || "application/octet-stream";
        const stream = fs.createReadStream(filePath);

        return new Response(stream as any, {
            headers: {
                "Content-Type": type,
                "Content-Length": String(stat.size),
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch {
        return new Response("Not found", { status: 404 });
    }
}

// (opcional) responder HEAD corretamente
export async function HEAD(
    _req: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const rel = ((await params)?.path ?? []).join("/");
    const filePath = path.join(UPLOAD_ROOT, rel);
    try {
        const stat = fs.statSync(filePath);
        if (!stat.isFile()) return new Response(null, { status: 404 });
        const ext = path.extname(filePath).toLowerCase();
        const type = MIME[ext] || "application/octet-stream";
        return new Response(null, {
            headers: {
                "Content-Type": type,
                "Content-Length": String(stat.size),
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch {
        return new Response(null, { status: 404 });
    }
}
