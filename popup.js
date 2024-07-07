document.getElementById("searchButton").addEventListener("click", () => {
  const csvInput = document.getElementById("csvInput").value;
  const preprocessedInput = removeDatePrefix(csvInput);
  const symbols = preprocessedInput
    .split(",")
    .map((symbol) => symbol.split(":")[1].trim());

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "searchSymbols",
      symbols: symbols,
    });
  });
});

function removeDatePrefix(str) {
  if (str.startsWith("###")) {
    return str.substring(str.indexOf(",") + 1).trim();
  }
  return str;
}
