import {getIntegerVal, getStringVal}  from "./utils.ts";

export const PORT=getIntegerVal('SERVER_PORT', 5000);
export const DISK_FILE_PATH=getStringVal('DISK_FILE_PATH', '/var/tmp');
export const ROUTE_FILE_PATH=getStringVal('ROUTE_FILE_PATH', '/files');
export const HTTP_METHOD_GET='GET';
export const HTTP_METHOD_POST='POST';
export const HEADER_CONTENT_LENGTH='content-length';
export const HEADER_CONTENT_TYPE='content-type';
export const HEADER_CONTENT_DISPOSITION='content-disposition';
export const HEADER_CONTENT_DISPOSITION_VAL='attachment; filename=';
export const PARAM_FILE_NAME='filename';
export const PARAM_ID='id';
export const CONTENT_TYPE_RAW='application/octet-stream';
export const RECORD_DELIM='|';