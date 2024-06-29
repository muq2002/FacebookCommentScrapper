// content_script.js
(function() {
    function getElementText(element) {
      return element.innerText || element.textContent || '';
    }
  
    function getDirDivText(element) {
      const dirDiv = element.querySelector('div[dir]');
      return dirDiv ? getElementText(dirDiv).trim() : '';
    }
  
    let commentedFromElements = Array.from(document.querySelectorAll('div[aria-label*="تعليق من"]')).map(el => ({
      ariaLabel: el.getAttribute('aria-label'),
      text: getElementText(el).trim(),
      dirDivText: getDirDivText(el)
    }));
  
    let results = {
      commentedFromElements: commentedFromElements
    };
  
    chrome.runtime.sendMessage({action: "openResultsTab", results: results});
  })();
  