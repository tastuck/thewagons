function getFestival()
{
    let stages = [];
    let currentIndex= 0;

    fetch("../festivals.json")
        .then(response => response.json())
        .then(data => {
            const festival = data.find("Desert Daze 2022");
            if(!festival) {
                document.getElementById("stageName").textContent = "festival not found";
                return;
            }

            stages = festival.stages;
            showStage(currentIndex);
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