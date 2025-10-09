
class twobody{

 constructor(m1,m2,m3,m4,ek){
  //based on m1, m2, m3, m4, we calculate 
  //s, nogo, pcm, cmrap, thesinh, thecosh, pcmp
  this.m1=m1;
  this.m2=m2;
  this.m3=m3;
  this.m4=m4;
  this.ek=ek;
  //set some default values
  this.srxn="";
  this.ex3="";
  this.ex4="";
  this.m1html="";
  this.m2html="";
  this.m3html="";
  this.m4html="";
  this.ncoscm=500;
  this.cmcos3max=2.0;
  this.cmcos4max=2.0;
  this.e3atmaxang=-1.0;
  this.e4atmaxang=-1.0;
  this.angfact=180.0/Math.PI; 
  this.angunit="deg";
  this.enunit="MeV";
  this.nogo=false;
  this.cossmall=-1.0;
  this.coslarge=1.0;
  this.s=Math.pow(this.m1+this.m2, 2);
  this.s=this.s+2.0*this.m2*this.ek;
  if(this.s <= 0.0)this.nogo=true;
  var pcm2num;
  pcm2num=this.s-Math.pow(this.m1,2)-Math.pow(this.m2,2);
  pcm2num=Math.pow(pcm2num,2);
  pcm2num=pcm2num-4.0*Math.pow(this.m1,2)*Math.pow(this.m2,2);
  this.pcm=Math.sqrt(pcm2num/(4.0*this.s));
  var acmratio; 
  //change conditions to test for m2 > 0 
  acmratio=(Math.sqrt(this.m2*this.m2+this.pcm*this.pcm)+this.pcm)/this.m2;
  this.cmrap=Math.log(acmratio);
  this.thesinh=Math.sinh(this.cmrap);
  this.thecosh=Math.cosh(this.cmrap);
  var precmp;
  precmp=Math.pow(this.s-this.m3*this.m3-this.m4*this.m4,2)
                  -4.0*this.m3*this.m3*this.m4*this.m4;
  if(precmp < 0.0)this.nogo=true;
  if(!this.nogo){
   this.pcmp=Math.sqrt(precmp/(4.0*this.s));
   this.e03=Math.sqrt(this.pcmp*this.pcmp+this.m3*this.m3);
   this.e04=Math.sqrt(this.pcmp*this.pcmp+this.m4*this.m4);
   this.emax3=this.e03*this.thecosh+this.pcmp*this.thesinh-this.m3;
   this.emax4=this.e04*this.thecosh+this.pcmp*this.thesinh-this.m4;
   this.emin3=this.e03*this.thecosh-this.pcmp*this.thesinh-this.m3;
   this.emin4=this.e04*this.thecosh-this.pcmp*this.thesinh-this.m4;
   var thetatest, patmax, eatmax;
   if(this.m3 > 0.0){
    thetatest=this.pcmp/(this.m3*this.thesinh);
    if(thetatest < 1.0){
     this.theta3max=Math.asin(thetatest);
     patmax=(this.e03*Math.cos(this.theta3max)*this.thesinh)/
             (1.0+thetatest*thetatest*this.thesinh*this.thesinh);
     eatmax=Math.sqrt(patmax*patmax+this.m3*this.m3);
     this.e3atmaxang=eatmax-this.m3;
     this.cmcos3max=(eatmax-this.e03*this.thecosh)/
                      (this.pcmp*this.thesinh);
    } 
   }
   if( (this.m1+this.m2) == (this.m3+this.m4) ){
    if(thetatest > 0.9999 && thetatest < 1.001){
     this.theta3max=Math.PI/2.0;
     this.cmcos3max=-1.0; 
     this.e3atmaxang=this.e03*this.thecosh
                  +this.cmcos3max*this.pcmp*this.thesinh-this.m3;
    }
   }
   if(this.m4 > 0.0){
    thetatest=this.pcmp/(this.m4*this.thesinh);
    if(thetatest < 1.0){
     this.theta4max=Math.asin(thetatest);
     patmax=(this.e04*Math.cos(this.theta4max)*this.thesinh)/
             (1.0+thetatest*thetatest*this.thesinh*this.thesinh);
     eatmax=Math.sqrt(patmax*patmax+this.m4*this.m4);
     this.e4atmaxang=eatmax-this.m4;
     this.cmcos4max=(eatmax-this.e04*this.thecosh)/
                      (this.pcmp*this.thesinh);
    }
   }
   if( (this.m1+this.m2) == (this.m3+this.m4) ){
    if(thetatest > 0.9999 && thetatest < 1.001){
     this.theta4max=Math.PI/2.0;
     this.cmcos4max=1.0; 
     this.e4atmaxang=this.e04*this.thecosh
                     -this.cmcos4max*this.pcmp*this.thesinh-this.m4;
    }
   }
  }
 } //end constructor

 getpoints(kx, ky){
  //kx and ky define x and y axis variables, respectively
  var pts=[];
  var icos,cosnow,sinnow,qcm,xnow,ynow;
  var ppar3,ppar4,pperp3,pperp4,ptot3,ptot4,q3,q4,e3,e4,v3,v4;
  var r2deg,halfpi;
  r2deg=180.0/Math.PI;
  halfpi=Math.PI/2.0;
  for(icos=-this.ncoscm; icos<=this.ncoscm; icos++){
   cosnow=1.0*icos/(this.ncoscm);
   qcm=Math.acos(cosnow);
   ppar3=this.pcmp*this.thecosh*cosnow+this.e03*this.thesinh;
   sinnow=Math.sqrt(1.0-cosnow*cosnow);
   pperp3=this.pcmp*sinnow;
   ptot3=Math.sqrt(ppar3*ppar3+pperp3*pperp3);
   ppar4=-this.pcmp*this.thecosh*cosnow+this.e04*this.thesinh;
   pperp4=this.pcmp*sinnow;
   ptot4=Math.sqrt(ppar4*ppar4+pperp4*pperp4);
   if(cosnow== 1.0)q3=0.0;
   if(cosnow==-1.0){
    if(this.cmcos3max < 2.0){
     q3=0.0;
     if(this.m1+this.m2 == this.m3+this.m4)
      if(this.theta3max==Math.PI/2.0)q3=Math.PI/2.0;
    }else{
     q3=Math.PI;
    }
   } 
   if(cosnow==-1.0)q4=0.0;
   if(cosnow== 1.0){
    if(this.cmcos4max < 2.0){
     q4=0.0;
     if(this.m1+this.m2 == this.m3+this.m4)
      if(this.theta4max==Math.PI/2.0)q4=Math.PI/2.0;
    }else{
     q4=Math.PI;
    }
   }
   if(cosnow > -1.0 && cosnow < 1.0){
    if(ptot3 > 0.0)q3=Math.acos(ppar3/ptot3);
    if(ptot4 > 0.0)q4=Math.acos(ppar4/ptot4);
   }
   e3=this.e03*this.thecosh+cosnow*this.pcmp*this.thesinh-this.m3;
   e4=this.e04*this.thecosh-cosnow*this.pcmp*this.thesinh-this.m4;
   v3=ptot3/(e3+this.m3);
   v4=ptot4/(e4+this.m4);
   if(this.angunit === "crad"){
    q3=halfpi-q3;
    q4=halfpi-q4;
   } 
   if(this.angunit === "cmrad"){
    q3=1000.0*(halfpi-q3);
    q4=1000.0*(halfpi-q4);
   } 
   if(this.angunit === "mrad"){
    q3=1000.0*q3;
    q4=1000.0*q4;
   } 
   if(this.angunit === "cdeg"){
    q3=90.0-r2deg*q3;
    q4=90.0-r2deg*q4;
    qcm=r2deg*qcm;
   } 
   if(this.angunit === "deg"){
    q3=r2deg*q3;
    q4=r2deg*q4;
    qcm=r2deg*qcm;
   } 
   if(kx==1)xnow=q3;
   if(kx==2)xnow=q4;
   if(kx==3)xnow=qcm;
   if(kx==4)xnow=cosnow;
   if(kx==5)xnow=this.emult(e3);
   if(kx==6)xnow=this.emult(e4);
   if(kx==7)xnow=v3;
   if(kx==8)xnow=v4;
   if(kx==9)
    if(ptot3 > 0.001)xnow=this.pcmp*this.pcmp/(ptot3*ptot3)
                          *(cosnow*ppar3/ptot3
                            +sinnow*pperp3*this.thecosh/ptot3);
   if(kx==10)
    if(ptot4 > 0.001)xnow=this.pcmp*this.pcmp/(ptot4*ptot4)
                          *(cosnow*ppar4/ptot4
                            +sinnow*pperp4*this.thecosh/ptot4);
   if(ky==1)ynow=q3;
   if(ky==2)ynow=q4;
   if(ky==3)ynow=qcm;
   if(ky==4)ynow=cosnow;
   if(ky==5)ynow=this.emult(e3);
   if(ky==6)ynow=this.emult(e4);
   if(ky==7)ynow=v3;
   if(ky==8)ynow=v4;
   if(ky==9)
    if(ptot3 > 0.001)ynow=this.pcmp*this.pcmp/(ptot3*ptot3)
                          *(cosnow*ppar3/ptot3
                            +sinnow*pperp3*this.thecosh/ptot3);
   if(ky==10)
    if(ptot4 > 0.001)ynow=this.pcmp*this.pcmp/(ptot4*ptot4)
                          *(cosnow*ppar4/ptot4
                            +sinnow*pperp4*this.thecosh/ptot4);
   pts.push(xnow); pts.push(ynow);
  }//icos loop
  return pts;
 }

 emult(anenergy){
  var sen;
  if(this.enunit === "keV")sen=1000.0*anenergy;
  if(this.enunit === "MeV")sen=anenergy;
  if(this.enunit === "GeV")sen=0.001*anenergy;
  if(this.enunit === "TeV")sen=1.0e-6*anenergy;
  return sen;
 }//emult

 erounder(anenergy){
  var sen;
  if(this.enunit === "keV")sen=((1000.0*anenergy).toFixed(3))+" keV";
  if(this.enunit === "MeV")sen=(anenergy.toFixed(3))+" MeV";
  if(this.enunit === "GeV")sen=((0.001*anenergy).toFixed(3))+" GeV";
  if(this.enunit === "TeV")sen=((1.0e-6*anenergy).toFixed(3))+" TeV";
  return sen;
 }//erounder

 angrounder(anangle){
  var sang;
  if(this.angunit === "deg" || this.angunit === "cdeg")
   sang=(this.angfact*anangle).toFixed(2)+" degrees";
  if(this.angunit === "rad" || this.angunit === "crad")
   sang=anangle.toFixed(3)+" radians";
  if(this.angunit === "mrad" || this.angunit === "cmrad")
   sang=(1000.0*anangle).toFixed(3)+" mrad";
  return sang;
 }//angrounder

 rxnsummary(){
  var stext="";
  var sejectile=this.m3html;
  var srecoil=this.m4html;
  var srxn;
  srxn=this.m1html+"+"+this.m2html+"&rarr;"+
       this.m3html+"+"+this.m4html;
  srxn+=", E<sub>k</sub>="+this.erounder(this.ek);
  if(this.ex3.length > 0)srxn+=", E<sub>x</sub>("+this.m3html+")="+this.ex3;
  if(this.ex4.length > 0)srxn+=", E<sub>x</sub>("+this.m4html+")="+this.ex4;
  this.srxn=srxn;
  stext+="<h3>Reaction summary for "+srxn+"</h3>\n";
  stext+="<ul>\n<li>The maximum "+sejectile+" energy is ";
  stext+=this.erounder(this.emax3)+".\n";
  stext+="<li>The minimum "+sejectile+" energy is ";
  stext+=this.erounder(this.emin3)+".\n";
  if(this.cmcos3max < 2.0){
   stext+="<li>The maximum "+sejectile+" angle is "+
    this.angrounder(this.theta3max)+".\n";
   stext+="<li>The "+sejectile+" energy at angle "+
    this.angrounder(this.theta3max)+" is "+
    this.erounder(this.e3atmaxang)+".\n";
    
  }
  stext+="<li>The maximum "+srecoil+" energy is ";
  stext+=this.erounder(this.emax4)+".\n";
  stext+="<li>The minimum "+srecoil+" energy is ";
  stext+=this.erounder(this.emin4)+".\n";
  if(this.cmcos4max < 2.0){
   stext+="<li>The maximum "+srecoil+" angle is "+
    this.angrounder(this.theta4max)+".\n"; 
   stext+="<li>The "+srecoil+" energy at angle "+
    this.angrounder(this.theta4max)+" is "+
    this.erounder(this.e4atmaxang)+".\n";
  }
  stext+="</ul>\n";
  return stext;
 }//rxnsummary

}//end class twobody
