
const kindebug=false;

function readkform(){
 var x=document.getElementById("kinform");
 var text="";
 var i,xypoints,morexy;
 var m1,m2,m3,m4;
 var m1unit,m2unit,m3unit,m4unit;
 var inspec,ek,ekunit;
 var ex3,ex4;
 var xax,yax;
 var angunit,enunit;
 var xmin,xmax,xticmin,dxtic;
 var ymin,ymax,yticmin,dytic;
 var plotwidth,plotheight,npoints;
 var kfs,nxtd,nytd;
 var prexy,sprexy;
 var presrxn,spresrxn;
 var arxnsummary,plotopt;

 m1=x.elements[0].value;
 for(i=1; i<4; i++)if(x.elements[i].checked)m1unit=x.elements[i].value;
 m2=x.elements[4].value;
 for(i=5; i<8; i++)if(x.elements[i].checked)m2unit=x.elements[i].value;
 m3=x.elements[8].value;
 for(i=9; i<12; i++)if(x.elements[i].checked)m3unit=x.elements[i].value;
 m4=x.elements[12].value;
 for(i=13; i<16; i++)if(x.elements[i].checked)m4unit=x.elements[i].value;
 inspec=x.elements[16].value;
 ek=x.elements[17].value;
 ekunit=x.elements[18].value;
 ex3=x.elements[19].value;
 ex4=x.elements[20].value;
 for(i=21; i<31; i++)if(x.elements[i].checked)xax=x.elements[i].value;
 for(i=31; i<41; i++)if(x.elements[i].checked)yax=x.elements[i].value;
 angunit=x.elements[41].value;
 for(i=42; i<46; i++)if(x.elements[i].checked)enunit=x.elements[i].value;
 plotopt=x.elements[46].value;
 xticmin=x.elements[47].value;
 dxtic=x.elements[48].value;
 yticmin=x.elements[49].value;
 dytic=x.elements[50].value;
 xmin=x.elements[51].value;
 xmax=x.elements[52].value;
 if(xmin.length > 0 && xmax.length > 0){
  xmin=parseFloat(xmin); xmax=parseFloat(xmax);  
 }else{
  xmin=0.0; xmax=0.0;
 }
 ymin=x.elements[53].value;
 ymax=x.elements[54].value;
 if(ymin.length > 0 && ymax.length > 0){
  ymin=parseFloat(ymin); ymax=parseFloat(ymax);  
 }else{
  ymin=0.0; ymax=0.0;
 }
 plotwidth=x.elements[55].value;
 plotheight=x.elements[56].value;
 npoints=x.elements[57].value;
 kfs=x.elements[58].value;
 nxtd=x.elements[59].value;
 nytd=x.elements[60].value;

 sprexy=document.getElementById("previousdata").textContent;
 if(sprexy.length > 0){
  prexy=JSON.parse(sprexy);
 }else{
  prexy=[];
 }
 spresrxn=document.getElementById("previoussrxn").innerHTML;
 if(spresrxn.length > 0){
  presrxn=JSON.parse(spresrxn);
 }else{
  presrxn=[];
 }

 //get masses
 var rmarr;
 var m1m,m1html;
 rmarr=getmass(m1,m1unit,text);
 m1m=rmarr[0]; m1html=rmarr[1]; text=rmarr[2];
 var echohtml;
 echohtml="&rarr; m<sub>1</sub>("+m1html+")="+m1m.toString()+" MeV";
 document.getElementById("m1echo").innerHTML=echohtml;
 var m2m,m2html;
 rmarr=getmass(m2,m2unit,text);
 m2m=rmarr[0]; m2html=rmarr[1]; text+=rmarr[2];
 echohtml="&rarr; m<sub>2</sub>("+m2html+")="+m2m.toString()+" MeV";
 document.getElementById("m2echo").innerHTML=echohtml;
 var m3m,m3html;
 rmarr=getmass(m3,m3unit,text);
 m3m=rmarr[0]; m3html=rmarr[1]; text+=rmarr[2];
 var m4m,m4html;
 rmarr=getmass(m4,m4unit,text);
 m4m=rmarr[0]; m4html=rmarr[1]; text+=rmarr[2];

 //potentially get excitation energies
 if(ex3.length > 0){
  if(parseFloat(ex3) > 0.0){
   m3m=m3m+parseFloat(ex3);
   m3html=m3html+"<sup>*</sup>";
 }}
 echohtml="&rarr; m<sub>3</sub>("+m3html+")="+m3m.toString()+" MeV";
 document.getElementById("m3echo").innerHTML=echohtml;

 if(ex4.length > 0){
  if(parseFloat(ex4) > 0.0){
   m4m=m4m+parseFloat(ex4);
   m4html=m4html+"<sup>*</sup>";
 }}
 echohtml="&rarr; m<sub>4</sub>("+m4html+")="+m4m.toString()+" MeV";
 document.getElementById("m4echo").innerHTML=echohtml;

 //process ekunit, ek and inspec into MeV
 var tke;
 if(ekunit === "keV")tke=0.001*parseFloat(ek);
 if(ekunit === "MeV")tke=parseFloat(ek);
 if(ekunit === "GeV")tke=1000.0*parseFloat(ek);
 if(ekunit === "TeV")tke=1000000.0*parseFloat(ek);
 //if(inspec==="kinetic") (do nothing)
 if(inspec==="total")tke=tke-m1m; //convert total to kinetic
 if(inspec==="momentum"){
  var pbeam=tke;
  tke=Math.sqrt(pbeam*pbeam+m1m*m1m)-m1m; 
  text+="had pbeam "+pbeam.toString()+"<br>";
  text+="got tke "+tke.toString()+"<br>";
 }
 if(tke < 0.0){
  text="<h3>Kinetic energy not allowed to be less than zero</h3>";
  document.getElementById("kingout").innerHTML=text;
  return;
 }
 var ketester;
 ketester=m1m+m2m+tke-m3m-m4m;
 if(kindebug)text+="ketester gets "+ketester.toString()+"<br>";
 if(ketester < 0.0){
  text="<h3>m1+KE+m2 &lt; m3+m4, insufficient energy for reaction</h3>";
  document.getElementById("kingout").innerHTML=text;
  return;
 }

 var testin,testout;
 testin=false;
 testout=false;
 if( m2m > 0.0 && tke > 0.0 )testin=true;
 if( m3m > 0.0 || m4m > 0.0 )testout=true;
 if( testin == false ){
  text="<h3>require massive m2 and KE &gt; 0</h3>";
  document.getElementById("kingout").innerHTML=text;
  return;
 }
 if( testout == false ){
  text="<h3>require massive m3 or m4</h3>";
  document.getElementById("kingout").innerHTML=text;
  return;
 }

 //try some kinematics
 reaction=new twobody(m1m, m2m, m3m, m4m, tke);

 if(reaction.nogo){
  text="<h3>reaction is NOGO</h3>\n";
  text+="s value calculated was "+reaction.s.toString()+"<br>\n";
  if(reaction.pcmp === undefined)
   text+="pcm of products would have been sqrt(negative)<br>\n";
  document.getElementById("kingout").innerHTML=text;
  return;
 }

 //set non-default values for reaction
 reaction.m1html=m1html;
 reaction.m2html=m2html;
 reaction.m3html=m3html;
 reaction.m4html=m4html;
 if(ex3.length > 0)reaction.ex3=ex3; 
 if(ex4.length > 0)reaction.ex4=ex4;
 reaction.angunit=angunit;
 //for angunit of "deg" and "cdeg" we do nothing
 if(angunit === "rad" || angunit==="crad")reaction.angfact=1.0;
 if(angunit === "mrad" || angunit=="cmrad")reaction.angfact=1000.0;
 reaction.enunit=enunit;
 var postsrxn,postxy,srxns4key;
 postsrxn=[];
 postxy=[];
 if(x.length > 58){
  for(i=58; i<x.length; i++){
   if(x.elements[i].checked){
    var i2keep;
    i2keep=parseInt(x.elements[i].value);
    postsrxn.push(presrxn[i2keep]);
    postxy.push(prexy[i2keep]);
   }
  }
 }
 if(npoints.length > 0)reaction.ncoscm=parseInt(npoints,10);
 var ixax,iyax;
 var bigdatablob;
 ixax=parseInt(xax,10); iyax=parseInt(yax,10);
 xypoints=reaction.getpoints(ixax, iyax);
 arxnsummary=reaction.rxnsummary();
 postsrxn.push(reaction.srxn);
 postxy.push(xypoints);
 if(xypoints.length > 1){
  bigdatablob="";
  bigdatablob+="data points from "+reaction.srxn+", click to select all<br>";
  bigdatablob+="<div contenteditable=\"true\" onclick=\"document.execCommand('selectAll',false,null)\" style=\"height:200px; overflow:auto\"><pre>\n";
  for(i=0; i<xypoints.length/2; i++){
   var numstring;
   numstring=xypoints[2*i].toFixed(6);
   while(numstring.length < 12)numstring=" "+numstring;
   bigdatablob+=numstring+"  ";
   numstring=xypoints[2*i+1].toFixed(6);
   while(numstring.length < 12)numstring=" "+numstring;
   bigdatablob+=numstring+"\n";
  }
  bigdatablob+="</pre></div>\n";
  if(isNaN(parseInt(plotwidth,  0)))plotwidth="660";
  if(isNaN(parseInt(plotheight, 0)))plotheight="440";
  if(isNaN(parseInt(xticmin, 0))   )xticmin="-1234.5";
  if(isNaN(parseInt(dxtic, 0))   )dxtic="-1234.5";
  if(isNaN(parseInt(yticmin, 0))   )yticmin="-1234.5";
  if(isNaN(parseInt(dytic, 0))   )dytic="-1234.5";
  if(isNaN(parseInt(kfs, 0))   )kfs="12";
  if(isNaN(parseInt(nxtd, 0))   )nxtd="2";
  if(isNaN(parseInt(nytd, 0))   )nytd="2";
  if(kindebug){
   text+="xypoints length is "+xypoints.length.toString()+"<br>\n";
   text+="xmin is "+xmin.toString()+"<br>\n";
   text+="xmax is "+xmax.toString()+"<br>\n";
   text+="ymin is "+ymin.toString()+"<br>\n";
   text+="ymax is "+ymax.toString()+"<br>\n";
   text+="ncoscm is "+reaction.ncoscm.toString()+"<br>\n";
  }
  kinplot(postxy,
          ixax, iyax, 
          enunit, angunit, 
          plotwidth, plotheight,
          xticmin, dxtic,
          yticmin, dytic,
          xmin, xmax,
          ymin, ymax,
          kfs, nxtd, nytd);
 }else{
  const canvas=document.getElementById("kplot");
  const ctx=canvas.getContext("2d");
  canvas.width=0;
  canvas.height=0;
 }
 text+=arxnsummary;
 text+=bigdatablob;
 sprexy=JSON.stringify(postxy);
 document.getElementById("previousdata").innerHTML=sprexy;
 spresrxn=JSON.stringify(postsrxn);
 document.getElementById("previoussrxn").innerHTML=spresrxn;
 var srxnchkshtml;
 srxnchkshtml="";
 if(postsrxn.length > 0)
  document.getElementById("addrxnsadvice").innerHTML=
   "Check boxes to keep reactions while adding new ones.<br>\n";
 for(i=0; i<postsrxn.length; i++){
  srxnchkshtml+="<input id=\"rxn";
  srxnchkshtml+=i.toString()+"\" type=\"checkbox\"";
  srxnchkshtml+=" value=\""+i.toString()+"\">";
  srxnchkshtml+="<canvas id=\"key"+i.toString()+"\"></canvas>";
  srxnchkshtml+=postsrxn[i]+"<br>\n";
 }
 document.getElementById("rxnchks").innerHTML=srxnchkshtml;
 for(i=0; i<postsrxn.length; i++)genplotkey(i);
 if(kindebug){
  text+="plotwidth<br>";
  text+=plotwidth+"<br>";
  text+="parseInt(plotwidth)?<br>";
  text+=parseInt(plotwidth, 0)+"<br>";
  text+="parseInt(plotwidth) isNan?<br>";
  text+=isNaN(parseInt(plotwidth, 0))+"<br>";
  text+="parseInt(plotheight)?<br>";
  text+=parseInt(plotheight, 0)+"<br>";
  text+="plotheight<br>";
  text+=plotheight+"<br>";
  text+="m1 is "+m1+"<br>";
  text+="unit is "+m1unit+"<br>";
  text+="m2 is "+m2+"<br>";
  text+="unit is "+m2unit+"<br>";
  text+="m3 is "+m3+"<br>";
  text+="unit is "+m3unit+"<br>";
  text+="m4 is "+m4+"<br>";
  text+="unit is "+m4unit+"<br>";
  text+="inspec is "+inspec+"<br>";
  text+="ek is "+ek+"<br>";
  text+="ekunit is "+ekunit+"<br>";
  text+="ex3 is "+ex3+"<br>";
  text+="ex4 is "+ex4+"<br>";
  text+="xax is "+xax+"<br>";
  text+="yax is "+yax+"<br>";
  text+="angunit is "+angunit+"<br>";
  text+="enunit is "+enunit+"<br>";
  for(i=50; i<x.length; i++){
   text+=i+"<br>";
   text+="name "+x.elements[i].name+"<br>";
   text+="value "+x.elements[i].value+"<br>";
  }
  text+="prexy?<br>\n";
  text+=sprexy+"<br>\n";
  text+="presrxn?<br>\n";
  text+=spresrxn+"<br>\n";
  text+="srxnchkshtml<br>\n";
  text+=srxnchkshtml;
 }else{
  //text+="not debugging so don't worry about it<br>";
  //do nothing, that was for debugging
 }
 document.getElementById("kingout").innerHTML=text;
}
