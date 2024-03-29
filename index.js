const form = document.querySelector("#countries-search");
const countriesContainer = document.querySelector("#countries-container");

/**
 * https://countries.trevorblades.com/
 * Create your GraphQL query on the playground first
 * And then copy/paste it inside the {}
 * You don't have to change the rest of the code,
 * Just focus on your GraphQL query
 */
const getCountriesQuery = (countryCode) =>
  `{
    country(code: "${countryCode}") {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }`;

const renderCountries = ({ data }) => {
  const { country } = data;

  if (!country.name) {
    alert("Oh no, this country does not exist...");
  } else {
    countriesContainer.innerHTML = `
    <p><strong>International Country name:</strong></p><span>${
      country.name
    }</span>
    <p><strong>Native Country Name:</strong></p><span>${country.native}</span>
    <p><strong>Country Flag:</strong></p><span>${country.emoji}</span>
    <p><strong>Country Currency:</strong></p><span>${country.currency}</span>
    <p><strong>Language Spoken:</strong></p><span>${
      country.languages[0].name
    }</span>
    `;
  }
};

const loadCountries = e => {
  e.preventDefault();
  const keyword = form.elements["search"].value.toUpperCase();

  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: getCountriesQuery(keyword)
    })
  };

  fetch(`https://countries.trevorblades.com/`, options)
    .then(res => res.json())
    .then(res => renderCountries(res));
};

form.addEventListener("submit", loadCountries);
