import {readableStreamFromIterable} from "https://deno.land/std/io/mod.ts";
import {HEADER_CONTENT_TYPE, HEADER_CONTENT_DISPOSITION, HEADER_CONTENT_DISPOSITION_VAL} from "./constants.ts";

export function sendResponseCode(resp:any, code:number) {
    resp(new Response(undefined, {status: code}));
}

export function sendResponseId(resp:any, code:number, id:string) {
    const respBody=JSON.stringify({id});
    resp(new Response(respBody, {status: code}));
}

export function sendResponseFile(resp:any, code:number, f:any) {
    const headers=new Headers();
    if(f.meta.type)
        headers.set(HEADER_CONTENT_TYPE, f.meta.type);
    if(f.meta.name)
        headers.set(HEADER_CONTENT_DISPOSITION, HEADER_CONTENT_DISPOSITION_VAL+f.meta.name);
    resp(new Response(f.content, {
        status: code,
        headers
    }));
}

export function getQueryParam(url:URL, name:string) {
    const n=url.searchParams.get(name);
    if(!n)
        return "";
    return n;
}

export function getIntegerVal(name:string, defVal:number): number {
    const v=Deno.env.get(name);
    if(v && Number(v))
        return Number(v);
    return defVal;
}

export function getStringVal(name:string, defVal:string): string {
    const v=Deno.env.get(name);
    if(v)
        return v;
    return defVal;
}

export async function getStatus(t:string, k:string, v:string):Promise<boolean> {
    return (await Deno.permissions.query({name: t as Deno.PermissionName, [k]: v})).state === "granted" ? true: false;
};