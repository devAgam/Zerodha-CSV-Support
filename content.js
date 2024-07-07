window.onload = function () {
  // add delay
  setTimeout(() => {
    const searchInput = document.querySelector('[icon="search"]');
    // Object.keys(window).forEach((key) => {
    //   if (/^on/.test(key)) {
    //     window.addEventListener(key.slice(2), (event) => {
    //       console.log(event);
    //     });
    //   }
    // });
    console.log(searchInput);
    if (searchInput) {
      console.log("searchInput captured");
      searchInput.addEventListener("onpaste", (event) => {
        alert("Pasted");
      });
      searchInput.addEventListener("drop", (event) => {
        const input = event.target.value;
        // Preprocess the input to remove date if it starts with "###"
        const preprocessedInput = removeDatePrefix(input);
        if (isCSV(preprocessedInput)) {
          const symbols = preprocessedInput
            .split(",")
            .map((symbol) => symbol.split(":")[1].trim());
          searchSymbols(symbols);
        }
      });
    }
  }, 1500);
};
function removeDatePrefix(str) {
  if (str.startsWith("###")) {
    return str.substring(str.indexOf(",") + 1).trim();
  }
  return str;
}
function isCSV(str) {
  const csvRegex = /^(\s*[A-Z]+:[A-Z0-9]+\s*,)*(\s*[A-Z]+:[A-Z0-9]+\s*)$/;
  return csvRegex.test(str);
}

function searchSymbols(symbols) {
  const searchInput = document.querySelector('[icon="search"]');
  searchInput.focus();

  function simulateKeyPress(symbol) {
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
  }
  symbols.unshift(symbols[0]);
  symbols.forEach((symbol, index) => {
    setTimeout(() => {
      simulateKeyPress(symbol);
    }, index * 200);
  });

  // Call the first element immediately
  if (symbols.length > 0) {
    simulateKeyPress(symbols[0]);
  }
}
