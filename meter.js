
var disk = require('diskusage');
const os =require('os')
var osutils =require('os-utils');
var inter=require('./helper.js');
var ntimes=10000000000;
var delay=1000;

let path = os.platform() === 'win32' ? 'c:' : '/';
//disk Usage in GB
disk.check(path,function(err,info){
 if(err){
   console.log(err);
 }
else{
  var g1 = new JustGage({
    id: 'g1',
    value:inter.bytesToSize(info.free),
    min: 0,
    max: inter.bytesToSize(info.total),
    label:"DISK USAGE",
    symbol: 'GB',
    pointer: true,
    gaugeWidthScale: 0.5,
    counter: true,
    relativeGaugeSize: true
  });
}
});
//CPU Usage in percentage
osutils.cpuUsage( (v)=>{
  var g2 =  new JustGage({
    id: 'g2',
    value:v*100,
    label:'CPU',
    min: 0,
    max: 100,
    symbol: '%',
    pointer: true,
    gaugeWidthScale: 0.5,
    counter: true,
    relativeGaugeSize: true
  });
  inter.interval(function(){osutils.cpuUsage((v)=>{g2.refresh(v*100);})},delay,ntimes);
  
});
//RAM Usage in MB
var totalmem = osutils.totalmem();
var freemem=osutils.freemem();
  var g3 = new JustGage({
    id: 'g3',
    label: 'RAM',
    value:(totalmem-freemem),
    min: 0,
    max: Math.floor(totalmem),
    symbol: 'MB',
    pointer: true,
    gaugeWidthScale: 0.5,
    counter: true,
    relativeGaugeSize:true
  });
 inter.interval(function(){g3.refresh((osutils.totalmem()-osutils.freemem()))},delay,ntimes);