function genplotkey(i){
 var keyname="key";
 keyname+=i.toString();
 var canvas=document.getElementById(keyname);
 var ctx=canvas.getContext("2d");
 canvas.width=14;
 canvas.height=14;
 ctx.beginPath();
 if(i%2==0){
  ctx.lineWidth=2;
  ctx.strokeStyle="black";
  ctx.fillStyle="black";
 }else{
  ctx.lineWidth=1;
  ctx.strokeStyle="red";
  ctx.fillStyle="red";
 }
 ctx.moveTo(0,9);
 ctx.lineTo(14,9);
 ctx.stroke();
 if(i==2||i==3)ctx.fillRect(4,6,6,6);
 if(i==4||i==5){
  ctx.beginPath();
  ctx.moveTo(4,6);
  ctx.lineTo(10,12);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(4,12);
  ctx.lineTo(10,6);
  ctx.stroke();
 }
 if(i==6||i==7){
  ctx.beginPath();
  ctx.moveTo(10,9);
  ctx.lineTo(7,12);
  ctx.lineTo(4,9);
  ctx.lineTo(7,6);
  ctx.lineTo(10,9);
  ctx.stroke();
 }
}
