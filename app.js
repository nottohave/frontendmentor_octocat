var form = document.getElementById("myForm");
var profilePicture = document.querySelector(".info__ProfilePic");
var infoTitleH2 = document.querySelector(".info__title");

form.addEventListener("submit", function(e){
    e.preventDefault();

    var search = document.getElementById("search").value;
    var originalName = search.split(" ").join("");


    fetch("https://api.github.com/users/" + originalName)
    .then((result) => result.json())
    .then((data) => {
        console.log(data);

        profilePicture.innerHTML = 
        `
            <a target="_blank" href="https://www.github.com/${originalName}"> <img src="${data.avatar_url}"/>
        `;
        infoTitleH2.innerHTML = `<h2>${data.login}</h2>`
    })

})