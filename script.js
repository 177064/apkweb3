(function() {

  const giphyForm = document.getElementById('giphyForm')
  const answer = document.getElementById('answer')
  const prevBtn = document.getElementById('prevBtn')
  const nextBtn = document.getElementById('nextBtn')

  let searchphrase = "";   
  let offset = 0;       
  let limit = 2;  

  function fetchGifs(searchTerm, offsetValue = 0) {
    answer.innerHTML = "Loading…";

    const url =
      `https://api.giphy.com/v1/gifs/search?api_key=cAqzaFYzQrQH7IraNbPgoRV6p0K3aNB7` +
      `&q=${encodeURIComponent(searchTerm)}` +
      `&limit=${limit}&offset=${offsetValue}&rating=g&lang=en`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          answer.innerHTML = `${response.status}`;
          throw new Error(`${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);

        if (!data.data || data.data.length === 0) {
          answer.innerHTML = `Brak wyników`;
          return;
        }

        let html = `<div>`;
        for (let i = 0; i < data.data.length; i++) {
          html += `<img class="gif_img" src="${data.data[i].images.original.url}">`;
        }
        html += `</div>`;
        answer.innerHTML = html;
      })
      .catch(err => {
        answer.innerHTML = `<p style="color:red;">${err.message}</p>`;
        console.error(err);
      });
  }

  giphyForm.addEventListener("submit", function(event) {
    event.preventDefault();
    searchphrase = document.getElementById("searchphrase").value;
    limit = parseInt(document.getElementById("quantity").value) || 2;
    offset = 0;
    if (searchphrase.trim() === "") {
      answer.innerHTML = "Please enter a search term";
      return;
    }
    fetchGifs(searchphrase, offset);
  });

  prevBtn.addEventListener("click", function() {
    if (offset - limit >= 0) {
      offset -= limit;
      fetchGifs(searchphrase, offset);
    }
  });

  nextBtn.addEventListener("click", function() {
    offset += limit;
    fetchGifs(searchphrase, offset);
  });

})();
