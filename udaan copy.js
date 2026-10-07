async function searchWikipedia() {

    let question = document
        .getElementById("question")
        .value
        .trim();

    let answer = document.getElementById("answer");

    answer.style.display = "block";

    if (question === "") {
        answer.textContent = "Please enter a question.";
        return;
    }

    answer.textContent = "🔍 Searching Wikipedia...";

    try {
        let searchURL =
            "https://en.wikipedia.org/w/rest.php/v1/search/page?q=" +
            encodeURIComponent(question) +
            "&limit=5";

        let response = await fetch(searchURL);

        if (!response.ok) {
            throw new Error("Search failed: " + response.status);
        }

        let data = await response.json();

        if (!data.pages || data.pages.length === 0) {
            answer.textContent = "❌ No relevant information found.";
            return;
        }

        let page = data.pages[0];
        let summaryURL =
            "https://en.wikipedia.org/api/rest_v1/page/summary/" +
            encodeURIComponent(page.key);
        let summaryResponse = await fetch(summaryURL);

        if (!summaryResponse.ok) {
            throw new Error("Summary failed: " + summaryResponse.status);
        }

        let summary = await summaryResponse.json();
        answer.replaceChildren();

        let resultBox = document.createElement("div");
        resultBox.className = "result-box";

        let title = document.createElement("h2");
        title.textContent = summary.title || "Wikipedia result";

        let extract = document.createElement("p");
        extract.textContent = summary.extract || "No summary available.";

        resultBox.append(title, extract);

        let articleURL = summary.content_urls &&
            summary.content_urls.desktop &&
            summary.content_urls.desktop.page;

        if (articleURL) {
            let articleLink = document.createElement("a");
            articleLink.href = articleURL;
            articleLink.target = "_blank";
            articleLink.rel = "noopener noreferrer";
            articleLink.textContent = "📖 Read full Wikipedia article";
            resultBox.appendChild(articleLink);
        }

        answer.appendChild(resultBox);
    } catch (error) {
        console.error(error);
        answer.textContent =
            "⚠️ Unable to get information from Wikipedia.";
    }
}
