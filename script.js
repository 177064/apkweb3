(function() {
  const countryForm = document.getElementById('countryForm')
  const answer = document.getElementById('answer')


  countryForm.addEventListener("submit", function(event) {
    event.preventDefault()
    let input = document.getElementById('input')
    fetch(`https://restcountries.com/v3.1/capital/${input.value}`)
      .then(response => {
        if (!response.ok) {
          answer.innerHTML = `Error: ${response.status}`;
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(post => {
        console.log(post);
        answer.innerHTML = `
        <div>
        <table>
        <tr>
        <th>Name</th>
        <th>Capital</th>
        <th>Population</th>
        <th>Region</th>
        <th>Subregion</th>
        </tr>
        <tr>
          <td>${post[0].name.common}</td>
          <td>${post[0].capital}</td>
          <td>${post[0].population}</td>
          <td>${post[0].region}</td>
          <td>${post[0].subregion}</td>
        </tr>
        </table>
        </div>
        `;
      })
  })



})();