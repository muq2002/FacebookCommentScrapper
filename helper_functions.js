window.getPersonName = function(text) {
  return text.substr(0, text.search("منذ"));
}

window.getCommentAt = function(text) {
  return text.substr(text.search("منذ"));
}

window.exportToCSV = function(data) {
  // Add BOM to ensure Excel recognizes the file as UTF-8
  const BOM = "\uFEFF";
  
  const csvContent = BOM + [
    ["Commented By", "Commented At", "Comment", "Profile Link"],
    ...data.map(el => [
      window.getPersonName(el.ariaLabel.toString().replace("تعليق من", "")),
      window.getCommentAt(el.ariaLabel.toString().replace("تعليق من", "")),
      el.dirDivText || "Emoji comment",
      el.link.href || ""
    ].map(cell => `"${cell.replace(/"/g, '""')}"`)) // Escape double quotes and wrap each cell in quotes
  ].map(row => row.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "comments_export.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}