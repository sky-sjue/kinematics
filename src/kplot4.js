
function kinplot(prexy,
                 ixax, iyax, 
                 enunit, angunit,
                 plotwidth, plotheight,
                 sxticmin, sdxtic,
                 syticmin, sdytic,
                 pxmin, pxmax,
                 pymin, pymax,
                 kfs, nxtd, nytd){

 var canvas=document.getElementById("kplot");
 var ctx=canvas.getContext("2d");
 var cxmin,cymin,cxmax,cymax; 
 var xypoints,ipre,i;
 xypoints=prexy[0];
 cxmin=xypoints[0]; cymin=xypoints[1];
 cxmax=xypoints[0]; cymax=xypoints[1];
 for(ipre=0; ipre<prexy.length; ipre++){
  xypoints=prexy[ipre];
  for(i=0; i<xypoints.length/2; i++){
   if(xypoints[2*i]   < cxmin)cxmin=xypoints[2*i];
   if(xypoints[2*i+1] < cymin)cymin=xypoints[2*i+1];
   if(xypoints[2*i]   > cxmax)cxmax=xypoints[2*i];
   if(xypoints[2*i+1] > cymax)cymax=xypoints[2*i+1];
  }
 }
 if(pxmin != 0.0 || pxmax != 0.0){
  cxmin=pxmin; cxmax=pxmax;
 }
 if(pymin != 0.0 || pymax != 0.0){
  cymin=pymin; cymax=pymax;
 }

 var cwidth;
 var cheight;
 cwidth=parseInt(plotwidth, 10);
 cheight=parseInt(plotheight, 10);
 const lmargin=100;
 const rmargin=40;
 const tmargin=40;
 const bmargin=100;
 const pmargin=20;
 canvas.width=cwidth+lmargin+rmargin;
 canvas.height=cheight+tmargin+bmargin;
 var kxtoc,kytoc;
 kxtoc=1.0*cwidth/(cxmax-cxmin);
 kytoc=1.0*cheight/(cymax-cymin);
 var boxtop,boxbot,boxleft,boxright,ypc;
 boxtop=tmargin-pmargin; 
 boxleft=lmargin-pmargin;
 boxbot=tmargin+cheight+pmargin;
 boxright=lmargin+cwidth+pmargin;
 ypc=boxtop-3; //linewidth/2

 function x2pix(xv){
  var x0;
  x0=(xv-cxmin)*kxtoc;
  return parseInt(x0+lmargin);
 }

 function y2pix(yv){
  var y0;
  y0=(cymax-yv)*kytoc;
  return parseInt(y0+tmargin);
 }

 ctx.clearRect(0, 0, canvas.width, canvas.height);

 ctx.beginPath();
 ctx.lineWidth=6;
 ctx.strokeStyle="black";
 ctx.moveTo(boxleft, boxtop);
 ctx.lineTo(boxright,boxtop);
 ctx.lineTo(boxright,boxbot);
 ctx.lineTo(boxleft, boxbot);
 ctx.lineTo(boxleft, boxtop); 
 ctx.lineTo(boxleft, ypc); 
 ctx.stroke();
 ctx.save();

 //label y axis
 const anglerot=-Math.PI/2.0;
 var theight;
 theight=parseInt(tmargin+cheight*0.55);
 ctx.translate(20,theight);
 ctx.rotate(anglerot);
 ctx.font="20px Arial";
 if(iyax <= 3){
  if(angunit === "deg" || angunit === "cdeg")
   ctx.fillText("[deg]", 40, 0);
  if(angunit === "rad" || angunit === "crad")
   ctx.fillText("[rad]", 40, 0);
  if(angunit === "mrad" || angunit === "cmrad")
   ctx.fillText("[mrad]", 40, 0);
 }
 if(iyax == 5 || iyax == 6){
  if(enunit === "keV")ctx.fillText("[keV]", 40, 0);
  if(enunit === "MeV")ctx.fillText("[MeV]", 40, 0);
  if(enunit === "GeV")ctx.fillText("[GeV]", 40, 0);
  if(enunit === "TeV")ctx.fillText("[TeV]", 40, 0);
 }
 if((iyax==1 || iyax==2) || iyax==3){
  ctx.fillText('\u03f4', 0, 0);
  ctx.font="14px Arial";
  if(iyax==1)ctx.fillText('3',  16, 7);
  if(iyax==2)ctx.fillText('4',  16, 7);
  if(iyax==3)ctx.fillText('3cm',16, 7);
 }
 if(iyax == 4){
  ctx.fillText('cos(\u03f4', 0, 0);
  ctx.fillText(')', 85, 0);
  ctx.font="14px Arial";
  ctx.fillText('3cm', 55, 7);
 }
 if(iyax==5 || iyax==6){
  ctx.fillText('E', 0, 0);
  ctx.font="14px Arial";
  if(iyax==5)ctx.fillText('3', 14, 7);
  if(iyax==6)ctx.fillText('4', 14, 7);
 }
 if(iyax==7 || iyax==8){
  ctx.fillText('v /c', 0, 0);
  ctx.font="14px Arial";
  if(iyax==7)ctx.fillText('3', 7, 7);
  if(iyax==8)ctx.fillText('4', 7, 7);
 }
 if(iyax == 9 || iyax == 10){
  ctx.fillText('d\u03a9', 0, 0);
  ctx.fillText('/d\u03a9', 38, 0);
  ctx.font="14px Arial";
  if(iyax == 9)ctx.fillText('3', 27, 7);
  if(iyax == 10)ctx.fillText('4', 27, 7);
  ctx.fillText('cm', 70, 7);
 }
 ctx.restore();

 //label x axis
 var twide;
 twide=parseInt(lmargin+cwidth*0.45);
 ctx.translate(twide,tmargin+cheight+pmargin+60);
 ctx.font="20px Arial";
 if(ixax <= 3){
  if(angunit === "deg" || angunit === "cdeg")
   ctx.fillText("[deg]", 40, 0);
  if(angunit === "rad" || angunit === "crad")
   ctx.fillText("[rad]", 40, 0);
  if(angunit === "mrad" || angunit === "cmrad")
   ctx.fillText("[mrad]", 40, 0);
 }
 if(ixax == 5 || ixax == 6){
  if(enunit === "keV")ctx.fillText("[keV]", 40, 0);
  if(enunit === "MeV")ctx.fillText("[MeV]", 40, 0);
  if(enunit === "GeV")ctx.fillText("[GeV]", 40, 0);
  if(enunit === "TeV")ctx.fillText("[TeV]", 40, 0);
 }
 if((ixax == 1 || ixax == 2) || ixax == 3){
  //ctx.fillText('[deg]', 30, 0);
  ctx.fillText('\u03f4', 0, 0);
  ctx.font="14px Arial";
  if(ixax == 1)ctx.fillText('3', 16, 7);
  if(ixax == 2)ctx.fillText('4', 16, 7);
  if(ixax == 3)ctx.fillText('3cm', 16, 7);
 }
 if(ixax == 4){
  ctx.fillText('cos(\u03f4', 0, 0);
  ctx.fillText(')', 85, 0);
  ctx.font="14px Arial";
  ctx.fillText('3cm', 55, 7);
 }
 if(ixax==5 || ixax==6){
  ctx.fillText('E', 0, 0);
  ctx.font="14px Arial";
  if(ixax==5)ctx.fillText('3', 14, 7);
  if(ixax==6)ctx.fillText('4', 14, 7);
 }
 if(ixax==7 || ixax==8){
  ctx.fillText('v /c', 0, 0);
  ctx.font="14px Arial";
  if(ixax==7)ctx.fillText('3', 7, 7);
  if(ixax==8)ctx.fillText('4', 7, 7);
 }
 if(ixax == 9 || ixax == 10){
  ctx.fillText('d\u03a9', 0, 0);
  ctx.fillText('/d\u03a9', 38, 0);
  ctx.font="14px Arial";
  if(ixax == 9)ctx.fillText('3', 27, 7);
  if(ixax == 10)ctx.fillText('4', 27, 7);
  ctx.fillText('cm', 70, 7);
 }
 ctx.translate(-twide, -tmargin-cheight-pmargin-60);

 //grid tics
 var xticmin,dxtic,xxt;
 var yticmin,dytic,yyt;
 var xstop,ystop,ytest;
 var jx,stx,jy,sty;
 if(sxticmin === "-1234.5" || sdxtic === "-1234.5"){
  xticmin=cxmin;
  dxtic=cxmax-cxmin;
 }else{
  xticmin=parseFloat(sxticmin);
  dxtic=parseFloat(sdxtic);
 }
 var xtbotshift;
 var dxtxshift;
 dxtxshift=parseInt(0.25*(parseFloat(kfs))); 
 xtbotshift=parseInt(1.5*(parseFloat(kfs)));
 xstop=cxmax+pmargin/kxtoc;
 xxt=xticmin;
 while(xxt < xstop){
  jx=x2pix(xxt);
  if(jx > boxleft && jx < boxright){
   ctx.beginPath();
   ctx.strokeStyle="rgba(128, 128, 128, 0.5)"; //half transparent light gray
   ctx.lineWidth=1;
   ctx.moveTo(jx,boxtop);
   ctx.lineTo(jx,boxbot);
   ctx.stroke();
   //ctx.font="12px Arial";
   ctx.font=kfs+"px Arial";
   //stx=xxt.toFixed(2);
   stx=xxt.toFixed(parseInt(nxtd));
   //ctx.fillText(stx, jx-3*stx.length, boxbot+18);
   ctx.fillText(stx, jx-stx.length*dxtxshift, boxbot+xtbotshift);
  }
  xxt+=dxtic;
 }

 if(syticmin === "-1234.5" || sdytic === "-1234.5"){
  yticmin=cymin;
  dytic=cymax-cymin;
 }else{
  yticmin=parseFloat(syticmin);
  dytic=parseFloat(sdytic);
 }
 var ytvertshift;
 var dytxshift;
 dytxshift=parseInt(0.75*(parseFloat(kfs))); 
 ytvertshift=parseInt(0.5*(parseFloat(kfs)))-1;
 ystop=cymax+pmargin/kytoc;
 yyt=yticmin;
 while(yyt < ystop){
  jy=y2pix(yyt);
  if(jy > pmargin && jy < boxbot){
   ctx.beginPath();
   ctx.strokeStyle="rgba(128, 128, 128, 0.5)"; //half transparent light gray
   ctx.lineWidth=1;
   ctx.moveTo(boxleft,jy);
   ctx.lineTo(boxright,jy);
   ctx.stroke();
   ctx.font=kfs+"px Arial";
   sty=yyt.toFixed(parseInt(nytd));
   //ytest=boxleft-9*sty.length;
   ytest=boxleft-sty.length*dytxshift;
   if(ytest < 1)ytest=1;
   ctx.fillText(sty, ytest, jy+ytvertshift);
  }
  yyt+=dytic;
 }

 for(ipre=0; ipre<prexy.length; ipre++){
  xypoints=prexy[ipre];
  ctx.beginPath();
  if(ipre%2 == 0){
   ctx.lineWidth=2;
   ctx.strokeStyle="black";
   ctx.fillStyle="black";
  }else{
   ctx.lineWidth=1;
   ctx.strokeStyle="red";
   ctx.fillStyle="red";
  }
  var xip,yip;
  xip=[]; yip=[];
  for(i=0; i<xypoints.length/2; i++){
   xip.push(x2pix(xypoints[2*i]));
   yip.push(y2pix(xypoints[2*i+1]));
  }
  var checkin=true;
  for(i=0; i<xip.length; i++){
   if(xip[i] >= boxleft && xip[i] <= boxright){
   if(yip[i] >= boxtop && yip[i] <= boxbot){
     if(checkin){
      checkin=false;
      ctx.moveTo(xip[i], yip[i]);
     }else{
      ctx.lineTo(xip[i], yip[i]);
      ctx.stroke(); 
     }
    }else{checkin=true;}
   }else{checkin=true;}
  }

  for(i=0; i<xip.length; i++){
   if(xip[i] >= boxleft && xip[i] <= boxright){
   if(yip[i] >= boxtop && yip[i] <= boxbot){
     if(ipre==2 || ipre==3)ctx.fillRect(xip[i]-3,yip[i]-3,6,6);
     if(ipre==4 || ipre==5){
      ctx.beginPath();
      ctx.moveTo(xip[i]-3, yip[i]-3);
      ctx.lineTo(xip[i]+3, yip[i]+3);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(xip[i]-3, yip[i]+3);
      ctx.lineTo(xip[i]+3, yip[i]-3);
      ctx.stroke();
     }
     if(ipre==6 || ipre==7){
      ctx.beginPath();
      ctx.moveTo(xip[i]+3, yip[i]);
      ctx.lineTo(xip[i], yip[i]+3);
      ctx.lineTo(xip[i]-3, yip[i]);
      ctx.lineTo(xip[i], yip[i]-3);
      ctx.lineTo(xip[i]+3, yip[i]);
      ctx.stroke();
     }
   }}
  }

 }//ipre

}
