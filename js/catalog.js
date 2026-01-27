const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1eNg36--ElOLLJAw3-3Kz3AsbJwupEIR_oaisQ_t3Khc/gviz/tq?tqx=out:json&gid=1331374379";

fetch(SHEET_URL)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    const grid = document.querySelector(".grid");
    grid.innerHTML = "";

    rows.forEach(row => {
      const [
        id,
        name,
        shape,
        carat,
        color,
        image,
        astro_benefit
      ] = row.c.map(cell => cell ? cell.v : "");

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <a href="product.html?id=${id}" style="text-decoration:none; color:inherit;">
          <img src="${image}" alt="${name}">
          <h2>${name}</h2>
          <p>${carat} ct · ${color}</p>
        </a>
      `;

      grid.appendChild(card);
    });
  });
