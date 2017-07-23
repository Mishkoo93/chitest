var http = require("http");
var arr = [];
var response_letters = [];

function checkNum(num) { //method which count cool number
    result = num.toString().split(""); //split number and get array of this
    for (k = 0; k < result.length; k++) { //foreach number in array
        result[k] = Math.pow(result[k], 2); // count ^2
    }
    result = result.reduce(function (a, b) { //summ numbers in array
        return a + b
    }); //now we have result
    if (result === 4) { // use TIP. if result 4 SOLUTION NOT FOUND
        return result; //return 4
    }
    else if (result > 1) { // SOLUTION NOT FOUND - CONTINUE COUNTING...
        checkNum(result);
    }
    else if (result === 1) { // SOLUTION FOUND
        return result; //return 1
    }
    return result; //return 4 or 1
}

for (i = 1; i <= 1000000; i++) {  // main loop
    if (checkNum(i) === 1) arr.push(i);
}
COOL_NUMBERS_SUM = arr.length > 1 ? arr.reduce(function (a, b) {
    return a + b
}) : arr.pop(); //if elements > 1 - summ. else pop first.

console.log('COOL_SUM:', COOL_NUMBERS_SUM); //debug output

for (i = 1; i <= 100; i++) {
    var options = {
        hostname: 'dev.getethos.com',
        method: 'POST',
        path: '/code' + i,
        headers: {
            'X-COOL-SUM': COOL_NUMBERS_SUM //70601040511 debug
        }
    };
    var req = http.request(options, function (res) {
        res.setEncoding('UTF-8');
        res.on('data', function (body) {
            if (body !== "Not Found") {
                response_letters.push(body); //add letter to array
            }
        });
    });
    req.end();
}

setTimeout(function () {
    console.log(response_letters.join('')) //wait for get all letters
}, 5000);