#!/usr/bin/env node
import { chromium } from "playwright";
import { setTimeout as delay } from "timers/promises";

// Config
const CX_ID = "675f8f5c0860940d8";
const MAX_PAGES = 10;

const randomUserAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15",
    "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 Mobile Safari/537.36",
];

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function scrapeCSE(query) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: randomUserAgents[Math.floor(Math.random() * randomUserAgents.length)],
        viewport: {
            width: randomBetween(1200, 1920),
            height: randomBetween(800, 1080),
        },
    });

    const page = await context.newPage();
    let allResults = [];

    for (let pageNum = 1; pageNum <= MAX_PAGES; pageNum++) {
        const searchUrl = `https://cse.google.com/cse?cx=${CX_ID}#gsc.tab=0&gsc.q=${encodeURIComponent(query)}&gsc.sort=&gsc.page=${pageNum}`;
        console.log(`\n🌐 Fetching page ${pageNum} → ${searchUrl}`);

        await delay(randomBetween(3000, 6000));

        try {
            await page.goto(searchUrl, { waitUntil: "domcontentloaded" });
            await page.waitForSelector(".gsc-webResult", { timeout: 20000 });

            const results = await page.evaluate(() => {
                return Array.from(document.querySelectorAll(".gsc-webResult")).map(el => {
                    const titleEl = el.querySelector(".gs-title");
                    const link = titleEl?.getAttribute("data-ctorig") || titleEl?.querySelector("a")?.href;
                    const title = titleEl?.innerText || "";
                    const snippet = el.querySelector(".gs-snippet")?.innerText || "";

                    const breadcrumbSpans = Array.from(el.querySelectorAll(".gs-visibleUrl-breadcrumb span"));
                    const publisher = breadcrumbSpans[0]?.innerText?.trim() || null;
                    const publishedDate = breadcrumbSpans[1]?.innerText?.trim() || null;
                    const category = breadcrumbSpans[2]?.innerText?.trim() || null;

                    return {
                        title: title.trim(),
                        link,
                        snippet: snippet.trim(),
                        publisher,
                        publishedDate,
                        category
                    };
                });
            });

            const filteredResults = results.filter(r => r.publishedDate);
            allResults = allResults.concat(filteredResults);

        } catch (err) {
            console.warn(`⚠️ Skipping page ${pageNum} due to error: ${err.message}`);
        }

        const waitTime = randomBetween(5000, 10000);
        console.log(`⏳ Waiting ${waitTime / 1000} seconds before next page...`);
        await delay(waitTime);
    }

    await browser.close();
    return allResults;
}

// Export for API
export async function runScraper(searchTerm) {
    return await scrapeCSE(searchTerm);
}
