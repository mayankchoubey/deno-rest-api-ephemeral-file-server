import {Status} from "https://deno.land/std/http/http_status.ts"
import {HEADER_CONTENT_LENGTH, HEADER_CONTENT_TYPE, PARAM_FILE_NAME, PARAM_ID} from "./constants.ts";
import {sendResponseCode, sendResponseId, sendResponseFile, getQueryParam} from "./utils.ts";
import {fetch, store} from "./service.ts";
import {readerFromStreamReader} from "https://deno.land/std/io/mod.ts";
import {readAll} from "https://deno.land/std/io/mod.ts";

export async function getFile(req: Request, resp: any) {
    const u=new URL(req.url);
    const id=getQueryParam(u, PARAM_ID);
    if(!id)
        return sendResponseCode(resp, Status.BadRequest);
    const f=await fetch(id);
    if(!f)
        return sendResponseCode(resp, Status.NotFound);
    sendResponseFile(resp, Status.OK, f);
}

export async function saveFile(req: Request, resp: any) {
    if(!checkContentLength(req.headers))
        return sendResponseCode(resp, Status.BadRequest);
    if(!req.body)
        return sendResponseCode(resp, Status.BadRequest);
    const content=await getReqBody(req.body);
    if(!content)
        return sendResponseCode(resp, Status.BadRequest);
    const u=new URL(req.url);
    const id=await store(content, getContentType(req.headers), getQueryParam(u, PARAM_FILE_NAME));
    return sendResponseId(resp, Status.Created, id);
}

async function getReqBody(reqBody:ReadableStream):Promise<Uint8Array|undefined> {
    if(!reqBody)
        return;
    const sr=reqBody.getReader();
    if(!sr)
        return;
    const dr=readerFromStreamReader(sr);
    return await readAll(dr);
}

function checkContentLength(headers:Headers):boolean {
    if(!headers.get(HEADER_CONTENT_LENGTH))
        return false;
    return true;
}

function getContentType(headers:Headers):string {
    return headers.get(HEADER_CONTENT_TYPE) || "";
}