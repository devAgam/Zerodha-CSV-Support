chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "searchSymbols") {
    alert("Confirm that you want to search for the following symbols");
    const symbols = message.symbols;
    symbols.unshift(symbols[0]);
    const searchInput = document.querySelector('[icon="search"]');
    if (searchInput) {
      searchInput.focus();
      symbols.forEach((symbol, index) => {
        setTimeout(() => {
          searchInput.value = "";
          document.execCommand("insertText", false, symbol);
          searchInput.dispatchEvent(
            new KeyboardEvent("keydown", {
              code: "Enter",
              keyCode: 13,
              bubbles: true,
              key: "Enter",
              composed: true,
            })
          );
          searchInput.dispatchEvent(
            new KeyboardEvent("keyup", {
              code: "Enter",
              keyCode: 13,
              bubbles: true,
              key: "Enter",
              composed: true,
            })
          );
          searchInput.dispatchEvent(
            new KeyboardEvent("keypress", {
              code: "Enter",
              keyCode: 13,
              bubbles: true,
              key: "Enter",
              composed: true,
            })
          );
        }, index * 200);
      });
    }
  }
});
