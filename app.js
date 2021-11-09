// get input from search box
var form = document.getElementById("myForm");

// user profile picture and title
var profilePicture = document.querySelector(".info__ProfilePic");
var profileImg = document.querySelector(".profileImg");
var infoTitleH2 = document.querySelector(".info__title");

// hide octocat-picture when searching for a user
var octocat_picture_deskMode = document.querySelector(".octocat-picture");

// user paragraph
var infoUser = document.querySelector(".info__user");

// user stats
var infoStats = document.querySelector(".info__stats");

// user box of location, web link, twitter, company
var userLocation = document.querySelector(".location");
var webLink = document.querySelector(".website");
var twitter = document.querySelector(".twitter");
var company = document.querySelector(".company");

// user text of location, website link, twitter, company
var userLoTxt = document.querySelector(".location-name");
var webLiTxt = document.querySelector(".website-name");
var twitTxt = document.querySelector(".twitter-link");
var compTxt = document.querySelector(".company-name");

// desktop screen resolution matches will display user image
// hide the octocat-profile picture in desktop mode
var desktopMode = window.matchMedia("(min-width: 1400px)");


// return no result when api cant find the user 
form.addEventListener("submit", function(e){
    e.preventDefault();

    var search = document.getElementById("search").value;
    var originalName = search.split(" ").join("");

    fetch("https://api.github.com/users/" + originalName)
    .then((result) => result.json())
    .then((data) => {

        // Date format
        let dt = new Date(data.created_at).toLocaleDateString(undefined,{dateStyle:'medium'});

        // User picture and title information
        profilePicture.innerHTML = 
        `
            <a target="_blank" href="https://www.github.com/${originalName}"> 
            <img class="profileImg_DisplayYes" src="${data.avatar_url}" alt="github-user-profileimg"/>
        `;
        
        // 1400px: display user profile picture in octocat-picture
        // <1400px: display user profile pic in info__ProfilePic
        if (desktopMode.matches) {
            profilePicture.setAttribute("style", "display: none");
            octocat_picture_deskMode.setAttribute("style", "display:unset");
            octocat_picture_deskMode.innerHTML = 
            `
                <a target="_blank" href="https://www.github.com/${originalName}"> 
                <img class="profileImg_DisplayYes" src="${data.avatar_url}" alt="github-user-profileimg"/>
            `
        } else {
            octocat_picture_deskMode.setAttribute("style", "display: none");
            profilePicture.setAttribute("style", "display: unset");
        }

        // add user header information to title
        infoTitleH2.innerHTML = 
        `<h2>${data.name}</h2>` +
        `<a href="#">@${(data.login).toLowerCase()}</a>` +
        `<p>Joined  `  + dt + `</p>`;
        
        // User information description
        if (data.bio === null) {
            infoUser.innerHTML = `<p>This profile has no bio</p>`
        } else {
            infoUser.innerHTML = `<p>${data.bio}</p>`
        }

        // User repos, followers & following statistic
        infoStats.innerHTML = 
        `<span>Repos <br>${data.public_repos}</span>` +
        `<span>Followers <br>${data.followers}</span>` +
        `<span>Following <br>${data.following}</span>`;

        // user location, website link, twitter, company
        // if the information is null or "", display NA, grey out the area
        // if user has the information for the above, display the information with a different text color
        if (data.location == null) {
            userLoTxt.innerHTML = `Not Available`;
            userLocation.setAttribute("style", "opacity: 0.5");
        } else {
            userLoTxt.innerHTML = `${data.location}`;
            userLocation.removeAttribute("style", "opacity");
        };
        
        if (data.blog == "") {
            webLiTxt.innerHTML = `Not Available`;
            webLink.setAttribute("style", "opacity: 0.5");
        } else {
            webLiTxt.innerHTML = `<a href="_blank">${data.blog}</a>`;
            webLink.removeAttribute("style", "opacity");
        };
        
        if (data.twitter_username == null) {
            twitTxt.innerHTML = `Not Available`;
            twitter.removeAttribute("style", "opacity")
        } else {
            twitTxt.innerHTML = `${data.twitter_username}`;
            twitter.setAttribute("style", "opacity: 1 !important");
        };

        if (data.company == null) {
            compTxt.innerHTML = `Not Available`;
            company.setAttribute("style", "opacity: 0.5");
        } else {
            compTxt.innerHTML = `${data.company}`;
            company.removeAttribute("style", "opacity");
        };

    })

})