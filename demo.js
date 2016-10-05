function changeHeading() {
    document.getElementById("heading").innerHTML = "JavaScript Lab";
    var name = "Chai";
    console.log("hello" + name);
}

function displayTime() {
    var date = new Date();
    var localDate = date.toLocaleDateString("fi");
    var timeout = document.getElementById("timeout");
    timeout.innerHTML = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    timeout.innerHTML = date.toLocaleDateString("fi") + "   " + date.toLocaleTimeString("fi");
    
    var time;
    // CALL THE FUNCTION EVERY 1 SECOND (RECURSION).
    time = setInterval('displayTime()', 1000);
}

function displayMonth(param)
{
    var months = { 'January': 31, 'Feburary': 28, 'March': 31, 'April': 30, 'May': 31, 'June': 30, 'July': 31, 'August': 30, 'September': 31, 'October': 30, 'November': 31, 'December': 30 };
    var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];
    var daycounter = 0;
    var day = new Date();
    day.setDate(1);
    day.setMonth(0);
    var year =document.getElementById(param).value;
    day.setYear(year);
    var wday = day.getDay();
    wday--;
    var cal = document.getElementById("calendar");
    console.log(Object.keys(months).length);
    cal.innerHTML = Object.keys(months) + "<br/>";
    cal.innerHTML += "<p >Months</P>";
    for (var month in months)
    {
        var value = months[month];
        var weekday;
        
        //document.write('<p>' + cal.innerHTML = key + ':' + value + "<BR/>");
        
        cal.innerHTML += "<p style='font-weight:bold;'>" + month + "</p>";
        cal.style.fontWeight = "bolder";
        for(daycounter=1;daycounter<=months[month];daycounter++)
        {            
            console.log(wday);
            weekday = weekdays[(daycounter+wday) % 7 ];
            cal.innerHTML += daycounter + "  " + weekday + "</P> ";           
        }
        wday = weekdays.indexOf(weekday);
        
    }
    
    
}

function printDebugLogs() {
    console.log("hello");
    
}