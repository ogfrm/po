  //  https://www.gorillasun.de/blog/a-guide-to-hexagonal-grids-in-p5js/
  export function getNgonPoints(x, y, r, n = 6,rotate=0) {
    const a = 2 * Math.PI / n;
    const rotateAngle=a*rotate/180
    const points = Array.from(Array(n+1).keys()).map((n, i) => {  // [0,1,2,3,4,5,6]
      return [x + r * Math.cos(rotateAngle+a * i), y + r * Math.sin(rotateAngle+a * i)];
    })
    return points;
}
export function drawNgon(x=100, y=100,r=50,n=6,ctx=undefined,rotate=0)
{
    ctx.beginPath();
    getNgonPoints(x, y, r, n,rotate).map((p) => ctx.lineTo (p[0], p[1]));
    // const a = 2 * Math.PI / n;
    // for (var i = 0; i <= n; i += 1)
    // { ctx.lineTo (x + r * Math.cos(rotateAngle+i * a), y + r * Math.sin(rotateAngle+i * a)); }
    ctx.stroke();
    ctx.closePath();
}

export function getGridXY(r,gridWidth,gridHeight,rotate=false,padding=0){
    let a = 2 * Math.PI / 6, b = r * (1 + Math.cos(a)), c = r * (Math.sin(a)), rt=[]
    if (rotate) { c = r * (1 + Math.cos(a)); b = r * (Math.sin(a));}
    c+=padding
    b+=padding
    for(let line=0,cY=0; cY < gridHeight; line++,cY+=c ){
        for(let col = 0,cX=0; cX <= gridWidth-b*2-b*(line%2); col++){
            cX=b*2*(col) +b*(line%2)
            rt.push([cX,cY,col,line])
        }
    }
    return rt;
}
export function makeGrid(ctx,r,gridWidth,gridHeight,rotate=false,x=0,y=0){
    ctx.font = "7px serif";
    getGridXY(r,gridWidth,gridHeight,rotate).map((p) => drawNgon(p[0], p[1], r,6,ctx,(rotate?90:0)));
}
export function makeSpiral(centerX, centerY,r,ctx, count ) {
    var x = centerX,
        y = centerY,
        angle = Math.PI / 3,
        dist = Math.sin(angle) * r*2,
        i = 1,
        side = 0;

    drawNgon(x, y,r,6,ctx);
    count--;
    while (count > 0) {
        for (var t = 0; t < Math.floor((side+4)/6)+(side%6==0) && count; t++) {
            y = y - dist * Math.cos(side * angle);
            x = x - dist * Math.sin(side * angle);
            drawNgon(x, y,r,6,ctx);
            count--;
        }
        side++;
    }
}
export function recursiveHexagon(cX, cY, depth, r,ctx){
    for(let a = 0; a<depth+1;a++) {
        if(depth > 0) { recursiveHexagon(cX,cY,depth-1,r/2,ctx) }
        drawNgon(cX,cY,r,6,ctx)
    }
}
