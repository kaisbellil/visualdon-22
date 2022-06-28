import * as d3 from 'd3'

// Import des données
import data from '../data/countries.geojson'


let body = d3.select("body").append("svg").attr("width", 10).attr("height", 10);


// Exercice 2


const ex2 = d3.select("body").append("div").attr("id", "ex2");

ex2.append("h1").text("Exercice 2");

const populations = data.features.filter(feature => feature.properties.POP2005 > 1000000);
ex2.append("p").text("Pays > 1 million de population " + populations.length);


const Afrique = data.features.filter((d, i) => {
  return d.properties.REGION === 2
})


//D3.MEAN est la moyenne 
body = d3.select("body").append('h2').text("Exercice 2.2 Population par continent")
    /* body.append('p').text('Europe : ' + d3.mean(Europe)); */
body.append('p').text('Afrique : ' + d3.mean(Afrique, d => d.properties.POP2005));
/* body.append('p').text('Asie : ' + d3.mean(Asie));
body.append('p').text('Oceanie : ' + d3.mean(Oceanie));
body.append('p').text('Amerique : ' + d3.mean(Amerique));
 */




/* data.features.forEach(countri => {
    if (countri.properties.POP2005 > 1000000)
    console.log(countri.properties.NAME)
});


let Europe = 0;
let Afrique = 0;
let Asie = 0;
let Oceanie = 0;
let Ameriques = 0;

let compteurEurope = 0;
let compteurAfrique = 0;
let compteurAsie = 0;
let compteurOceanie = 0;
let compteurAmeriques = 0;

data.features.forEach(countri => {
    switch (countri.properties.REGION) {
        case 150:
            Europe = Europe + (countri.properties.POP2005);
            compteurEurope++;
            break;
        case 2:
            Afrique = Afrique + (countri.properties.POP2005);
            compteurAfrique++;
            break;
        case 142:
            Asie = Asie + (countri.properties.POP2005);
            compteurAsie++;
            break;
        case 9:
            Oceanie = Oceanie + (countri.properties.POP2005);
            compteurOceanie++;
            break;
        case 19:
            Ameriques = Ameriques + (countri.properties.POP2005);
            compteurAmeriques++;
            break;
        default:
            break;
    }
});

let MoyenneEurope = Math.round(Europe/compteurEurope);
let MoyenneAfrique = Math.round(Afrique/compteurAfrique);
let MoyenneAsie = Math.round(Asie/compteurAsie);
let MoyenneOceanie = Math.round(Oceanie/compteurOceanie);
let MoyenneAmeriques = Math.round(Ameriques/compteurAmeriques);

let body = d3.select("body").append("svg").attr("width", 10).attr("height", 10);
body = d3.select("body").append('h2').text("Exercice 2")
body = d3.select("body").append('h2').text("Population par continent")
body.append('p').text("Moyenne Europe "+MoyenneEurope);
body.append('p').text("Moyenne Afrique "+MoyenneAfrique);
body.append('p').text("Moyenne Asie "+MoyenneAsie);
body.append('p').text("Moyenne Océanie "+MoyenneOceanie);
body.append('p').text("Moyenne Amériques "+MoyenneAmeriques);  */



// exo 3 -Kais


// Data and color scale
// var data = d3.map(); // <-----------
var colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeBlues[7]);


// The svg
var svg = d3.select("svg#my_dataviz"), // <-----------
  width = +svg.attr("width"),
  height = +svg.attr("height");


// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(70)
  .center([0,20])
  .translate([width / 2, height / 2]);

  let card = d3.select("body").append("div")	
  .attr("class", "card")				
  .style("opacity", 0); 

// <-----------
// Load external data and boot
/* d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })
  .await(ready); */
// <-----------
  


// <-----------
// function ready(error, topo) {
// <-----------


  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(data.features) // <-----------
    .enter()
    .append("path")
      // draw each country // <-----------
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        // d.total = data.get(d.id) || 0; // <-----------
        return colorScale(d.properties.POP2005); // <-----------
    })
      .on('mouseover', function (c,d) {
        card.transition()
             .duration('50')
             card.html("<p>" + d.properties.POP2005 + "</p>") // <-----------
             .style("height", "auto")
             .style("left", window.event.clientX + "px")		
             .style("top", window.event.clientY + "px")
             .style("opacity", 1)
             
    })
    .on('mouseout', function () {
        card.transition()
             .duration('50')
             .style("opacity", 0);
    });
     


   /*  // exercice 3 Paul - histogramme

    // Diagramme en bâtons
let EuropePop = 0;
let AfriquePop = 0;
let AsiePop = 0;
let OceaniePop = 0;
let AmeriquePop  = 0;

data.features.forEach(country => {
    switch (country.properties.REGION) {
        case 150:
            EuropePop+=country.properties.POP2005;
            break;
        case 2:
            AfriquePop+=country.properties.POP2005;
            break;
        case 142:
            AsiePop+=country.properties.POP2005;
            break;
        case 9:
            OceaniePop+=country.properties.POP2005;
            break;
        case 19:
            AmeriquePop+=country.properties.POP2005;
            break;
        default:
            break;
    }
});

let continentPop = [
    {
        Continent: 'Europe',
        Population: EuropePop
    },
    {
        Continent: 'Afrique',
        Population: AfriquePop
    },
    {
        Continent: 'Asie',
        Population: AsiePop
    },
    {
        Continent: 'Océanie',
        Population: OceaniePop
    },
    {
        Continent: 'Amérique',
        Population: AmeriquePop
    }
]

continentPop.sort(function(b, a) {
    return a.Population - b.Population;
  });

  let card = d3.select("body").append("div")	
  .attr("class", "card")				
  .style("opacity", 0);

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 170},
    width = 400 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bar")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// X axis
var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(continentPop.map(function(d) { return d.Continent; }))
    .padding(0.2);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-12,20)rotate(-90)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
    .domain([0, 4000000000])
    .range([ height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));


svg.selectAll("mybar")
    .data(continentPop)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Continent); })
        .attr("y", function(d) { return y(0); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(0); })
        .attr("fill", "#69b3a2")
    .on('mouseover', function (c,d) {
        card.transition()
                .duration('50')
                card.html("<p>" + d.Population + "</p>")
                .style("height", "auto")
                .style("left", c.clientX + "px")		
                .style("top", c.clientY + "px")
                .style("opacity", 1)
                
    })
    .on('mouseout', function () {
        card.transition()
                .duration('50')
                .style("opacity", 0);
    })


svg.selectAll("rect")
  .transition()
  .duration(2000)
  .attr("y", function(d) { return y(d.Population); })
  .attr("height", function(d) { return height - y(d.Population); })

 */
 // exercice 4 - web scraping   


/* EXERCICE 4 */

// Capture d'écran HEIG
/*
(async () => {
    const browser = await puppeteer.launch({
        defaultViewport: {width: 1920, height: 1080}
    });
    const page = await browser.newPage();
    await page.goto('https://heig-vd.ch/formations/bachelor/filieres');
    await page.screenshot({ path: 'img/HEIG_Screenshot.png' });
  
    await browser.close();
  })();
*/

// Ressortez toutes les filières
/*
(async () => {
    const url = 'https://heig-vd.ch/formations/bachelor/filieres';
    const browser = await puppeteer.launch();
  
    try {
      const page = await browser.newPage();
      await page.goto(url);
  
      const filieres = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('table tr td.prog'))
        return tds.map(td => td.innerText)
      });

      console.table(filieres);

    } catch (error) {
      console.log('error', error);
    }
  })();
*/

 // Ressortez le nombre d’orientations par filière
 /*
 (async () => {
    const url = 'https://heig-vd.ch/formations/bachelor/filieres';
    const browser = await puppeteer.launch();
  
    try {
      const page = await browser.newPage();
      await page.goto(url);
  
      const filieres = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('table tr td.prog'))
        return tds.map(td => [td.innerText,td.rowSpan])
      });

      console.table(filieres);

    } catch (error) {
      console.log('error', error);
    }
  })();
  */

    