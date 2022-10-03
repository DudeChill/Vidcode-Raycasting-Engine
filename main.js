movie = image();
movie.source = "blank-transparent-square.jpg";
//movie source is 1k by 1k pixels for perfect grid
var map = [["#","#","#","#","#"],
           ["#","$","#","$","#"],
           ["#","#","#","#","#"],
           ["#","$","#","$","#"],
           ["#","#","#","#","#"]];
//gridmap using arrays within arrays
var scale = movie.height/map.length;
//map tile size
var scaley = 0;
//y increment
var scalex = 0;
//x increment
var squares = []
//where square sides are stored
for(var m in map)
{
for(var n in map[m])
{
if(map[m][n] == "$")
//if block is wall
{
var square = {
top: scalex,
bottom: scalex + scale,
left: scaley,
right: scaley + scale
//makes sides based on inequalities later on in function
}
squares.push(square)
//adds square dictionary of sides to array squares
var wal = rect(scalex,scaley,scale,scale,"#000000","#000000");
//creates black square
} else
{
var rec = rect(scalex,scaley,scale,scale,"#FFFFFF","#000000");
}
scalex += scale;
}
scalex = 0;
scaley += scale;
//increments scalex and scaley with scale
}
var player = circle(500,500,25,"red","clear");
//player circle
var scen = graphic("blank-transparent-square.jpg-2");
//invisible box over screen to use to move player because it doesnt work without it
var ray = line(player.x,player.y,player.x,0,"blue",5);
//player's line of sight
scen.whenKeyDown = function(key)
{
if(key === 'a')
{
if(ray.x2 >= 0 && ray.y2 <= 0)
{
ray.x2 -= 10;
}
if(ray.y2 >= 0 && ray.y2 <= 1000 && ray.x2 <= 0)
{
ray.y2 += 10;
}
if(ray.x2 <= 1000 && ray.y2 >= 1000)
{
ray.x2 += 10;
}
if(ray.x2 >= 1000 && ray.y2 <= 1000)
{
ray.y2 -= 10;
}
//keys a and d which work inversly to eachother rotation the line
}
if(key === 'd')
{
if(ray.x2 >= 0 && ray.y2 <= 0)
{
ray.x2 += 10;
}
if(ray.y2 >= 0 && ray.y2 <= 1000 && ray.x2 <= 0)
{
ray.y2 -= 10;
}
if(ray.x2 <= 1000 && ray.y2 >= 1000)
{
ray.x2 -= 10;
}
if(ray.x2 >= 1000 && ray.y2 <= 1000)
{
ray.y2 += 10;
}
}
}
repeat(function()
{
ray.x1 = player.x;
ray.y1 = player.y;
//player line cent
}, 1);
