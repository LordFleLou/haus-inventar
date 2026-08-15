const defaultVorrat = [
    {
        name: "Ketchup",
        menge: 0,
        regal: "oberes-regal",
    },
    {
        name: "Passierte Tomaten",
        menge: 0,
        regal: "oberes-regal",
    },
    {
        name: "Mais",
        menge: 0,
        regal: "unteres-regal",
    },
    {
        name: "Bohnensalat",
        menge: 0,
        regal: "unteres-regal",
    }
];

let vorrat = JSON.parse(localStorage.getItem("vorrat")) || defaultVorrat;
localStorage.setItem("vorrat", JSON.stringify(vorrat));

function saveVorrat() {
    localStorage.setItem("vorrat", JSON.stringify(vorrat));
}

function exportVorrat() {
    console.log("Copy this and replace defaultVorrat:");
    console.log(JSON.stringify(vorrat, null, 4));
}

function renderShoppingListItem(artikel) {
    const row = document.createElement("div");
    row.className = "item-row";

    const text = document.createElement("p");
    text.textContent = `${artikel.name}: ${artikel.menge}`;

    const addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.addEventListener("click", () => {
        artikel.menge = Math.max(1, artikel.menge + 1);
        saveVorrat();
        renderAllItems();
    });

    row.appendChild(text);
    row.appendChild(addButton);
    document.getElementById("einkaufsliste-inhalt").appendChild(row);
}

function renderShelfItem(artikel) {
    const row = document.createElement("div");
    row.className = "item-row";

    const text = document.createElement("p");
    text.textContent = `${artikel.name}: ${artikel.menge}`;

    const minusButton = document.createElement("button");
    minusButton.textContent = "-";
    minusButton.addEventListener("click", () => {
        artikel.menge = Math.max(0, artikel.menge - 1);
        saveVorrat();
        renderAllItems();
    });

    const plusButton = document.createElement("button");
    plusButton.textContent = "+";
    plusButton.addEventListener("click", () => {
        artikel.menge += 1;
        saveVorrat();
        renderAllItems();
    });

    row.appendChild(text);
    row.appendChild(minusButton);
    row.appendChild(plusButton);
    document.getElementById(artikel.regal + "-inhalt").appendChild(row);
}

function renderAllItems() {
    ["oberes-regal", "unteres-regal", "einkaufsliste"].forEach((id) => {
        const container = document.getElementById(id + "-inhalt");
        if (container) {
            container.innerHTML = "";
        }
    });

    vorrat.forEach((artikel) => {
        if (artikel.menge <= 0) {
            renderShoppingListItem(artikel);
            return;
        }

        renderShelfItem(artikel);
    });
}

renderAllItems();

document.getElementById("item-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("item-name").value.trim();
    const menge = Number.parseInt(document.getElementById("item-menge").value, 10);
    const regal = document.getElementById("item-regal").value;

    if (name && !Number.isNaN(menge) && menge >= 0 && regal) {
        const newItem = { name, menge, regal };
        vorrat.push(newItem);
        saveVorrat();
        renderAllItems();

        document.getElementById("item-form").reset();
        document.getElementById("item-menge").value = 1;
    }
});