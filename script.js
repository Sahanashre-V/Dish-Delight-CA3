let randommealimg = document.getElementById("randommealimg");
let randommealname = document.getElementById("randommealname");
let mealname = document.getElementById("mealname");
let usermealimage = document.getElementById("usermealimage");
let searchicon = document.getElementById("searchicon");
let userchoice = document.getElementById("userchoice");
let userchoicenotfound = document.getElementById("userchoicenotfound");

let modal = document.getElementById("modal");
let table = document.getElementById("table");
let exitimg = document.getElementById("exitimg");
let popup = document.getElementById("popup");

// fetching data for random images from random api
fetch (`https://www.themealdb.com/api/json/v1/1/random.php`)
.then(response => response.json())
.then(data => {
    console.log(data);
    randommealname.innerText = `${data.meals[0].strMeal}`
    randommealimg.src = `${data.meals[0].strMealThumb}`

    // styling for randommealname
    randommealname.style.fontSize = "1.3rem"
    randommealname.style.paddingTop = "13px"

    // adding images, ingridients, quanitity and instructions to modal
    popup.innerHTML+=`
            <img src=${data.meals[0].strMealThumb} id="modalimg">`
            table.innerHTML += `<tr>
                <th id="topic">Ingridients</th>
                <th id="topic">Quantity</th>
            </tr>`
    let modalimg = document.getElementById("modalimg")

    //styling modalimg
    modalimg.style.height = "180px"
    modalimg.style.borderRadius="10px"
    modalimg.style.border = "3px solid #ED1FA7"
    modalimg.style.boxShadow = "rgba(30, 10, 30, 0.27) 1.95px 1.95px 2.6px"
    
// for loop from 0 to 21 because strIngredient are from 0 to 20. If value of strIngridients is not null then adding it to the table.
    for(let i=0; i<21 ; i++){
        if (data.meals[0][`strIngredient${i}`]!=null){
            table.innerHTML+=`
            <tr>
            <td>${data.meals[0][`strIngredient${i}`]}</td>
            <td>${data.meals[0][`strMeasure${i}`]}</td>
            </tr>`
        }
    
    }

    //appending popup to table.
    popup.appendChild(table);
    popup.innerHTML+= `<h2>Instructions</h2>
    <p>${data.meals[0].strInstructions} </p>`

})

.catch(error => console.log("Error",error))

// styling for mealimages
randommealimg.style.height = "300px"
randommealimg.style.border = "4px solid #ED1FA7"
randommealimg.style.borderRadius = "10px"
randommealimg.style.boxShadow = "rgba(30, 10, 30, 0.27) 1.95px 1.95px 2.6px"
randommealimg.style.cursor = "pointer"


// styling for mealname
randommealname.style.fontFamily = 'Caveat, cursive';

//fetching data from second api according to user's search
searchicon.addEventListener("click", function () {
    let inputvalue = document.getElementById("inputvalue").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputvalue}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            userchoice.innerHTML = "";
            userchoicenotfound.innerHTML =""
            if (data.meals && data.meals.length > 0) {
                data.meals.forEach(element => {
                    userchoice.innerHTML += `<div class="user" id="userselection">
                        <img src="${element.strMealThumb}" alt="" id="usermealimage">
                        <p id="mealname">${element.strMeal}</p>
                    </div>`;
                });
            } 
            else {
                userchoicenotfound.innerHTML += `<p>No results found</p>`;
                userchoicenotfound.style.fontFamily = "Caveat, cursive";
                userchoicenotfound.style.fontSize = "1.5rem";
            }

        })
        .catch(error => console.log("Error", error));
});

//show modal
randommealimg.addEventListener("click",function(){
    modal.showModal();
})

//close modal
exitimg.addEventListener("click",function(){
    modal.close()
})