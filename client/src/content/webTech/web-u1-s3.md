### 1. Requirements for Working with Internet & WWW: The 5-Tier DNS Resolution Hierarchy

When a user enters `https://mmumullana.org` into a browser, the hostname must be resolved to a 32-bit IPv4 or 128-bit IPv6 address before TCP connection setup can occur:

```
  [ Step 1: Client Browser ] ───(1. Checks Local Cache)───> [ OS DNS Cache / hosts File ]
              │
              ▼ (Cache Miss: Query Dispatched via UDP Port 53)
  [ Step 2: ISP Recursive Resolver ]
              │
              ├───(2. Queries Root)────────> [ Step 3: Root Server (.) ]
              │<──(Refers to .org TLD)──────┘
              │
              ├───(3. Queries TLD)─────────> [ Step 4: TLD Server (.org) ]
              │<──(Refers to MMU Auth DNS)──┘
              │
              └───(4. Queries Auth DNS)────> [ Step 5: Authoritative DNS Server ]
               <──(Returns 104.21.48.12)────┘
              │
              ▼ (Caches IP & Returns to Client)
  [ Client Browser Connects via TCP to 104.21.48.12:443 ]
```

> 📌 **Key Architectural Distinction:**
> - **Recursive Resolver:** The server that performs the legwork of querying other nameservers on behalf of the client.
> - **Authoritative DNS:** The final authoritative source holding the actual DNS zone record (`A`, `AAAA`, `CNAME`, `MX`) mapped to that domain.

---

### 2. Internal Subsystems of a Modern Web Browser

A web browser is a multi-process software application composed of distinct subsystems:

```
  +-------------------------------------------------------------------------+
  |                             USER INTERFACE                              |
  |  Address bar, Back/Forward buttons, Bookmark menu, Tab bar, Downloads  |
  +-------------------------------------------------------------------------+
                                       │
                                       ▼
  +-------------------------------------------------------------------------+
  |                              BROWSER ENGINE                             |
  |  Marshals actions between the UI and the underlying rendering engine   |
  +-------------------------------------------------------------------------+
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
  +-----------------------------------+ +-----------------------------------+
  |          RENDERING ENGINE         | |         JAVASCRIPT ENGINE         |
  |  Parses HTML to build DOM Tree    | |  Compiles JS to machine bytecode  |
  |  Parses CSS to build CSSOM Tree   | |  Executes scripts \frac{V8}{SpiderM}  |
  |  Combines into Render Tree        | |  Manages call stack & event loop  |
  |  Calculates Layout & Paints UI    | +-----------------------------------+
  |  (Blink in Chrome/Edge, Gecko)    |
  +-----------------------------------+
                    │                                     │
                    └──────────────────┬──────────────────┘
                                       ▼
  +-------------------------------------------------------------------------+
  |                           NETWORKING SUBSYSTEM                          |
  |  DNS queries, TLS handshakes, HTTP request/response pipelines, Sockets  |
  +-------------------------------------------------------------------------+
  |                              DATA STORAGE                               |
  |  localStorage, sessionStorage, IndexedDB, Cookies, Service Worker Cache |
  +-------------------------------------------------------------------------+
```

---

### 3. Hypertext Transfer Protocol (HTTP) & The 3-Way Handshake

HTTP is an Application Layer, stateless, request-response communication protocol:

$$\text{Client Request}  [\text{Method} + \text{URI} + \text{Headers} + \text{Body}] iff \text{Server Response}  [\text{Status Code} + \text{Headers} + \text{Payload}]$$

#### Standard HTTP Methods:
- **`GET`:** Requests representation of specified resource without server side-effects. Parameters appended to URL query string.
- **`POST`:** Submits data to be processed (e.g. form submissions, file uploads). Data enclosed inside request payload body.
- **`PUT`:** Replaces target resource completely with uploaded payload.
- **`DELETE`:** Requests removal of specified resource from server storage.

#### HTTP Response Status Classifications:
- **1xx (Informational):** `100 Continue`, `101 Switching Protocols`.
- **2xx (Success):** `200 OK`, `201 Created`, `204 No Content`.
- **3xx (Redirection):** `301 Moved Permanently`, `304 Not Modified` (browser cache valid).
- **4xx (Client Error):** `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`.
- **5xx (Server Error):** `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`.