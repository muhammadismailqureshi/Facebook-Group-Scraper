chrome.runtime.onMessage.addListener(function (message) {
    if (message.action === 'exportToExcel' && message.groups) {
      const groups = message.groups;
      const data = [['Group Name', 'URL', 'Member Count']];
      groups.forEach(group => data.push([group.name, group.url, group.memberCount]));
      
      const sheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, sheet, 'Groups');
      
      const excelBlob = XLSX.write(workbook, { bookType: 'xlsx', type: 'blob' });
      const url = URL.createObjectURL(excelBlob);
      console.log('Excel download URL:', url); // Add this line for logging
      
      chrome.downloads.download({
        url: url,
        filename: 'FacebookGroups.xlsx',
        saveAs: true
      });
    }
  });
  