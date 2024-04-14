chrome.runtime.onMessage.addListener(function (message, sendResponse) {
    if (message.action === 'scrapeGroups') {
      const keywords = message.keywords.split(',').map(keyword => keyword.trim());
      const groups = Array.from(document.querySelectorAll('[data-testid="group_name"]:not([aria-hidden="true"])')).map(group => {
        const name = group.textContent.trim();
        const url = group.closest('a').href;
        const memberCountElement = group.closest('[data-testid="group_megaphone"]');
        const memberCount = memberCountElement ? memberCountElement.textContent.trim().replace(/[^\d]/g, '') : 'N/A';
        return { name, url, memberCount };
      }).filter(group => keywords.some(keyword => group.name.toLowerCase().includes(keyword.toLowerCase())));
      sendResponse({ success: true, groups });
    }
  });
  