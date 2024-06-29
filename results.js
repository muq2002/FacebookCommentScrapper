chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  function getPersonName(text) {
    return text.substr(0, text.search("منذ"));
  }

  function getCommentAt(text) {
    return text.substr(text.search("منذ"));
  }
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
                <div class="comment-by"><strong>Commented By:</strong> ${getPersonName(
                  el.ariaLabel.toString().replace("تعليق من", "")
                )}</div>
                 <div class="comment-by"><strong>Commented at:</strong> ${getCommentAt(
                   el.ariaLabel.toString().replace("تعليق من", "")
                 )}</div>
                <div class="comment-text"><strong>Comment:</strong> ${
                  el.dirDivText || "Emoji comment"
                }</div>
                 <div class="comment-text"><strong>Link:</strong> <a href='${
                   el.link.href || ""}' target="blank">${el.link.text || "Profile Link"}</a></div>
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
