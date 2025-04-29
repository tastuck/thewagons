function getFestival()
{
    let stages = []; //empty array
    let currentIndex= 0; //this will cycle through the stages

    //get data from the json, which is serving as our api integration
    fetch("festivals.json")
        //this is the response handler. in phpstorm, there's a prompt that says Promise<Response>
        .then(response => {
            //is the response successful. was the file found. if it wasn't, there was a network error.

            if (!response.ok) throw new Error("Network error");
            //return the response if it was successful in json. json converts response to something js can read
            return response.json();
        })//in phpstorm it says Promise<Successful> right here.

        //after fetch, then the stuff within the json can be worked with
        .then(data => {
            //festivals is const. we have an array of festivals. .find loops through the array to find festival called festival.festivalName
            const festival = data.find(f => f.festival === "Camp Flog Gnaw 2014");
            //stage name is whats being displayed on the page. stage name is the element on the html we will use to display
            //festival not found error message if the array returns desert daze = false
            if (!festival) {
                document.getElementById("stageName").textContent = "Festival not found";
                return;
            }

            stages = festival.stages; //show the stages of the selected festival
            showStage(currentIndex); //we are in let currentIndex which is 0. it will display first stage
        });


    function showStage(i) {
        const stage = stages[i];
        document.getElementById("stageName").textContent = stage.name;
        document.getElementById("stageImg").src = stage.img || "img/placeholder.jpg";
    }

    document.getElementById("prevBtn").addEventListener("click", () => {
        if(currentIndex > 0) {
            currentIndex--;
            showStage(currentIndex);
        }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        if(currentIndex < stages.length - 1) {
            currentIndex++;
            showStage(currentIndex);
        }
    });
}

getFestival();
