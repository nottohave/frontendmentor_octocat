// get input from search box
var form = document.getElementById("myForm");

// target the dark/light anchor tag, title, img
var darkLightTheme = document.querySelector(".anchor-theme");
var titleTheme = document.querySelector(".title-theme");
var icon = document.querySelector(".dark-icon");
var body = document.querySelector("body");
var logo = document.querySelector(".logo");

// target body user information
var infoContainer = document.querySelector(".info__container");

// user profile picture and title "The Octocat"
var profilePicture = document.querySelector(".info__ProfilePic");
var profileImg = document.querySelector(".profileImg");
var infoTitleH2 = document.querySelector(".info__title");

// grab search box, input box, the button & label
var formgroup = document.querySelector(".form-group");
var inputBox = document.querySelector(".form-control");
var searchButton = document.querySelector(".form-group__searchBtn");
var searchStatusLabel = document.querySelector(".search-status-label");

// hide octocat-picture when searching for a user
var octocat_picture_deskMode = document.querySelector(".octocat-picture");

// user paragraph
var infoUser = document.querySelector(".info__user");

// user stats
var infoStats = document.querySelector(".info__stats");

// user box of location, web link, twitter, company
// ^img
var imgLocation = document.querySelector(".img-location");
var imgWebsite = document.querySelector(".img-website");
var imgTwitter = document.querySelector(".img-twitter");
var imgCompany = document.querySelector(".img-company");

var userLocation = document.querySelector(".location");
var webLink = document.querySelector(".website");
var twitter = document.querySelector(".twitter");
var company = document.querySelector(".company");

// user text of location, website link, twitter, company
var userLoTxt = document.querySelector(".location-name");
var webLiTxt = document.querySelector(".website-name");
var twitTxt = document.querySelector(".twitter-link");
var compTxt = document.querySelector(".company-name");

// display certain image for desktop resolution
var desktopMode = window.matchMedia("(min-width: 1400px)");

form.addEventListener("submit", function(e){
    e.preventDefault();

    var search = document.getElementById("search").value;
    var originalName = search.split(" ").join("");

    fetch("https://api.github.com/users/" + originalName)
    .then((result) => result.json())
    .then((data) => {

        // return result when api found the user
        // else, return no results
        if (data.login && data.avatar_url !== undefined) {
            // remove label, reset search box, input box, button style
            searchStatusLabel.setAttribute("style", "display: none");
            formgroup.setAttribute("style", 
            "grid-template-columns: 0.2fr 1.5fr 0.5fr");
            inputBox.removeAttribute("style", "width");
            searchButton.removeAttribute("style", "grid-column-start; grid-columns-end;")

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
        // No Result condition:
        } else {
            // grab the form-group
            formgroup.removeAttribute("style", "grid-template-columns");
            // set the grid style to 0.5fr
            formgroup.setAttribute("style", "grid-template-columns: 0.2fr 1.5fr 0.5fr 0.5fr");
            // set width for input box to 10em
            inputBox.setAttribute("style", "width: 10em");
            // set the search button start column 4 -5
            searchButton.setAttribute("style", "grid-column-start: 4, grid-column-end: 5");
            // display the label No Results
            searchStatusLabel.setAttribute("style", "display: unset; ");
        }
    })
})



// Enable/Disable Dark Mode for user
function switchThemeColorFunc() {
    // if it display Dark, switch text to Light, switch icon to sun
    if (titleTheme.innerHTML === "DARK") {
        // header
        titleTheme.innerHTML = "LIGHT";
        icon.setAttribute("style", "content: url(./assets/icon-sun.svg)");
        body.style.background = "#141D2F";
        logo.style.color = "#FFFFFF";
        titleTheme.style.color = "#FFFFFF";
        // search box
        formgroup.style.background = "#1E2A47";
        formgroup.style.boxShadow = "none";
        inputBox.setAttribute("style", "opacity: 1");
        inputBox.setAttribute("style", "color: #FFFFFF");
        // user body info
        infoContainer.style.background = "#1E2A47";
        infoContainer.style.boxShadow = "none";
        // user body title The Octocat
        infoTitleH2.children[0].style.color = "#FFFFFF";
        infoTitleH2.children[2].style.color = "#FFFFFF";
        // user paragraph
        infoUser.children[0].style.color = "#FFFFFF";
        // user stats
        infoStats.style.background = "#141D2F";
        infoStats.children[0].setAttribute("style", "color: #FFFFFF");
        infoStats.children[1].style.color = "#FFFFFF";
        infoStats.children[2].style.color = "#FFFFFF";
        // user location, blog, twitter, company
        // ^img
        imgLocation.style.filter = "invert(25%) brightness(1000%)";
        imgWebsite.style.filter = "invert(25%) brightness(1000%)";
        imgTwitter.style.filter = "invert(25%) brightness(1000%)";
        imgCompany.style.filter = "invert(25%) brightness(1000%)";
        // ^text
        userLocation.style.color = "#FFFFFF";
        if (webLiTxt.children[0] !== undefined) {
            webLiTxt.children[0].style.color = "#FFFFFF";
        } else {
            webLiTxt.style.color = "#FFFFFF";
        }
        twitter.style.color = "#FFFFFF";
        company.style.color = "#FFFFFF";

    } else {
        // header
        titleTheme.innerHTML = "DARK";
        icon.setAttribute("style", "content: url(./assets/icon-moon.svg)");
        body.removeAttribute("style", "background");
        logo.removeAttribute("style", "color");
        titleTheme.removeAttribute("style", "color");
        // search box
        formgroup.removeAttribute("style", "background");
        formgroup.removeAttribute("style", "box-shadow");
        if (searchStatusLabel.style.display === "unset") {
            formgroup.setAttribute("style", "grid-template-columns: 0.2fr 1.5fr 0.5fr 0.5fr")
        }

        inputBox.removeAttribute("style", "opacity: 1");
        inputBox.removeAttribute("style", "color: #FFFFFF");
        // user body info
        infoContainer.removeAttribute("style", "background");
        infoContainer.removeAttribute("style", "box-shadow");
        // user body title The Octocat
        infoTitleH2.children[0].removeAttribute("style", "color");
        infoTitleH2.children[2].removeAttribute("style", "color");
        // user paragraph
        infoUser.children[0].removeAttribute("style", "color");
        // user stats
        infoStats.removeAttribute("style", "background");
        infoStats.children[0].removeAttribute("style", "color");
        infoStats.children[1].removeAttribute("style", "color");
        infoStats.children[2].removeAttribute("style", "color");
        // user location, blog, twitter, company
        // ^img
        imgLocation.removeAttribute("style", "filter");
        imgWebsite.removeAttribute("style", "filter");
        imgTwitter.removeAttribute("style", "filter");
        imgCompany.removeAttribute("style", "filter");
        // ^text
        userLocation.removeAttribute("style", "color");
        webLiTxt.children[0].removeAttribute("style", "color");
        twitter.removeAttribute("style", "color");
        company.removeAttribute("style", "color");


    }
    // else, switch to Dark

}