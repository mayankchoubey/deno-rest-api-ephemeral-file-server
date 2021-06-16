import {DISK_FILE_PATH, CONTENT_TYPE_RAW, RECORD_DELIM} from "./constants.ts";
import {readAll} from "https://deno.land/std/io/mod.ts";
import {exists} from "https://deno.land/std/fs/mod.ts";

function getRecord(type:string, name:string="") {
    return type+RECORD_DELIM+name;
}

function parseRecord(rec:string) {
    const tkns=rec.split(RECORD_DELIM);
    const ret:Record<string,string>={};
    if(tkns[0])
        ret.type=tkns[0];
    if(tkns[1])
        ret.name=tkns[1];
    return ret;
}

export async function store(content:Uint8Array, type:string=CONTENT_TYPE_RAW, name:string="") {
    const id=crypto.randomUUID();
    const f=await Deno.open(DISK_FILE_PATH+'/'+id, {create:true, write:true});
    await f.write(content);
    await f.close();
    localStorage.setItem(id, getRecord(type, name));
    return id;
}

export async function fetch(id:string) {
    const filePath=DISK_FILE_PATH+'/'+id;
    const meta=localStorage.getItem(id);
    if(!meta)
        return;
    localStorage.removeItem(id);
    if(!await exists(filePath))
        return;
    const f=await Deno.open(filePath);
    const content=await readAll(f);
    await f.close();
    await Deno.remove(filePath);
    return {meta: parseRecord(meta), content};
}