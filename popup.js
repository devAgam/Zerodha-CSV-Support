document.getElementById("searchButton").addEventListener("click", () => {
  const csvInput = document.getElementById("csvInput").value;
  const symbols = csvInput
    .split(",")
    .map((symbol) => symbol.split(":")[1].trim());
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: searchSymbols,
      args: [symbols],
    });
  });
});

function searchSymbols(symbols) {
  const searchInput = document.querySelector('[icon="search"]');
  symbols.forEach((symbol, index) => {
    setTimeout(() => {
      searchInput.value = symbol;
      const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
      searchInput.dispatchEvent(enterEvent);
    }, index * 1000);
  });
}
