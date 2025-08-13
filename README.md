# 🔍 CSE News Scraper

A Node.js CLI tool using **Playwright** to scrape results from a **Google Custom Search Engine (CSE)** and filter out only items that have a `publishedDate` (i.e., likely news articles).

---

## ✨ Features

* Scrapes up to **10 pages** of results from a given CSE.
* Uses **random user agents** and **random delays** to mimic human browsing.
* Filters results to only include entries with a `publishedDate`.
* Outputs structured JSON data (title, link, snippet, publisher, date, category).
* Built with **Playwright** for fast, headless browsing.

---

## 📦 Requirements

* **Node.js** 18+
* **npm** or **yarn**
* A valid **Google CSE ID** (`CX_ID`)

> ⚠️ You must configure your own CSE ID in the script.

---

## 🚀 Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/cse-news-scraper.git
cd cse-news-scraper
```
