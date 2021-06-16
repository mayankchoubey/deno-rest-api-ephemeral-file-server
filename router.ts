import { Status } from "https://deno.land/std/http/http_status.ts"
import {HTTP_METHOD_GET, HTTP_METHOD_POST, ROUTE_FILE_PATH} from "./constants.ts";
import {getFile, saveFile} from "./controller.ts";
import {sendResponseCode} from "./utils.ts";

export async function handleRequest(req: Request, resp: any) {
    const u=new URL(req.url);
    switch(u.pathname) {
        case ROUTE_FILE_PATH: {
            switch(req.method) {
                case HTTP_METHOD_GET: {
                    await getFile(req, resp);
                    break;
                }

                case HTTP_METHOD_POST: {
                    await saveFile(req, resp);
                    break;
                }

                default: {
                    return sendResponseCode(resp, Status.MethodNotAllowed);
                }
            }
            break;
        }

        default: {
            return sendResponseCode(resp, Status.NotFound);
        }

    }
}

