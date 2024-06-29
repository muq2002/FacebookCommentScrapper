// content_script.js
(function () {
  function getElementText(element) {
    return element.innerText || element.textContent || "";
  }

  function getDirDivText(element) {
    const dirDiv = element.querySelector("div[dir]");
    return dirDiv ? getElementText(dirDiv).trim() : "";
  }
  function getLinkInfo(element) {
    const link = element.querySelector("a");
    return link
      ? {
          href: link.href,
          text: getElementText(link).trim(),
        }
      : null;
  }

  let commentedFromElements = Array.from(
    document.querySelectorAll('div[aria-label*="تعليق من"]')
  ).map((el) => ({
    ariaLabel: el.getAttribute("aria-label"),
    text: getElementText(el).trim(),
    dirDivText: getDirDivText(el),
    link: getLinkInfo(el),
  }));

  let results = {
    commentedFromElements: commentedFromElements,
  };

  chrome.runtime.sendMessage({ action: "openResultsTab", results: results });
})();
