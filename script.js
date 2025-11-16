(function() {

  const weatherForm = document.getElementById('weatherForm')
  const answer = document.getElementById('answer')


  const token = 'KPEHEwUTKSwGiDpOnMPYsPyvuIrbPztf';

  weatherForm.addEventListener("submit", function(event) {
    answer.textContent = "Loading…"
    event.preventDefault()
    fetch('https://corsproxy.io/?https://www.ncei.noaa.gov/cdo-web/api/v2/datasets', {
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
          answer.innerHTML = `<p>Brak danych.</p>`;
          return;
        }


        let html = `
          <div>
            <table class="my-table">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Mindate</th>
                <th>Maxdate</th>
              </tr>
        `;

        post.results.forEach(station => {
          html += `
            <tr>
              <td>${station.id}</td>
              <td>${station.name}</td>
              <td>${station.description ?? "—"}</td>
              <td>${station.mindate}</td>
              <td>${station.maxdate}</td>
            </tr>
          `;
        });

        html += `
            </table>
          </div>
        `;

        // Wstawiamy do elementu answer
        answer.innerHTML = html;
      })
      .catch(err => {
        answer.innerHTML = `<p style="color:red;">${err.message}</p>`;
        console.error(err);
      });
  })



})();