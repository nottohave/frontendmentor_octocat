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
var infoTitle = document.querySelector(".info__title");
var infoTitleh2 = document.querySelector(".info__titleh2");
var infoTitleA = document.querySelector(".info__titleA");
var infoTitleP = document.querySelector(".info__titleP");

// grab search box, input box, the button & label
var formgroup = document.querySelector(".form-group");
var inputBox = document.querySelector(".form-control");
var searchButton = document.querySelector(".form-group__searchBtn");
var searchStatus = document.querySelector(".search-status");

// hide octocat-picture when searching for a user
var octocat_picture_deskMode = document.querySelector(".octocat-picture");

// user paragraph
var infoUserP = document.querySelector(".info__userP");

// user stats
var infoStats = document.querySelector(".info__stats");
var userStats = document.querySelector("#userStats");

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
var webLiTxtA = document.querySelector(".website-nameA");
var twitTxt = document.querySelector(".twitter-link");
var compTxt = document.querySelector(".company-name");

// display certain image for desktop resolution
var desktopMode = window.matchMedia("(min-width: 1400px)");

form.addEventListener("submit", function(e){
    e.preventDefault();

    var search = document.getElementById("search").value;
    var originalName = search.split(" ").join("");

    fetch("https://api.github.com/users/" + originalName)
    // handle error
    .then(response => {
        if (!response.ok) {
            handleErrors(response);
            throw Error(response.statusText)
        }
        return response.json()
    })
    .then((data) => {
        // return result when api found the user
        // else, return no results
        if (data.login && data.avatar_url !== undefined) {
            // remove label, reset search box, input box, button style
            searchStatus.setAttribute("style", "display: none");
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
            infoTitleh2.innerHTML = `${data.name}`;
            infoTitleA.innerHTML = `@${(data.login).toLowerCase()}`;
            infoTitleP.innerHTML = `Joined ` + dt + `</p>`;
            
            // User information description
            if (data.bio === null) {
                infoUserP.innerHTML = "This profile has no bio";
            } else {
                infoUserP.innerHTML = `${data.bio}`;
            }

            // User repos, followers & following statistic
            infoStats.innerHTML = 
            `<li><span>Repos </span>${data.public_repos}</li>` +
            `<li><span>Followers </span>${data.followers}</li>` +
            `<li><span>Following </span>${data.following}</li>`;

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
                webLiTxtA.href = `${data.blog}`;
                webLiTxtA.innerHTML = `${data.blog}`;
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
        } 

    })
    .catch((error) => {console.log(error)}) // display error

})

// No Result condition:
function handleErrors(response) {
    if (!response.ok) {
        // grab the form-group
        formgroup.removeAttribute("style", "grid-template-columns");
        // set the grid style to 0.5fr
        formgroup.setAttribute("style", "grid-template-columns: 0.2fr 1.5fr 0.5fr 0.5fr");
        // set width for input box to 10em
        inputBox.setAttribute("style", "width: 10em");
        // set the search button start column 4 -5
        searchButton.setAttribute("style", "grid-column-start: 4, grid-column-end: 5");
        // display the label No Results
        // under the dark mode condition, the search form should keep dark background
        if (titleTheme.innerHTML === "LIGHT") {
            searchStatus.setAttribute("style", "display: unset; ");
            formgroup.style.background = "#1E2A47";
            formgroup.style.boxShadow = "none";
            inputBox.setAttribute("style", "opacity: 1");
            inputBox.setAttribute("style", "color: #FFFFFF");        
        } else {
            searchStatus.setAttribute("style", "display: unset;");
        }
    }
}

// Enable/Disable Dark Mode for user
function switchThemeColorFunc() {
    // body and header
    body.classList.toggle("dark");
    if (titleTheme.innerHTML === "DARK") {
        titleTheme.innerHTML = "LIGHT";
        titleTheme.style.color = "#FFFFFF";
        icon.setAttribute("style", "content: url(./assets/icon-sun.svg)");
        if (webLiTxt.children[0] !== undefined) {
            webLiTxt.children[0].style.color = "#FFFFFF";
        } else {
            webLiTxt.style.color = "#FFFFFF";
        }    
    } else {
        titleTheme.innerHTML = "DARK";
        titleTheme.removeAttribute("style", "color");
        icon.setAttribute("style", "content: url(./assets/icon-moon.svg)");
        if (webLiTxt.children[0] !== undefined) {
            webLiTxt.children[0].removeAttribute("style", "color");
        } else {
            webLiTxt.removeAttribute("style", "color");
        }
    }

    logo.classList.toggle("dark");
    titleTheme.classList.toggle("dark");
    // search box
    formgroup.classList.toggle("dark");
    inputBox.classList.toggle("dark");
    // user body info
    infoContainer.classList.toggle("dark");
    searchButton.classList.toggle("dark");
    // user body title The Octocat and paragrah
    infoTitleh2.classList.toggle("dark");
    infoTitleP.classList.toggle("dark");
    infoUserP.classList.toggle("dark");
    // user stats - 
    infoStats.classList.toggle("dark");
    userStats.classList.toggle("dark");
    // user location, blog, twitter, company
    // ^img
    imgLocation.classList.toggle("dark");
    imgWebsite.classList.toggle("dark");
    imgTwitter.classList.toggle("dark");
    imgCompany.classList.toggle("dark");
    // ^text
    // userLocation.style.color = "#FFFFFF";
    userLocation.classList.toggle("dark");
    webLiTxtA.classList.toggle("dark");
    twitter.classList.toggle("dark");
    company.classList.toggle("dark");
}