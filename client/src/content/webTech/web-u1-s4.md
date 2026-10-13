### 1. Search Engine Subsystems & Inverted Indexing

Modern web search engines process billions of documents via a 4-phase pipeline:

```
  [ Phase 1: Web Crawlers (Spiders / Bots) ]
  • Discovers URLs by traversing hyperlinks across the web graph.
  • Respects robots.txt directives and crawls recursively.
                    │
                    ▼
  [ Phase 2: Document Parser & Tokenizer ]
  • Strips HTML markup tags and extracts raw text.
  • Lowercases tokens, eliminates non-informative stop words ("the", "is", "at").
  • Normalizes words to linguistic stems via Porter Stemming.
                    │
                    ▼
  [ Phase 3: Inverted Index Generation ]
  • Constructs a dictionary of all distinct words mapped to Document Postings Lists:
      Term "html"    ───> [ Doc 101, Doc 104, Doc 209 ]
      Term "css"     ───> [ Doc 104, Doc 312 ]
      Term "mullana" ───> [ Doc 101, Doc 418 ]
                    │
                    ▼
  [ Phase 4: Query Ranking Engine (PageRank / AI) ]
  • Evaluates query terms using TF-IDF (Term Frequency - Inverse Document Frequency).
  • Computes PageRank authority score based on incoming link eigenvector centrality.
  • Returns top ranked results to user in under 100 milliseconds.
```

---

### 2. Web-Casting Techniques: Push vs. Pull & Unicast vs. Multicast

- **Pull Technology (Traditional Client-Driven):** The client sends an explicit HTTP request to the server, and the server passively responds with data. If no request is made, no data is delivered.
- **Push Technology (Server-Driven Event Streams):** The server proactively delivers fresh information to the client as soon as new data becomes available without waiting for a new request (e.g. WebSockets, Server-Sent Events, RSS feeds).
- **Unicast Transmission:** A dedicated one-to-one point-to-point transmission stream between the server and a single client. $N$ simultaneous viewers require $N$ times the server bandwidth.
- **Multicast Transmission:** A one-to-many distribution mechanism where the source transmits a single packet stream, and intermediate network routers replicate packets at junction branches to feed multiple simultaneous viewers.