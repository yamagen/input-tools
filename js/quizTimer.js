// qk-timer.js --==*==-- --==*==-- --==*==-- --==*==--
// global
var gSeiseki = new Array(5);
var gTimeLimit;
var gTimeStart;
var gTid;

function TimeInit(tt){
    gTimeLimit = tt * 60 *1000;
//    alert("test started");
    dd = new Date();  
    gTimeStart = dd.getTime();
    gTid = setInterval('TimeDisplay()', 1000); 
}

function TimeDisplay(){
    now = new Date();  
    dt = now.getTime() - gTimeStart; 
    now.setTime(dt + now.getTimezoneOffset() * 60 * 1000); 
    dt1 = "0" + now.getHours();
    dt1 = dt1.substring(dt1.length - 2, dt1.length);
    dt2 = "0" + now.getMinutes();
    dt2 = dt2.substring(dt2.length - 2, dt2.length);
    dt3 = "0" + now.getSeconds();
    dt3 = dt3.substring(dt3.length - 2, dt3.length);
    var lim = document.getElementById('TLIMIT');
    lim.innerHTML = dt1 + ":" + dt2 + ":" + dt3;
//    qk.TLIMIT.value = dt1 + ":" + dt2 + ":" + dt3;
    if(dt > gTimeLimit){
        clearTimeout(gTid);
	//        alert("Test ended and click [OK]");
	lim.innerHTML = 'Test ended';
//	qk.TLIMIT.value = 'Test ended';
	qk.submit();
    }
}
