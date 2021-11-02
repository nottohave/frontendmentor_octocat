var form = document.getElementById("myForm");

// user profile picture and title
var profilePicture = document.querySelector(".info__ProfilePic");
var infoTitleH2 = document.querySelector(".info__title");

// user paragraph
var infoUser = document.querySelector(".info__user");

form.addEventListener("submit", function(e){
    e.preventDefault();

    var search = document.getElementById("search").value;
    var originalName = search.split(" ").join("");


    fetch("https://api.github.com/users/" + originalName)
    .then((result) => result.json())
    .then((data) => {
        console.log(data);

        // Date format
        let dt = new Date(data.created_at).toLocaleDateString(undefined,{dateStyle:'medium'});

        // User picture and title information
        profilePicture.innerHTML = 
        `
            <a target="_blank" href="https://www.github.com/${originalName}"> <img src="${data.avatar_url}"/>
        `;
        infoTitleH2.innerHTML = 
        `<h2>${data.name}</h2>` +
        `<a href="#">@${data.login}</a>` +
        `<p>Joined  `  + dt + `</p>`;
        
        // User information description
        if (data.bio == null) {
            infoUser.innerHTML = `<p>This profile has no bio</p>`
        } else {
            infoUser.innherHTML = `<p>${data.bio}</p>`
        }
    })

})