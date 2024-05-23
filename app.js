console.log("Let's get this party started!");
const $gifSearchResults = $("#gif-search-results");

function randomResultSelector(res){
    let randomIdx = Math.floor(Math.random() * res.data.length)
    return(res.data[randomIdx].images.original.url);
}

function appendGif(resData){
    let randomGif;
    try{
        randomGif = randomResultSelector(resData);
    } catch{
        return;
    }
    let $newCol = $("<div>");
    let $newGif = $("<img>", {
        src: randomGif
    });
    
    $newCol.append($newGif);
    $gifSearchResults.append($newCol);
}

$("form").on("submit", function(e){
    e.preventDefault();
    
    let searchTerm = $("#search").val();
    $("#search").val("");

    getGif(searchTerm);
})

async function getGif(searchTerm){
    const res = await axios.get('http://api.giphy.com/v1/gifs/search',{
        params:{
            q: searchTerm,
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    })
    appendGif(res.data);  
}

$("#clear").on("click", function() {
    $gifSearchResults.empty();
  });

