var color_pattern = [];           //red or black 
var type_pattern = [];            //even or odd
var size_pattern = [];            //high or low
var props = [null, null, null];   //stores the common properties. [color, type, size]
var opp;                          //stores opposite property
var resultList = [];              //stores every number that came out
var p1, p2, p3, p4;               //string variables to modify innerHTML

$(document).ready(function () {
    $("td ").click(function () {
        var num = Number(this.getAttribute("value"));
        resultList.push(num);

        if (num == 0) {
            color_pattern = [];
            type_pattern = [];
            size_pattern = [];
            $("#pattern1").html("<p>Black/Red:</p>");
            $("#pattern2").html("<p>Odd/Even:</p>");
            $("#pattern3").html("<p>High/Low:</p>");

            resultList = [];
            var resultListString = resultList.join(', ');
            p4 = "<p>Results History:</p><p>" + resultListString + "</p>";
            $("#resultHist").html(p4);
        }
        else {
            var clr = String(this.getAttribute("class"));
            pattern(num, clr);
        }
    });
});

function pattern(num, clr) {
    if (color_pattern.length == 0) {
        color_pattern.push(num);
        type_pattern.push(num);
        size_pattern.push(num);
        props = set_props(num, clr);
    }
    else {
        temp_props = set_props(num, clr);

        if (props[0] == temp_props[0]) {
            color_pattern.push(num);
        }
        else {
            color_pattern = [];
            color_pattern.push(num);
            props[0] = temp_props[0];
        }

        if (props[1] == temp_props[1]) {
            type_pattern.push(num);
        }
        else {
            type_pattern = [];
            type_pattern.push(num);
            props[1] = temp_props[1];
        }

        if (props[2] == temp_props[2]) {
            size_pattern.push(num);
        }
        else {
            size_pattern = [];
            size_pattern.push(num);
            props[2] = temp_props[2];
        }
    }

    if (color_pattern.length > 4) {
        if (props[0] == "black") {
            opp = "Red";
        }
        else {
            opp = "Black";
            var color_pattern_list = color_pattern.join(', ');
            p1 = "<p>Black/Red:</p><p>" + color_pattern_list + "<br><br>" + color_pattern.length + " " + props[0] + "s in a row.<br><h2>Bet: " + opp + "<h2></p>";
        }
    }
    else {
        var color_pattern_list = color_pattern.join(', ');
        p1 = "<p>Black/Red:</p><p>" + color_pattern_list + "</p>";
    }

    if (type_pattern.length > 4) {
        if (props[1] == "even") {
            opp = "Odd";
        }
        else {
            opp = "Even";
            var type_pattern_list = type_pattern.join(', ');
            p2 = "<p>Odd/Even:</p><p>" + type_pattern_list + "<br><br>" + type_pattern.length + " " + props[1] + "s in a row.<br><h2>Bet: " + opp + "<h2></p>";
        }
    }
    else {
        var type_pattern_list = type_pattern.join(', ');
        p2 = "<p>Odd/Even:</p><p>" + type_pattern_list + "</p>";
    }

    if (size_pattern.length > 4) {
        if (props[2] == "high") {
            opp = "Low [1-18]";
        }
        else {
            opp = "High [19-36]";
            var size_pattern_list = size_pattern.join(', ');
            p3 = "<p>High/Low:</p><p>" + size_pattern_list + "<br><br>" + size_pattern.length + " " + props[2] + "s in a row.<br><h2>Bet: " + opp + "<h2></p>";
        }
    }
    else {
        var size_pattern_list = size_pattern.join(', ');
        p3 = "<p>High/Low:</p><p>" + size_pattern_list + "</p>";
    }

    $("#pattern1").html(p1);
    $("#pattern2").html(p2);
    $("#pattern3").html(p3);

    var resultListString = resultList.join(', ');
    p4 = "<p>Results History:</p><p>" + resultListString + "</p>";
    $("#resultHist").html(p4);
}

function set_props(num, clr) {
    var temp_props = [null, null, null];
    temp_props[0] = clr;

    if (num % 2 == 0) {
        temp_props[1] = "even";
    }
    else {
        temp_props[1] = "odd";
    }
    if (num < 19) {
        temp_props[2] = "low";
    }
    else {
        temp_props[2] = "high";
    }

    return temp_props;
}