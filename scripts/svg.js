import {getNgonPoints} from './ngon.js'
const svgSvgns = "http://www.w3.org/2000/svg";
// https://stackoverflow.com/questions/64945006/how-to-change-the-fill-color-of-an-svg-by-clicking-on-it
export function createSvg(type="svg",x=0, y=0, w="100%", h="100%", fill="white", stroke="black",strokew=2) {
    const newsvg = document.createElementNS(svgSvgns, type);
    newsvg.setAttribute("x", x);
    newsvg.setAttribute("y", y);
    newsvg.setAttribute("width", w);
    newsvg.setAttribute("height", h);
    // newsvg.setAttribute("fill", fill);  // "#000"
    // newsvg.setAttribute("stroke", stroke);
    // newsvg.setAttribute("stroke-width", strokew);
    return newsvg;
    // svgElem.style.display = "block";
    // var g = document.createElementNS(xmlns, "g");
    // svgElem.appendChild(g);
    // g.setAttributeNS(null, 'transform', 'matrix(1,0,0,-1,0,300)');

}

export function createSvgPattern(patternId, patternUrl) {
    // Create the pattern element
    var pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    pattern.setAttributeNS(null, "id", patternId);
    pattern.setAttributeNS(null,'width', '100%');
    pattern.setAttributeNS(null,'height', '100%');
    pattern.setAttributeNS(null,"patternContentUnits","objectBoundingBox");
    // pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    var image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    image.setAttributeNS(null,'width', '1');  //100
    image.setAttributeNS(null,'height', '1'); //100
    image.setAttributeNS(null,'preserveAspectRatio', 'none');
    image.setAttributeNS(null,'href', patternUrl);
    // image.setAttribute('xlink:href', patternUrl);
    pattern.appendChild(image);
    return pattern
    /* <defs><pattern id="pattern1" height="100%" width="100%" patternContentUnits="objectBoundingBox">
    <image height="1" width="1" preserveAspectRatio="none" xlink:href="http://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Gl%C3%BChwendel_brennt_durch.jpg/399px-Gl%C3%BChwendel_brennt_durch.jpg" />
    </pattern></defs> */
}
export function createSvgLinearGradient(id, top="#ff0000",bottom="#0000ff") {
  let grad = document.createElementNS(svgSvgns, "linearGradient");
  grad.setAttributeNS(null, "id", id);
  grad.setAttributeNS(null, "x1", "0%");
  grad.setAttributeNS(null, "x2", "0%");
  grad.setAttributeNS(null, "y1", "100%");
  grad.setAttributeNS(null, "y2", "0%");
  let stopTop = document.createElementNS(svgSvgns, "stop");
  stopTop.setAttributeNS(null, "offset", "0%");
  stopTop.setAttributeNS(null, "stop-color",top );
  grad.appendChild(stopTop);
  let stopBottom = document.createElementNS(svgSvgns, "stop");
  stopBottom.setAttributeNS(null, "offset", "100%");
  stopBottom.setAttributeNS(null, "stop-color", bottom);
  grad.appendChild(stopBottom);
  return grad
}
export function createNgonSvg(x, y, r,n=6,rotate=false) {
    let points=getNgonPoints(x, y, r, n,(rotate?90:0)).map((p) => p.join(',')).join(' ');
    let polygon = document.createElementNS(svgSvgns, "polygon");
    polygon.setAttribute("points",points);
    return polygon;
}
export function createStarSvg(x, y, r) {
    var polygon = document.createElementNS(svgSvgns, "polygon");
    polygon.setAttribute("style","width:70px;height:70px;")
    polygon.setAttribute("points","10,1 4,19.8 19,7.8 1,7.8 16,19.8");
    polygon.setAttribute("style","fill:blue;stroke:yellow;stroke-width:1;fill-rule:nonzero;")
    return polygon;
}
