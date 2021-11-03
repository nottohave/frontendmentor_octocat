var form = document.getElementById("myForm");

// user profile picture and title
var profilePicture = document.querySelector(".info__ProfilePic");
var infoTitleH2 = document.querySelector(".info__title");

// user paragraph
var infoUser = document.querySelector(".info__user");

// user stats
var infoStats = document.querySelector(".info__stats");

// user location, website link, twitter, company
var userLo = document.querySelector(".location-name");
var webLi = document.querySelector(".website-name");
var twit = document.querySelector(".twitter-link");
var comp = document.querySelector(".company-name");


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
        `<a href="#">@${(data.login).toLowerCase()}</a>` +
        `<p>Joined  `  + dt + `</p>`;
        
        // User information description
        if (data.bio == null) {
            infoUser.innerHTML = `<p>This profile has no bio</p>`
        } else {
            infoUser.innherHTML = `<p>${data.bio}</p>`
        }

        // User repos, followers & following statistic
        infoStats.innerHTML = 
        `<span>Repos <br>${data.public_repos}</span>` +
        `<span>Followers <br>${data.followers}</span>` +
        `<span>Following <br>${data.following}</span>`;

        // user location, website link, twitter, company
        userLo.innerHTML = `${data.location}`;
        webLi.innerHTML = `${data.blog}`;
        twit.innerHTML = `${data.twitter_username}`;
        comp.innerHTML = `${data.company}`;

    })

})