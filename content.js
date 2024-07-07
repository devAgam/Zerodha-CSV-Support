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
      searchInput.addEventListener("keypress", (event) => {
        const input = event.target.value;
        console.log(input);
        if (isCSV(input)) {
          const symbols = input
            .split(",")
            .map((symbol) => symbol.split(":")[1].trim());
          searchSymbols(symbols);
        }
      });
    }
  }, 1500);
};

function isCSV(str) {
  const csvRegex = /^(\s*[A-Z]+:[A-Z0-9]+\s*,)*(\s*[A-Z]+:[A-Z0-9]+\s*)$/;
  return csvRegex.test(str);
}

function searchSymbols(symbols) {
  document.execCommand("insertText", false, " ");
  const searchInput = document.querySelector('[icon="search"]');
  searchInput.focus();

  symbols.forEach((symbol, index) => {
    setTimeout(() => {
      searchInput.value = "";
      document.execCommand("insertText", false, symbol);
      //  get the focused element and press enter\
      searchInput.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: "Enter",
          keyCode: 13,
          bubbles: true,
          key: "Enter",
          composed: true,
        })
      );
      //  key up and press
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
    }, index * 1000);
  });
}
