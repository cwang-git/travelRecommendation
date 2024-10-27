const report = document.getElementById("searchResult");
const btnSearch = document.getElementById('btnSearch');



function resetSearch() {
    document.getElementById("searchInput").value = "";
}

function generateSearchResult() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    
    const resultDiv = document.getElementById('searchResult');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let result = [];
        Object.keys(data).forEach((key) => {
            if(key === input){
                result.push(data[key]);
            }
        });

        if (result.length > 0) {
            let html = '';
            result[0].forEach(res => {
                html += '<div class="card" style="width: 45rem;">'+
                '<img src="' + res.imageUrl + '" class="card-img-top">'+
                '<div class="card-body">'+
                  '<h5 class="card-title">' + res.name + '</h5>'+
                  '<p class="card-text">' + res.description + '</p>'+
                  '<a href="#" class="btn btn-primary">Visit</a>'+
                '</div>'+
            '</div>';
            })
            resultDiv.innerHTML = html;
        } else {
          resultDiv.innerHTML = 'Result not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
}