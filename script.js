(function() {

  //const weatherForm = document.getElementById('weatherForm')
  const answer = document.getElementById('answer')


  //const token = 'cAqzaFYzQrQH7IraNbPgoRV6p0K3aNB7';


  example.addEventListener("click", function() {

  answer.innerHTML = "Loading…";
    
    fetch('https://api.giphy.com/v1/gifs/random?api_key=cAqzaFYzQrQH7IraNbPgoRV6p0K3aNB7&tag=&rating=g')
      .then(response => {
        if (!response.ok) {
          answer.innerHTML = `Error: ${response.status}`;
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);

        answer.innerHTML = `<img src="${data.data.images.original.url}" alt="Random GIF">`;
        
      });
  });








})();