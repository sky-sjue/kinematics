function pickplotopt(){
 var x=document.getElementById("kinform");
 var plotopt;
 plotopt=x.elements[46].value;
 if(plotopt === "xtics"){
  document.getElementById("po1").style.display="block";
  document.getElementById("po2").style.display="none";
  document.getElementById("po3").style.display="none";
  document.getElementById("po4").style.display="none";
  document.getElementById("po5").style.display="none";
  document.getElementById("po6").style.display="none";
  document.getElementById("po7").style.display="none";
  document.getElementById("po8").style.display="none";
 }else if(plotopt === "ytics"){
  document.getElementById("po1").style.display="none";
  document.getElementById("po2").style.display="block";
  document.getElementById("po3").style.display="none";
  document.getElementById("po4").style.display="none";
  document.getElementById("po5").style.display="none";
  document.getElementById("po6").style.display="none";
  document.getElementById("po7").style.display="none";
  document.getElementById("po8").style.display="none";
 }else if(plotopt === "xlimits"){
  document.getElementById("po1").style.display="none";
  document.getElementById("po2").style.display="none";
  document.getElementById("po3").style.display="block";
  document.getElementById("po4").style.display="none";
  document.getElementById("po5").style.display="none";
  document.getElementById("po6").style.display="none";
  document.getElementById("po7").style.display="none";
  document.getElementById("po8").style.display="none";
 }else if(plotopt === "ylimits"){
  document.getElementById("po1").style.display="none";
  document.getElementById("po2").style.display="none";
  document.getElementById("po3").style.display="none";
  document.getElementById("po4").style.display="block";
  document.getElementById("po5").style.display="none";
  document.getElementById("po6").style.display="none";
  document.getElementById("po7").style.display="none";
  document.getElementById("po8").style.display="none";
 }else if(plotopt === "plotdims"){
  document.getElementById("po1").style.display="none";
  document.getElementById("po2").style.display="none";
  document.getElementById("po3").style.display="none";
  document.getElementById("po4").style.display="none";
  document.getElementById("po5").style.display="block";
  document.getElementById("po6").style.display="none";
  document.getElementById("po7").style.display="none";
  document.getElementById("po8").style.display="none";
 }else if(plotopt === "npoints"){
  document.getElementById("po1").style.display="none";
  document.getElementById("po2").style.display="none";
  document.getElementById("po3").style.display="none";
  document.getElementById("po4").style.display="none";
  document.getElementById("po5").style.display="none";
  document.getElementById("po6").style.display="block";
  document.getElementById("po7").style.display="none";
  document.getElementById("po8").style.display="none";
 }else if(plotopt === "ticfontsz"){
  document.getElementById("po1").style.display="none";
  document.getElementById("po2").style.display="none";
  document.getElementById("po3").style.display="none";
  document.getElementById("po4").style.display="none";
  document.getElementById("po5").style.display="none";
  document.getElementById("po6").style.display="none";
  document.getElementById("po7").style.display="block";
  document.getElementById("po8").style.display="none";
 }else if(plotopt === "ticdecimals"){
  document.getElementById("po1").style.display="none";
  document.getElementById("po2").style.display="none";
  document.getElementById("po3").style.display="none";
  document.getElementById("po4").style.display="none";
  document.getElementById("po5").style.display="none";
  document.getElementById("po6").style.display="none";
  document.getElementById("po7").style.display="none";
  document.getElementById("po8").style.display="block";
 }
}

function angwarn(){
 var x=document.getElementById("kinform");
 var angunit;
 var swarn,cmwarn;
 swarn=" for <em>&theta;</em><sub>3</sub>";
 swarn+=" and <em>&theta;</em><sub>4</sub> only";
 cmwarn=" <em>&theta;</em><sub>cm</sub> in ";
 angunit=x.elements[41].value;
 if(angunit==="cdeg"){
  document.getElementById("cangwarn").innerHTML=swarn+", "+cmwarn+
   "standard degrees";
 }else if(angunit==="crad"){
  document.getElementById("cangwarn").innerHTML=swarn+", "+cmwarn+
   "standard radians";
 }else if(angunit==="cmrad"){
  document.getElementById("cangwarn").innerHTML=swarn+", "+cmwarn+
   "standard radians";
 }else if(angunit==="mrad"){
  document.getElementById("cangwarn").innerHTML=swarn+", "+cmwarn+
   "standard radians";
 }else{
  document.getElementById("cangwarn").innerHTML="";
 }
}
