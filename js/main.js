let urlSearch = "";
let statusSearch ="";
let genderSearch ="";
let nameSearchUrl = "";
index();

// Detectar el evento de desplazamiento
window.addEventListener('scroll', function() {
    if (estaAlFinal()) {
        let proximaUrl = this.localStorage.getItem('proximaUrl');
        urlScroll(proximaUrl);
    }
});



// Obtener referencia al elemento input
const nameSearch = document.getElementById('nameSearch');

// Agregar un event listener al input
nameSearch.addEventListener('input', function() {
    const num = nameSearch.value.length;
    if(num > 3){
        const elemento = document.getElementById('mostrar');
        elemento.innerHTML = '';
        nameSearchUrl = nameSearch.value;
        let url = urlChanges(nameSearchUrl,statusSearch,genderSearch);
        console.log("🚀 ~ file: main.js:28 ~ nameSearch.addEventListener ~ url:", url)
        fetch(url)
        .then(res => res.json())
        .then(response => {
            console.log(response);        
            let section = document.getElementById("mostrar");
            localStorage.setItem('proximaUrl',response.info.next);
            response.results.forEach(function(dato) {
                //cambiar color de la caja
                let div = document.createElement("div");
                if(dato.status == "Alive"){
                    div.style.backgroundColor = "#F0C419";
                } else if(dato.status == "Dead"){
                    div.style.backgroundColor = "#FF6F61";
                } else if(dato.status == "unknown"){
                    div.style.backgroundColor = "#87CEEB";
                }
                //caja donde va la información
                let img = document.createElement("img");
                let imgFav = document.createElement("img");
                let p = document.createElement("p");
                let specie = document.createElement("p");
                let origen = document.createElement("p");
                let gender = document.createElement("p");
                let divInfoNum = document.createElement("div");
                let idPersonaje = document.createElement("p");
                div.classList.add("personaje");
                divInfoNum.classList.add("favNum");
                img.src = dato.image;
                img.classList.add("imgPersonaje");
                if(esFav(dato.id)){
                    imgFav.src = "./assets/nave2.png"
                }else{
                    imgFav.src = "./assets/nave.png"
                }
                imgFav.classList.add("imgFav");
                p.textContent = dato.name;
                specie.textContent ="Specie: "+ dato.species;
                origen.textContent ="Origin: "+ dato.origin.name;
                gender.textContent ="Gender: "+ dato.gender;
                idPersonaje.textContent = "#" + dato.id;
                idPersonaje.classList.add("idpersonaje");
                divInfoNum.appendChild(idPersonaje);
                divInfoNum.appendChild(imgFav);
                div.appendChild(divInfoNum);
                div.appendChild(img);
                div.appendChild(p);
                div.appendChild(specie);
                div.appendChild(origen);
                div.appendChild(gender);
                section.appendChild(div);
            });
        });
    }else{
        const elemento = document.getElementById('mostrar');
        elemento.innerHTML = '';
        index();
    }
});



//filtro radiobutton
const radioButtons = document.querySelectorAll('input[type="radio"]');
localStorage.setItem('urlSearch',"https://rickandmortyapi.com/api/character/?name=&status=&gender=");

radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('click', function() {
        let urlMod = localStorage.getItem('urlSearch');
        if(radioButton.value == 'alive'){
            statusSearch = radioButton.value;
        } else if(radioButton.value == 'dead'){
            statusSearch = radioButton.value;
        } else if(radioButton.value == 'unknownStatus'){
            statusSearch = "unknown";
        }else if(radioButton.value == 'female'){
            genderSearch = radioButton.value;
        } else if(radioButton.value == 'male'){
            genderSearch = radioButton.value;
        } else if(radioButton.value == 'unknownGender'){
            genderSearch = "unknown";
        } else if(radioButton.value == 'genderless'){
            genderSearch = radioButton.value;
        } else if(radioButton.value == 'nadaGender'){
            genderSearch = "";
        } else if(radioButton.value == 'nadaStatus'){
            statusSearch = "";
        }

        const elemento = document.getElementById('mostrar');
        elemento.innerHTML = '';
        urlSearch = urlChanges(nameSearchUrl,statusSearch,genderSearch);
        urlScroll(urlSearch);
        localStorage.setItem('urlSearch',urlSearch);
        
    });
});

// creamos el localstorage
if(!localStorage.getItem('favPersonajes')){
    let fav = [];
    localStorage.setItem('favPersonajes',JSON.stringify(fav));
}


/* Lógica Fav
*  Forma interesante de acceder a los elementos del DOM
* 
*/

  document.addEventListener("click", function(event) {
    if (event.target.classList.contains("imgFav")) {
      const currentSrc = event.target.getAttribute("src");
      if (currentSrc === "./assets/nave.png") {
        //add
        const paragraph = event.target.previousElementSibling;        
        let addFav = JSON.parse(localStorage.getItem('favPersonajes'));
        addFav.push(paragraph.textContent.replace('#',''));
        localStorage.setItem('favPersonajes',JSON.stringify(addFav));
        event.target.setAttribute("src", "./assets/nave2.png");
      } else if(currentSrc === "./assets/nave2.png"){
        //delete
        console.log("delete");
        const paragraph = event.target.previousElementSibling;        
        let deleteFav = JSON.parse(localStorage.getItem('favPersonajes'));

        const indice = deleteFav.indexOf(paragraph.textContent.replace('#',''));
        if (indice !== -1) {
            deleteFav.splice(indice, 1);
        }
        localStorage.setItem('favPersonajes',JSON.stringify(deleteFav));
        event.target.setAttribute("src", "./assets/nave.png");
      }
    }
  });
