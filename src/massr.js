const dbgmassr=false;

function getmass(amass, aunit, atext){
 var mhtml='';
 var massmev=0.0;
 var nmassadd=0.0;
 const amu=931.494104;
 const emass=0.510999;
 if(dbgmassr){
  atext+="getmass() received amass "+amass+"<br>";
  atext+="getmass() received aunit "+aunit+"<br>";
 }
 //following +n bit was to allow Hicham Al Falou to 
 //do kinematics for halo nuclei experiments
 if(amass.search(/\+n/) > 0){
  nmassadd=939.5653;
  amass.replace(/\+n/,'');
 }
 if(amass === "p"){amass="1h"; aunit="iso"; mhtml="p";}
 if(amass === "d"){amass="2h"; aunit="iso"; mhtml="d";}
 if(amass === "t"){amass="3h"; aunit="iso"; mhtml="t";}
 if(amass === "n"){amass="1n"; aunit="iso"; mhtml="n";}
 if(amass === "a"){amass="4he";aunit="iso"; mhtml="<em>&alpha;</em>";}
 if(amass === "h"){amass="3he";aunit="iso"; mhtml="h";}
 if(amass === "g"){            aunit="iso"; mhtml="<em>&gamma;</em>";}
 if(amass === "e" || amass === "e-" || amass === "e+"){
  massmev=emass; aunit="later"; mhtml="&beta;";
 }
 if(amass === "pi+"){
  massmev=139.6; aunit="later"; mhtml="<em>&pi;</em><sup>+</sup>";
 }
 if(amass === "pi-"){
  massmev=139.6; aunit="later"; mhtml="<em>&pi;</em><sup>-</sup>";
 }
 if(amass === "pi0"){
  massmev=135.0; aunit="later"; mhtml="<em>&pi;</em><sup>0</sup>";
 }
 if(amass === "mu+"){
  massmev=105.7; aunit="later"; mhtml="<em>&mu;</em><sup>+</sup>";
 }
 if(amass === "mu-"){
  massmev=105.7; aunit="later"; mhtml="<em>&mu;</em><sup>-</sup>";
 }
 if(amass === "mu"){
  massmev=105.7; aunit="later"; mhtml="<em>&mu;</em>";
 }
 if(amass === "tau+"){
  massmev=1777.0; aunit="later"; mhtml="<em>&tau;</em><sup>+</sup>";
 }
 if(amass === "tau-"){
  massmev=1777.0; aunit="later"; mhtml="<em>&tau;</em><sup>-</sup>";
 }
 if(amass === "tau"){
  massmev=1777.0; aunit="later"; mhtml="<em>&tau;</em>";
 }
 if(amass === "rho+"){
  massmev=770.0; aunit="later"; mhtml="<em>&rho;</em><sup>+</sup>";
 }
 if(amass === "rho-"){
  massmev=770.0; aunit="later"; mhtml="<em>&rho;</em><sup>-</sup>";
 }
 if(amass === "rho"){
  massmev=770.0; aunit="later"; mhtml="<em>&rho;</em>";
 }
 if(amass === "rho0"){
  massmev=770.0; aunit="later"; mhtml="<em>&rho;</em><sup>0</sup>";
 }
 if(amass === "k+"){
  massmev=493.67; aunit="later"; mhtml="<em>K</em><sup>+</sup>";
 }
 if(amass === "k-"){
  massmev=493.67; aunit="later"; mhtml="<em>K</em><sup>-</sup>";
 }
 if(amass === "k0"){
  massmev=497.65; aunit="later"; mhtml="<em>K</em><sup>0</sup>";
 }
 if(aunit === "iso"){ //in this case we use mass table
  var bigel=amass.replace(/\d/g,'');
  var anow=amass.replace(bigel, '');
  var unfound=true;
  var itab=0;
  var elnow=bigel.toLowerCase();
  elnow=elnow.trim();
  anow=anow.trim();
  if(dbgmassr){
   atext+="made it into table!<br>";
   atext+="bigel is "+bigel+"<br>";
   atext+="anow is "+anow+"<br>";
   atext+="elnow is "+elnow+"<br>";
  }
  while(unfound && itab < mtab.length){
   if(anow === mtab[itab].a){
    if(dbgmassr)atext+="found anow match<br>";
    var eltest;
    eltest=mtab[itab].el.toLowerCase();
    if(dbgmassr)atext+="eltest is now "+eltest+"<br>";
    if(elnow === eltest){
     //we are working in MeV but mass excess in given in keV
     //so we multiply it by 0.001
     massmev=parseFloat(anow)*amu+parseFloat(mtab[itab].mexcess)*0.001;
     massmev=massmev-parseFloat(mtab[itab].z)*emass;
     unfound=false;
     if(mhtml.length == 0)mhtml="<sup>"+anow+"</sup>"+bigel;
     if(dbgmassr){
      atext+="found elnow match<br>";
      atext+="massmev calculated as "+massmev+"<br>";
      atext+="mhtml is "+mhtml+"<br>";
     }
    }
   }
   itab+=1;
  }
 }else if(aunit === "amu"){
  if(dbgmassr)atext+="got into amu<br>";
  massmev=parseFloat(amass)*amu;
  mhtml=amass.toString()+" AMU";
 }else if(aunit === "mev"){
  if(dbgmassr)atext+="got into mev<br>";
  massmev=amass;
  mhtml=amass.toString();
 }else if(aunit === "later"){
  if(dbgmassr)atext+="got into later<br>";
  aunit="iso"; //this might not be necessary
 }
 if(nmassadd > 0.0){
  if(dbgmassr)atext+="got into nmassadd<br>";
  massmev=massmev+nmassadd;
  mhtml=mhtml+"+n";
 } 
 const rvals=[massmev,mhtml,atext];
 return rvals;
}
