import {getNgonPoints,getGridXY} from './scripts/ngon.js'
import {createNgonSvg,createSvg,createStarSvg,createSvgPattern,createSvgLinearGradient} from './scripts/svg.js'
import {hexPatterns} from './data/hexagonpattersn.js';
console.clear();

let bodyStyles = document.body.style;
const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
// BUTTONS
var selectPanel = document.getElementById('idColorBtns');
var  selectedColor = $("#defaultColour").css("backgroundColor");
var  selectedpngid;
setColorButtons(hexPatterns,defs,selectPanel)
$('.classColorBtns button').on("click", function(event) {
  selectedpngid = event.target.id
  selectedColor = $(event.target).css("backgroundColor");
  bodyStyles.setProperty(`--hexcolor4`, selectedpngid?"url(#"+selectedpngid+"1)":selectedColor);
});
let svgW=804
let svgH=660

// CreateSVG()
const svg=createSvg("svg",0,0 ,svgW,svgH) //document.getElementById("svg23");
svg.setAttribute("xmlns","http://www.w3.org/2000/svg");
svg.setAttribute("style","border:1px solid black");
// svg.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");
svg.setAttribute("viewBox",`0 0 ${svgW} ${svgH}`);
svg.appendChild  (defs)
let rad=38
drawGridSvg(svgW+rad, svgH+rad,rad,svg,true,2,0,0)

document.getElementById("idSvgDiv").appendChild(svg);

for(let x=0;x<3;x++) {
  for(let y=0;y<3;y++) {
    flowerMark([3+x*6+(-3*(y%2)),3+y*6]);
  } }

function setColorButtons(hexPatterns,svgDefs,selectPanel) {
  hexPatterns.forEach((pattern) => {
    var button = document.createElement("button");
    if (pattern.color) {
        button.setAttribute("style",`background: ${pattern.color}`);
        if (!selectedColor) {selectedColor=pattern.color}
    } else if (pattern.color2) {
      button.setAttribute("id",pattern.id);
      // button.setAttribute("style",`background-image: linear-gradient(to right, #2b5876 0%, #4e4376  51%, #2b5876  100%);`);
      button.setAttribute("style",`background-image: linear-gradient(to top, ${pattern.color1} 0%, ${pattern.color2} 100%);`);
      svgDefs.appendChild(createSvgLinearGradient(`${pattern.id}1`,pattern.color1,pattern.color2));
    } else {
      button.setAttribute("id",pattern.id);
      button.setAttribute("style",`background-size: cover;background-image:url(${pattern.url});`);
      svgDefs.appendChild(createSvgPattern(`${pattern.id}1`,pattern.url))
    }
    selectPanel.appendChild(button);

  });
}

function flowerMark(start) {
  [[0,0],[1,0],[-1,1],[1,1],[0,2],[1,2]].forEach((item) => {
    // console.log(start[0],start[1],start[0]+item[0],start[1]+item[1])
    const polygon=document.getElementById(`id${start[0]+item[0]-1}-${start[1]+item[1]-1}`)
    if (!polygon) {return}
    polygon.setAttributeNS(null,"class","hexcolor2")
  });
  const polygon=document.getElementById(`id${start[0]-1}-${start[1]}`)
  if (!polygon) {return}
  polygon.setAttributeNS(null,"class","hexcolor3")
}


let mouseovercolor = null
function CreateHexagonSvg(x, y, r,svg2,rotate=false) {
    var polygon = createNgonSvg(x, y, r, 6,rotate)
    polygon.setAttribute("class","hexcolor1")
    polygon.dispatchEvent(new Event('click'));
    polygon.dispatchEvent(new Event('mouseenter'));
    polygon.dispatchEvent(new Event('mouseout'));
    polygon.addEventListener('click', event => {
      mouseovercolor = null
      bodyStyles.setProperty(`--${event.target.classList[0]}`, selectedpngid?"url(#"+selectedpngid+"1)":selectedColor);
      // event => alert(event.target.dataset.key)
      // event.target.style.fill=selectedpngid?"url(#"+selectedpngid+"1)":selectedColor;
      // console.log(event.target.className) //id $(event.target).attr('class'))
    } )
    polygon.addEventListener('mouseenter', event => {
      mouseovercolor = bodyStyles.getPropertyValue(`--${event.target.classList[0]}`)
        bodyStyles.setProperty(`--${event.target.classList[0]}`, selectedpngid?"url(#"+selectedpngid+"1)":selectedColor);
      } )
    polygon.addEventListener('mouseout', event => {
      if (mouseovercolor != null) {
        bodyStyles.setProperty(`--${event.target.classList[0]}`, mouseovercolor);
        mouseovercolor = null
    } } )
    svg2.appendChild(polygon);
    return polygon;
}
function drawGridSvg(width, height,r=50,svg2,rotate=true,padding=0,hx=0,hy=0) {
    let polygon
    // console.log(getGridXY(r,width,height,rotate,padding))
    getGridXY(r,width,height,rotate,padding).map((p) => {
      console.log(p[0], p[1], p[2], p[3])

      polygon=CreateHexagonSvg(hx+p[0], hy+p[1],r,svg2,rotate);
      polygon.setAttributeNS(null,"class","hexcolor1")
      // if (p[2]==4) {polygon.setAttribute("style","fill:green;stroke:black;stroke-width:1;fill-rule:nonzero;")}
      polygon.setAttribute("id",`id${p[2]}-${p[3]}`);
  });
}



