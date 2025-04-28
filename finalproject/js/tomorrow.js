

async function getFestival() {
    const festivalResp = await fetch(`festivals.json`);
    const festivalData = await festivalResp.json();

    let stages = [];

    for (let i = 0; i < festivalData.length; i++) {
        const currentFestival = festivalData[i];

        if (currentFestival.festival === "Tomorrowland 2024") {
            stages = currentFestival.stages;
        }
    }

    const stagesRef = document.querySelector("#stages");

    for (let i = 0; i < stages.length; i++) {
        const currentStage = stages[i];
        stagesRef.innerHTML += `<div><h2>${currentStage.name}</h2><img src="${currentStage.img}" ><button id=favoriteButton>Favorite</button></div>`;
        
    const favoriteBtn = document.querySelector("#favoriteButton");
    favoriteBtn.addEventListener("click", () => {
       const favorite = {
        festivalName: "Tomorrowland 2024",
        stageName: currentStage.name,
        stageImg: currentStage.img,
          }; 

        let savedFavorites = localStorage.getItem("favorites");
        
        if (savedFavorites !== null) {
            favorites = JSON.parse(savedFavorites);
            }
        if(favoriteBtn.textContent === "Favorite") {
            let favorites = [];
            favoriteBtn.textContent = "Unfavorite";
            favorites.push(favorite);
        } else {
            favoriteBtn.textContent = "Favorite";
        }


        console.log(favoriteBtn.textContent, favorite)
    })
    
    

    


// favoriteBtn.onclick =  localStorage.setItem("favorites", JSON.stringify(favorite));

// console.log("favorites", favorite)
}

}







getFestival();