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
var max_depth = movie.height;
var scaley = 0;
//y increment
var scalex = 0;
//x increment
var squares = [];
//where square sides are stored
var pi = Math.PI;
var fov = pi/3;
var half_fov = fov/2;
var player_angle = pi;
//pi variables
var playerx = (movie.width/2);
var playery = (movie.height/2);
var rays = 10;
//rays casted for fov
var step_angle = fov/rays;
//step which the ray makes

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
var leg = 100;
var player = circle(movie.width/2,movie.height/2,25,"red","clear");
//player circle
var scen = graphic("blank-transparent-square.jpg-2");
//invisible box over screen to use to move player because it doesnt work without it
var direction = line(playerx, playery, playerx + Math.sin(player_angle)*leg, playery + Math.cos(player_angle)*leg , "#0000FF", 10);
var left_line = line(playerx, playery, playerx + Math.sin(player_angle-half_fov)*leg , playery + Math.cos(player_angle-half_fov)*leg, "#0000FF", 10);
var right_line = line(playerx, playery, playerx + Math.sin(player_angle+half_fov)*leg , playery + Math.cos(player_angle+half_fov)*leg , "#0000FF", 10);
//Lines to show the player's fov

scen.whenKeyDown = function(key)
{
if(key === 'a')
{
player_angle += 0.1
}
if(key === 'd')
{
player_angle -= 0.1
}
}

function ray_cast()
{
var start_angle = player_angle - half_fov;
for (var i = 0; i <= rays; i++)
{
for (var depth = 0; depth <= max_depth; depth++)
{
var targetx = playerx - Math.sin(start_angle) * depth;
var targety = playery + Math.cos(start_angle) * depth;
var lin = line(playerx, playery, targetx, targety, "#DDFF00", 10);
}
}
start_angle += step_angle;
}

repeat(function()
{
direction.x2 = playerx + Math.sin(player_angle)*leg
direction.y2 = playery + Math.cos(player_angle)*leg

left_line.x2 = playerx + Math.sin(player_angle-half_fov)*leg
left_line.y2 = playery + Math.cos(player_angle-half_fov)*leg
  
right_line.x2 = playerx + Math.sin(player_angle+half_fov)*leg
right_line.y2 = playery + Math.cos(player_angle+half_fov)*leg
//ray_cast()
}, 1);
