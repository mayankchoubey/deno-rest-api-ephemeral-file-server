import {PORT, DISK_FILE_PATH} from "./constants.ts";
import {handleRequest} from "./router.ts";
import {getStatus} from "./utils.ts";

if(!await checkSandbox(DISK_FILE_PATH)) {
    console.error('Required read/write/net access is denied, exiting');
    Deno.exit(1);
}

const listener = Deno.listen({ port: PORT });

for await(const conn of listener)
    handleNewConnection(conn);
    
async function handleNewConnection(conn: Deno.Conn) {
    for await(const req of Deno.serveHttp(conn))
        await handleRequest(req.request, req.respondWith);
}

async function checkSandbox(path:string):Promise<boolean> {

    if(!await getStatus('read', 'path', path))
        return false;
    if(!await getStatus('write', 'path', path))
        return false;
    if(!await getStatus('net', 'host', '0.0.0.0:5000'))
        return false;
    if(!window.location)
        return false;
    return true;
}

