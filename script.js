(function() {
  const weatherForm = document.getElementById('weatherForm')
  const answer = document.getElementById('answer')


  const token = 'KPEHEwUTKSwGiDpOnMPYsPyvuIrbPztf';


  weatherForm.addEventListener("submit", function(event) {
    event.preventDefault()
    answer.innerHTML = `<p>Loading...</p>`;
    fetch('https://corsproxy.io/?https://www.ncei.noaa.gov/cdo-web/api/v2/stations', {
      method: 'GET',
      headers: {
        'token': token
      }
    })
      .then(response => {
        if (!response.ok) {
          answer.innerHTML = `Error: ${response.status}`;
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(post => {
        console.log(post);

        if (!post.results || post.results.length === 0) {
          answer.innerHTML = `<p>Brak danych o stacjach.</p>`;
          return;
        }


        let html = `
          <div>
            <table class="my-table">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>State</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
        `;

        post.results.forEach(station => {
          html += `
            <tr>
              <td>${station.id}</td>
              <td>${station.name}</td>
              <td>${station.state ?? "—"}</td>
              <td>${station.latitude}</td>
              <td>${station.longitude}</td>
            </tr>
          `;
        });

        html += `
            </table>
          </div>
        `;

        answer.innerHTML = html;
      })
      .catch(error => {
        console.error('Error:', error);
        answer.innerHTML = `<p>${error.message}</p>`;
      })
  })



})();