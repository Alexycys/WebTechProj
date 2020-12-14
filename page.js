const fetchUsers = () => {
    axios.get('http://localhost:8000/api/user')
        .then(response => {
            const users = response.data;
            console.log(`GET list users`, users);
        })
        .catch(error => console.error(error));
};


let buton = document.querySelector("#principal");

buton.addEventListener("click", ()=>{
    console.log("Works");
    fetchUsers();
})