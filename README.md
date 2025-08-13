Here’s your updated **README.md** with the API usage section added and wording adjusted so it covers both CLI and HTTP API access:

---

# 🔍 CSE News Scraper

A Node.js tool using **Playwright** to scrape results from a **Google Custom Search Engine (CSE)** and filter out only items that have a `publishedDate` (i.e., likely news articles).

---

## ✨ Features

* Scrapes up to **10 pages** of results from a given CSE.
* Uses **random user agents** and **random delays** to mimic human browsing.
* Filters results to only include entries with a `publishedDate`.
* Outputs structured JSON data (title, link, snippet, publisher, date, category).
* Built with **Playwright** for fast, headless browsing.
* Can be run as a **CLI tool** or as an **HTTP API server**.

---

## 📦 Requirements

* **Node.js** 18+
* **npm** or **yarn**
* A valid **Google CSE ID** (`CX_ID`)

> ⚠️ You must configure your own CSE ID in the script or set it via environment variables.

---

## 🚀 Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/news-collector.git
cd news-collector
```

2. Install dependencies:

```bash
npm install
```

3. Set environment variables (example `.env` file):

```env
CX_ID=your_cse_id
GOOGLE_API_KEY=your_google_api_key
PORT=3000
```

---

## 💻 CLI Usage

Run the scraper directly from the command line:

```bash
node bilyonario_news_collector.js "Areit"
```

This will output JSON results to the console.

---

## 🌐 API Usage

Once deployed (e.g., to **Render**, Docker, or your own Node.js server), you can call the scraper via HTTP GET requests.

**Example:**

```bash
curl "https://news-collector-4irq.onrender.com/scrape?q=Areit"
```

This will return a JSON array of news results for the search term `"Areit"`.

**Query Parameters:**

* `q` (string) – The search term (required).

**Examples with different search terms:**

```bash
curl "https://news-collector-4irq.onrender.com/scrape?q=PLDT"
curl "https://news-collector-4irq.onrender.com/scrape?q=Ayala%20Land"
```

**Sample Response:**

```json
[
  {
    "title": "AREIT expands real estate portfolio",
    "link": "https://example.com/news/areit-expansion",
    "snippet": "AREIT announces acquisition of new office buildings...",
    "publisher": "Bilyonaryo",
    "publishedDate": "Aug 10, 2025",
    "category": "Business"
  }
]
```

---

## 🐳 Running in Docker

Build the Docker image:

```bash
docker build -t news-collector .
```

Run the container:

```bash
docker run -p 3000:3000 --env-file .env news-collector
```

Access it via:

```
http://localhost:3000/scrape?q=Areit
```

---

Do you want me to also **fix your code** so that it runs correctly as this API without hitting the `Illegal return statement` error?
Because the README above assumes it’s already working.
