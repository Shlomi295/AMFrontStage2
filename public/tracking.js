var allfishes=[];
var selectmenu=document.getElementById("dropmenu");
var opt=[];
fetch('/getAll').then(response => response.json())
.then((json) => {

  allfishes=json;
  var fishes=[];
  for(var i=0;i<allfishes.length;i++){
    fishes.push(allfishes[i].fish);
  }

  var uniqueSet=new Set(fishes);// console.log(uniqueSet);
  var uniqueFishes=Array.from(uniqueSet);// console.log(uniqueFishes);

  for(var j=0;j<uniqueFishes.length;j++){
    opt=document.createElement("option");
    opt.innerHTML=uniqueFishes[j];
    opt.value=uniqueFishes[j];
    selectmenu.appendChild(opt);
  }
  
  
})
.catch(err => console.log(err));


var coords=[{"lat":-33.871558,"lon":151.243445,"info":"Dummy Fish 1"},{"lat":-34.861812,"lon":154.2463330,"info":"Dummy Fish 2"}]

// initialize map
map = L.map('mapDiv').setView(coords[0], 2);

// set map tiles source
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 16,
}).addTo(map);

var marker=[];
function getFishLocation(){
  
  var selectedFishSpecie = $("#dropmenu").children("option:selected").val();
  // console.log(selectedFishSpecie);

var fishcoords=[];
for(j=0;j<=allfishes.length-1;j++){
  fishcoords.push({"lat":allfishes[j].lat,"lon":allfishes[j].long});
  
}
map.eachLayer((layer) => {
  layer.remove();
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 16,
}).addTo(map);

// set map tiles source

  for(var k=0;k<=allfishes.length;k++){
    if (selectedFishSpecie == allfishes[k].fish) {
        // console.log(allfishes[k]);
        map.setView(fishcoords[k],1);
        marker = L.marker(fishcoords[k]).addTo(map).bindPopup("Specie: "+allfishes[k].fish+", Lat: "+allfishes[k].lat+", Lng: "+allfishes[k].long);   
    }
  }
  
}