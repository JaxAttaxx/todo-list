console.log("Hello!")

window.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    axios.get("/api/todos")
    .then((response) => {
        const mainTodo = response.data
        console.log(mainTodo)
        const mapItems = mainTodo.map((data) => {
            return `
            <div class="card">
            <ul>
            <li>${data.todo}</li>
            </ul>
            </div>
            `
        })
        let bodyDiv = document.querySelector(".card")
        bodyDiv.innerHTML = mapItems.join("")
    })
})