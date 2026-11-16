# Assignment 8 - Node.js and Express Server

## 1. How to Install and Run the Project

First, open the project folder in the terminal and install the packages:

```bash
npm install
```

To start the server, run:

```bash
npm start
```

For development mode, run:

```bash
npm run dev
```

The server runs at:

`http://localhost:3000`

## 2. File Organization

```text
assignment8/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

- `server.js` contains the server, middleware and routes
- `index.html` is the main webpage
- `styles.css` contains the page styles
- `app.js` sends requests and shows the responses
- `package.json` contains the project settings and packages
- `package-lock.json` keeps the package versions
- `.gitignore` ignores node_modules and .env

## 3. cURL Evidence

I used cURL to test the server routes and check their responses.

### Test 1: GET /api/courses

Command:

```bash
curl --include http://localhost:3000/api/courses
```

Output:

```text
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 151
ETag: W/"97-HaoY0VMWMZGpnQDQUH2j6/GrVQo"
Date: Mon, 16 Nov 2026 17:09:06 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":1,"title":"Programming Fundamentals","credits":5},{"id":2,"title":"Data Structures","credits":6},{"id":3,"title":"Web Programming","credits":4}]
```

### Test 2: POST /api/subscribe

Command:

```bash
curl --include -X POST http://localhost:3000/api/subscribe
```

Output:

```text
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 19
ETag: W/"13-oWAPIqDXuocNexKhPYW9ayyk98c"
Date: Mon, 16 Nov 2026 17:10:05 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"subscribed":true}
```

### Test 3: GET /api/admin

Command:

```bash
curl --include http://localhost:3000/api/admin
```

Output:

```text
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-TLNzmZqKxaTuFdX/dVWWPBu44/c"
Date: Mon, 16 Nov 2026 17:10:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Forbidden"}
```

### Test 4: GET /old-page

Command:

```bash
curl --include http://localhost:3000/old-page
```

Output:

```text
HTTP/1.1 302 Found
X-Powered-By: Express
Location: /hello
Vary: Accept
Content-Type: text/plain; charset=utf-8
Content-Length: 28
Date: Mon, 16 Nov 2026 17:12:13 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Found. Redirecting to /hello
```

### Test 5: API 404

Command:

```bash
curl --include http://localhost:3000/api/not-found
```

Output:

```text
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-bm7tJgu8FHlq5QU+Y6gDxOGPfRc"
Date: Mon, 16 Nov 2026 17:11:33 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Not found"}
```

### Test 6: Regular Page 404

Command:

```bash
curl --include http://localhost:3000/this-page-does-not-exist
```

Output:

```text
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 14
ETag: W/"e-vDAjs2Bjp2gdskaBRytU+hHw1Ow"
Date: Mon, 16 Nov 2026 17:11:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Page not found
```

## 4. Section 8 - Answers to the Reasoning Questions

### 1. What happens if the 404 fallback is moved to the top?

The server returns 404 for all the routes. The 404 route sends a response before the other routes can work.

### 2. What happens if we remove next() from the logger?

The logger still prints the request in the terminal but the request cannot continue to the next middleware or route.&#x20;

### 3. Why does Subscribe return 201 and not 200? Why does a missing page return 404?

201 means something new was created the subscribe route uses that to confirm the subscription also a missing page returns 404 cause the page does not exist and 200 would not be the correct status for this case.

### 4. Why use process.env.PORT?

Some servers use a port number from the environment. Using `process.env.PORT` lets the app use that port. If there is no port it uses 3000.

### 5. Why should we not commit node_modules?

The node_modules folder can be very large so we don't need to upload it to GitHub because after cloning the project someone else can run `npm install` to get those packages.

## 5. Self-Study Notes

### Node.js Process

The `process` object gives information about the running Node.js program. 
I used `process.version` to get the Node.js version and `process.uptime()` to get the server uptime.

### Content-Type

Content-Type tells the browser what kind of data the server sends. 
I used `text/plain` for the robots.txt route.

### JSON Format

I used `JSON.stringify(data, null, 2)` to show JSON data with spaces and new lines. This makes the response easier to read.

## 6. Challenges Faced

This whole assignment was a challenge. One challenge was understanding the order of middleware and routes in Express.
I also had to learn how to use different status codes and return JSON or text from the server.
