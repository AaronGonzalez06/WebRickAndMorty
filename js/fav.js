let fav = JSON.parse(localStorage.getItem('favPersonajes'));

if(fav.length == 0){

  let section = document.getElementById("mostrar");
  let div = document.createElement("div");
  div.style.backgroundColor = "#FFFFFF";
  div.classList.add("noFav");
  let img = document.createElement("img");
  let p = document.createElement("p");
  img.src = "./assets/rick.jpg";
  img.classList.add('imgnofav');
  p.textContent = "Nothing in favorites";
  div.appendChild(img);
  div.appendChild(p);
  section.appendChild(div);

}else{
  let url= "https://rickandmortyapi.com/api/character/";
  fav.forEach(function(dato) {
    url+=","+dato;
  });
  indexFav(url);
}


document.addEventListener("click", function(event) {
    if (event.target.classList.contains("imgFav")) {
      const currentSrc = event.target.getAttribute("src");
      if(currentSrc === "./assets/nave2.png"){
        console.log("delete");
        const paragraph = event.target.previousElementSibling;        
        let deleteFav = JSON.parse(localStorage.getItem('favPersonajes'));

        const indice = deleteFav.indexOf(paragraph.textContent.replace('#',''));
        if (indice !== -1) {
            deleteFav.splice(indice, 1);
        }
        localStorage.setItem('favPersonajes',JSON.stringify(deleteFav));
        url= "https://rickandmortyapi.com/api/character/";
        deleteFav.forEach(function(dato) {
            url+=","+dato
        });
        const elemento = document.getElementById('mostrar');
        elemento.innerHTML = '';
        if(deleteFav.length == 0){
          let section = document.getElementById("mostrar");
          let div = document.createElement("div");
          div.style.backgroundColor = "#FFFFFF";
          div.classList.add("noFav");
          let img = document.createElement("img");
          let p = document.createElement("p");
          img.src = "./assets/rick.jpg";
          img.classList.add('imgnofav');
          p.textContent = "Nothing in favorites";
          div.appendChild(img);
          div.appendChild(p);
          section.appendChild(div);
        }else{
          indexFav(url);
        }
      }
    }
  });