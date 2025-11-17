(function() {

  const weatherForm = document.getElementById('weatherForm')
  const answer = document.getElementById('answer')


  const token = 'KPEHEwUTKSwGiDpOnMPYsPyvuIrbPztf';

  
  weatherForm.addEventListener("submit", function(event) {

    event.preventDefault()

    answer.textContent = "Loading…";

    const datasetid = document.getElementById("datasetid").value;
    const locationid = document.getElementById("locationid").value;
    const startdate = document.getElementById("startdate").value;
    const enddate = document.getElementById("enddate").value;

    if (!datasetid || !locationid || !startdate || !enddate) {
      answer.innerHTML = `<p>Wszystkie pola są wymagane.</p>`;
      return;
    }

    const url =
      `https://corsproxy.io/?https://www.ncei.noaa.gov/cdo-web/api/v2/data` +
      `?datasetid=${datasetid}` +
      `&locationid=${locationid}` +
      `&startdate=${startdate}` +
      `&enddate=${enddate}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'token': token
      }
    })
      .then(response => {
        if (!response.ok) {
          answer.innerHTML = `${response.status}`;
          throw new Error(`${response.status}`);
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
                  <th>Date</th>
                  <th>Datatype</th>
                  <th>Value</th>
              </tr>
        `;

        post.results.forEach(station => {
          html += `
            <tr>
              <td>${station.date}</td>
              <td>${station.datatype}</td>
              <td>${station.value}</td>
            </tr>
          `;
        });

        html += `
            </table>
          </div>
        `;

        answer.innerHTML = html;
      })
      .catch(err => {
        answer.innerHTML = `<p style="color:red;">${err.message}</p>`;
        console.error(err);
      });
  })



})();