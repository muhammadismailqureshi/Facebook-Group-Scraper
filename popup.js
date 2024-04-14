document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('keywordsForm');
    const statusDiv = document.getElementById('status');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const keywords = document.getElementById('keywordsInput').value.trim();
      if (keywords) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeGroups', keywords: keywords }, function (response) {
            if (response && response.success) {
              statusDiv.textContent = 'Groups scraped successfully!';
            } else {
              statusDiv.textContent = 'Error scraping groups. Please try again.';
            }
          });
        });
      } else {
        statusDiv.textContent = 'Please enter keywords.';
      }
    });
  });
  