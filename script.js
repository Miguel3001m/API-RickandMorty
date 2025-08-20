const pageInput = document.getElementById("pageInput")
const searchBtn = document.getElementById("searchBtn")
const resultsDiv = document.getElementById("results")

async function fetchCharacters(page) {
    resultsDiv.innerHTML = "<p>Carregando...</p>"

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        const data = await response.json()
        //console.log(data)

        if (data.error) {
            resultsDiv.innerHTML = "<p>Página Inválida! tente outra. (1/42)</p>"
            return
        }

        resultsDiv.innerHTML = ""
        data.results.forEach(Character => {
            const card = document.createElement("div")
            card.className = "card"
            card.innerHTML = `
        <img src="${Character.image}" alt="${Character.name}">
        <h3>${Character.name}</h3>
        <p><strong>Status:</strong>${Character.status}</p>
        <p><strong>Espécie:</strong>${Character.species}</p>
        `
            resultsDiv.appendChild(card)
        })

    } catch (error) {
        //console.log("deu ruim")
        resultsDiv.innerHTML = "<p>Error ao buscar personagem !!! </p>"
    }
}

searchBtn.addEventListener("click", () => {
    const page = pageInput.value.trim()
    if(page){
        fetchCharacters(page)
    }else{
        resultsDiv.innerHTML = "<p>Digite um número de página </p>"
    }
})

fetchCharacters(1)