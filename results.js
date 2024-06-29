chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "displayResults") {
    const results = message.results;
    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = `
        <div class="section">
          <h2>Comments (${results.commentedFromElements.length})</h2>
          <ul class="comments-list">
            ${results.commentedFromElements
              .map(
                (el) => `
              <li class="comment-item">
                <div class="comment-by"><strong>Commented By:</strong> ${el.ariaLabel
                  .toString()
                  .replace("تعليق من", "")}</div>
                <div class="comment-text"><strong>Comment:</strong> ${
                  el.dirDivText || "[No Dir Div Text, maybe emoji comment]"
                }</div>
                <br/>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      `;
  }
});
