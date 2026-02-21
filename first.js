let converterUrl = "https://api.frankfurter.app/latest?";
let fromFlag = document.querySelector(".fromFlag");
let toFlag = document.querySelector(".toFlag");
let selects = document.querySelectorAll("select");
let btn = document.querySelector("button");
let amount = document.querySelector(".amount input");
let fromCurr = document.querySelector(".fromselect select");
let toCurr = document.querySelector(".toselect select");
let result = document.querySelector(".result input");
let form = document.querySelector("form");


for (let select of selects) {
    for (let country in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = country;
        newOption.value = country;
        select.append(newOption);

        if (select.name === "from" && country === "USD") {
            newOption.selected = true;
        }
        else if (select.name === "to" && country === "INR") {
            newOption.selected = true;
        }
    }
}

selects.forEach((select) => {
    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
});

const updateFlag = (select) => {
    let country = select.value;
    let countryCode = countryList[country];
    let img = `https://flagsapi.com/${countryCode}/flat/64.png`;
    if (select.name === "from") {
        fromFlag.src = img;
    }
    else if (select.name === "to") {
        toFlag.src = img;
    }
};

form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    btn.innerText = "Converting...";
    btn.disabled = true;
    let amountVal = Number(amount.value);
    if (isNaN(amountVal) || amountVal <= 0) {
        alert("Please enter a valid amount");
        btn.innerText = "Get Exchange Rate";
        btn.disabled = false;
        return;
    }
    else {
        let newUrl = `${converterUrl}amount=${amountVal}&from=${fromCurr.value}&to=${toCurr.value}`;
        try {
            let response = await fetch(newUrl);
            if (!response.ok) {
                throw new Error("API response failed");
            }
            let data = await response.json();
            let rate = data.rates[toCurr.value];
            result.value = rate.toFixed(3);
        }
        catch (error) {
            alert("Something went wrong");
            console.log(error);
        }
    }
    btn.innerText = "Get Exchange Rate";
    btn.disabled = false;
});

