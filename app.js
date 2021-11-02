var form = document.getElementById("myForm");
var profilePicture = document.querySelector(".info__ProfilePic");
var infoTitleH2 = document.querySelector(".info__title");
var month = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

form.addEventListener("submit", function(e){
    e.preventDefault();

    var search = document.getElementById("search").value;
    var originalName = search.split(" ").join("");


    fetch("https://api.github.com/users/" + originalName)
    .then((result) => result.json())
    .then((data) => {
        console.log(data);

        // var now = new Date((${data.created_at}).tostring());
        profilePicture.innerHTML = 
        `
            <a target="_blank" href="https://www.github.com/${originalName}"> <img src="${data.avatar_url}"/>
        `;
        infoTitleH2.innerHTML = 
        `<h2>${data.name}</h2>` +
        `<a href="#">@${data.login}</a>` +
        `<p>Joined ${data.created_at}</p>`;
        
    })

})