const createForm = document.getElementById("createForm");
const animalOutput = document.getElementById("outputCards");

createForm.addEventListener('submit' , function(event)  {
    event.preventDefault();
    console.log(this.name);
    const data =    {
        givenName: this.givenname.value,
        commonName: this.commonname.value,
        type: this.type.value,
        price: this.price.value,
        sex: this.sex.value,
        colour: this.colour.value,
        arrival: this.date.value,
    }

    fetch("http://localhost:8081/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
    }).then(response => { 
        return response.json(); 
    }).then(data => { 
        renderAnimals();
        this.reset();
    }).catch(error => console.log(error));
});

function renderAnimals() {
    fetch("http://localhost:8081/get")
        .then(response => response.json())
        .then(arrayOfAnimals => {
            console.log("Animals: ", arrayOfAnimals);
            animalOutput.innerHTML = '';
            arrayOfAnimals.forEach(function(animal) {
                console.log(animal);
    
                const card = document.createElement("div");
                card.className = "card";
                animalOutput.appendChild(card);
    
                const cardBody = document.createElement("div");
                cardBody.className = "card-body";
                card.appendChild(cardBody);
    
                const title = document.createElement("h5");
                title.className = "card-title";
                title.innerText = "Name: " + animal.givenName + " the " + animal.commonName;
                cardBody.appendChild(title);

                const type = document.createElement("p");
                type.className = "card-body";
                type.innerText = "Type: " + animal.type;
                cardBody.appendChild(type);

                const price = document.createElement("p");
                price.className = "card-body";
                price.innerText = "Price: " + animal.price;
                cardBody.appendChild(price);
    
                const sex = document.createElement("p");
                sex.className = "card-body";
                sex.innerText = "Sex: " + animal.sex;
                cardBody.appendChild(sex);
    
                const colour = document.createElement("p");
                colour.className = "card-body";
                colour.innerText = "Colour: " + animal.colour;
                cardBody.appendChild(colour);

                const arrival = document.createElement("p");
                arrival.className = "card-body";
                arrival.innerText = "Date: " + animal.arrival;
                cardBody.appendChild(arrival);

                const updateButton = document.createElement("button");
                updateButton.className = "card-link";
                updateButton.innerText = "Update";
                updateButton.addEventListener("click", function () {
                    const updateData = {
                        givenName:prompt("Update the name: ", animal.givenName),
                        price:prompt("Update the price: ", animal.price),
                        colour:prompt("Update the colour: ", animal.colour),
                        arrival:prompt("Update the date: ", animal.arrival),
                        commonName: animal.commonName,
                        type: animal.type,
                        sex: animal.sex
                    }
                    updateAnimal(updateData, animal.id);
                })
                cardBody.appendChild(updateButton);

                const deleteButton = document.createElement("button");
                deleteButton.className = "card-link";
                deleteButton.innerText = "Delete";
                deleteButton.addEventListener("click", function () {
                    deleteAnimal(animal.id);
                })
                cardBody.appendChild(deleteButton);
            });
        }).catch(error => console.error(error));
}
    
renderAnimals();

function updateAnimal(data, id) {
    fetch("http://localhost:8081/update/?id="+ id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json"
        }
    }).then(response => { 
        return response.json(); 
    }).then(data => { 
        renderAnimals();
    }).catch(error => console.log(error));
}
    
function deleteAnimal(id) {
    fetch("http://localhost:8081/remove/" + id, {
            method: "DELETE"
    }).then(response => {
            console.log(response);
            renderAnimals();
    }).catch(error => console.error(error));
}