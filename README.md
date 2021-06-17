# REST Ephemeral File Server in Deno
A RESTful file server that immediately removes downloaded files (like file.io service).

## Features
- Supports RESTful endpoints to upload and download files
- Removes file immediately after download
- Use native code & Deno's standard library only

# Endpoints
A single endpoint is exposed by this service.

```/files```

Two HTTP methods are supported for the ```/files``` endpoint:
- **GET** Fetches a file (```GET /files?id=<file-id>```)
- **POST** Creates a file (```POST /files```)

# Create file (POST)
To create a file, use POST /files with raw file in the request body.

```curl http://localhost:5000/files --data "@sample.img"```

The create file API returns a file id for the uploaded file.

```{"id":"7a9a0f85-58c0-490f-895c-9ff0dabddf9b"}```

If content-type wasn't specified in the request, application/octet-stream would be assumed.

Additionally, filename can be supplied as a query param:

```curl http://localhost:5000/files?filename=abc.png --data "@sample.img"```

The filename would be returned in the content-disposition header when file is downloaded.

# Fetch file (GET)
To fetch a file, use GET /files with file-id in the query param:

```curl http://localhost:5000/files?id=7a9a0f85-58c0-490f-895c-9ff0dabddf9b```

If content-type was specified while uploading the file, a content-type header would be included in the response.

If a file name was specified while uploading the file, a content-disposition header containing file name would be included in the response.

```
HTTP/1.1 200 OK
content-disposition: attachment; filename=sample.png
content-type: image/png
content-length: 11720
```

