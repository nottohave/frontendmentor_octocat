// practice fetch function

// fetch('https://api.github.com/user', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         name: 'octocat'
//     })
// }).then(res => {
//     return res.json()
//     })
//     .then(data => console.log(data))
//     .catch(error => console.log('ERROR'))

// practice callback and learning promise
console.log("Start");

function loginUser(email, password) {
    setTimeout(() => {
        console.log("We have the data.");
        return({ userEmail: email });
    }, 3000);
}

const user = loginUser('something@gmail.com', '123456')
console.log("Finish");