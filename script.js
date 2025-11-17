(function() {

  const giphyForm = document.getElementById('giphyForm')
  const answer = document.getElementById('answer')



  giphyForm.addEventListener("submit", function(event) {

    event.preventDefault()

    answer.innerHTML = "Loading…";

    const quantity = document.getElementById("quantity").value;
    var searchphrase = document.getElementById("searchphrase").value;

    searchphrase = encodeURIComponent(searchphrase);

    const url =
      `https://api.giphy.com/v1/gifs/search?api_key=cAqzaFYzQrQH7IraNbPgoRV6p0K3aNB7` +
      `&q=${searchphrase}` +
      `&limit=${quantity}` + `&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          answer.innerHTML = `Error: ${response.status}`;
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);

        if (data.data.length === 0) {
          answer.innerHTML = `Brak wyników`;
          return;
        }

        let html = `<div>`;
        for (let i = 0; i < data.data.length; i++) {
          html += `<img class="gif_img" src="${data.data[i].images.original.url}">`;
        }
        html += `</div>`;

        answer.innerHTML = html;

      });
  });








})();