const seeds = document.querySelectorAll(".seed");
const selector = document.getElementById("seedselection");
const seedContainer = document.getElementsByClassName("seeds")[0];
const loading = document.getElementsByClassName("farmgeneration")[0];
const drone = document.getElementsByClassName("drone")[0];
const sprinkler= document.getElementsByClassName("watersprinkler")[0]
const waaterlevel= document.getElementsByClassName("waterlevel")[0];
const farmland = document.getElementsByClassName("farmland")[0]

let state = localStorage.getItem("state");
let type = "wheat";
let stage = localStorage.getItem("stage");

const changeImage = (day) => {
    farmland.style.backgroundImage = `url("./assets/${day}.jpg")`;
}
//initial setup
if(state != undefined){
    farmland.style.display = "flex";
    changeImage(state);
}

//change image every day
let k = 1;

const currentTime = new Date().getHours() + ":" + new Date().getMinutes();
const currentDate = new Date().getDate() + ":" + (parseInt(new Date().getMonth()) + 1);

setInterval(() => {
    if (k <= 45) {
        localStorage.clear();
        localStorage.setItem("state", `day${k}`);
        changeImage(`day${k}`);
        k++
    } else {
        k = 0;
    }
    //24hrs => 86400secs
}, [86400])


//farm generation
document.getElementById("gen").addEventListener("click", (e) => {
    loading.style.display = "flex";
    setTimeout(() => {
        farmland.style.display = "flex";
        localStorage.setItem("stage", 1);
    }, 1500)
    setTimeout(() => {
        loading.style.display = "none"
    }, 2000)
})

//seed selection
selector.onclick = (e) => {
    seedContainer.style.display = "flex";
    seedContainer.style.animationName = "show";
}

seeds.forEach((seed) => {
    seed.addEventListener("click", (e) => {
        seeds.forEach((s) => s.classList.remove("selected"));
        seed.classList.add("selected");
        type = seed.getElementsByClassName("seedItem")[0].classList[1];
        localStorage.removeItem("stage");
        localStorage.setItem("stage", 2);
    })
})


document.getElementById("close").addEventListener("click", (e) => {
    seedContainer.style.animationName = "close";
    seedContainer.style.display = "none";
})


// drone fly 
const watercontainer=document.createElement("div")
const options = document.querySelectorAll(".ldrone");
let x=0, stg=3;

const runDrone = (item, stg) => {
    let id = item.id;
    item.addEventListener("click", (e) => {
        drone.style.display = "flex"
        setInterval(() => {
            x += 1;
            if (x == 100) {
                drone.style.display = "none"; x = 0; watercontainer.style.display = "none";
                localStorage.setItem("date", currentDate);
                localStorage.setItem("time", currentTime);
                if (id == "seedItem") {
                    localStorage.setItem("state", "day1");
                    changeImage("day1");
                }
            }
            else {
                drone.style.left = `${x}%`;
                sprinkle(id);
                localStorage.removeItem("stage");
                localStorage.setItem("stage", 5)
            }
        }, 1000)
    })
}


options.forEach((option) => {
    runDrone(option);
})


const sprinkle=(item)=>{
    watercontainer.classList.add("watercontainer")
    waaterlevel.appendChild(watercontainer)

    for (i=1; i<3; i++){
        let drop = document.createElement('div');
        drop.classList.add(item);
        if(item == "seedItem"){
            drop.classList.add(type)
        }
        watercontainer.appendChild(drop);
        drop.style.display="flex";
        let a=0;
        setInterval(()=>{
            a+=5;
            drop.style.top=`${a*i}px`
            drop.style.left=`${x+i+4.35}%`
        },50*i)
    }
}

//end game
document.getElementById("harvest").addEventListener("click", () => {
    changeImage("day0");
        document.getElementsByClassName("notify")[0].style.animationName = "slide";
        localStorage.clear();
})