async function searchWikipedia() {

    const input =
        document.getElementById("wikiSearch");

    const result =
        document.getElementById("wikiResult");

    const query =
        input.value.trim();

    if (!query) {

        result.innerHTML =
            "<p>⚠️ Please enter a topic.</p>";

        return;
    }

    result.innerHTML =
        "<p>🔎 Searching Wikipedia...</p>";

    try {

        const searchURL =
            "https://en.wikipedia.org/w/rest.php/v1/search/page?q=" +
            encodeURIComponent(query) +
            "&limit=5";

        const searchResponse =
            await fetch(searchURL);

        if (!searchResponse.ok) {
            throw new Error("Search failed");
        }

        const searchData =
            await searchResponse.json();

        if (
            !searchData.pages ||
            searchData.pages.length === 0
        ) {

            result.innerHTML =
                "<p>❌ No results found.</p>";

            return;
        }

        const page =
            searchData.pages[0];

        const title =
            page.title;

        const summaryURL =
            "https://en.wikipedia.org/api/rest_v1/page/summary/" +
            encodeURIComponent(title);

        const summaryResponse =
            await fetch(summaryURL);

        if (!summaryResponse.ok) {
            throw new Error("Summary failed");
        }

        const data =
            await summaryResponse.json();

        result.innerHTML = `

            <h2>${escapeHTML(data.title)}</h2>

            ${
                data.thumbnail
                ?
                `<img src="${data.thumbnail.source}"
                       alt="Wikipedia image">`
                :
                ""
            }

            <p>
                ${escapeHTML(
                    data.extract ||
                    "No summary available."
                )}
            </p>

            ${
                data.content_urls?.desktop?.page
                ?
                `<a
                    href="${data.content_urls.desktop.page}"
                    target="_blank">
                    Read more on Wikipedia →
                </a>`
                :
                ""
            }

        `;

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <p>
                ❌ Unable to fetch Wikipedia data.
                Please check your internet connection
                and try again.
            </p>
        `;
    }
}


function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const input =
            document.getElementById("wikiSearch");

        if (input) {

            input.addEventListener(
                "keydown",
                event => {

                    if (event.key === "Enter") {
                        searchWikipedia();
                    }

                }
            );
        }

    }
);