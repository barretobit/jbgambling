var color_pattern = []; //red or black
var type_pattern = []; //even or odd
var size_pattern = []; //high or low
var props = [null, null, null]; //stores the common properties. [color, type, size]
var opp; //stores opposite property
var resultList = []; //stores every number that came out
var p1, p2, p3, p4; //string variables to modify innerHTML

function submitNumber() {
  const numberInput = document.getElementById("numberInput");
  const inputValue = parseInt(numberInput.value, 10);
  var num = Number(inputValue);
  var radioButtons = document.getElementsByName("safetyLevel");

  var selectedOption = null;

  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      selectedOption = radioButtons[i].value;
      break; // Exit the loop once the selected radio button is found
    }
  }

  var betType = Number(selectedOption);

  if (num >= 0 && num <= 36) {
    resultList.push(num);
    if (num == 0) {
      color_pattern = [];
      type_pattern = [];
      size_pattern = [];
      document.getElementById("pattern1").innerHTML = "<p>Black/Red:</p>";
      document.getElementById("pattern2").innerHTML = "<p>Odd/Even:</p>";
      document.getElementById("pattern3").innerHTML = "<p>High/Low:</p>";
      resultList = [];
      var resultListString = resultList.join(", ");
      p4 = "<p>" + resultListString + "</p>";
      document.getElementById("resultHist").innerHTML = p4;
    } else {
      var clr = checkRouletteColor(num);
      pattern(num, clr, betType);
    }
  }
  numberInput.value = "";
}

document.getElementById("numberInput").addEventListener("keypress", function (event) {
  // Check if the 'Enter' key (key code 13) is pressed
  if (event.key === "Enter") {
    submitNumber(); // Call the submitNumber function when 'Enter' key is pressed
  }
});

function removePrevious() {
  if (resultList.length > 0) {
    resultList.pop(); // Remove the last element from resultList

    if (color_pattern.length > 0) {
      color_pattern.pop(); // Remove the last element from color_pattern
    }

    if (type_pattern.length > 0) {
      type_pattern.pop(); // Remove the last element from type_pattern
    }

    if (size_pattern.length > 0) {
      size_pattern.pop(); // Remove the last element from size_pattern
    }

    var color_pattern_list2 = color_pattern.join(", ");
    p1 = "<p>Black/Red: " + color_pattern_list2 + "</p>";
    var type_pattern_list2 = type_pattern.join(", ");
    p2 = "<p>Odd/Even: " + type_pattern_list2 + "</p>";
    var size_pattern_list2 = size_pattern.join(", ");
    p3 = "<p>High/Low: " + size_pattern_list2 + "</p>";
    var resultListString = resultList.join(", ");
    p4 = "<p>" + resultListString + "</p>";
    document.getElementById("resultHist").innerHTML = p4;
    document.getElementById("pattern1").innerHTML = p1;
    document.getElementById("pattern2").innerHTML = p2;
    document.getElementById("pattern3").innerHTML = p3;
  } else {
    alert("There are no previous numbers to remove.");
  }
}

function goBack() {
  window.location.href = "../index.html";
}

function pattern(num, clr, betType) {
  if (color_pattern.length == 0) {
    color_pattern.push(num);
    type_pattern.push(num);
    size_pattern.push(num);
    props = set_props(num, clr);
  } else {
    temp_props = set_props(num, clr);

    if (props[0] == temp_props[0]) {
      color_pattern.push(num);
    } else {
      color_pattern = [];
      color_pattern.push(num);
      props[0] = temp_props[0];
    }

    if (props[1] == temp_props[1]) {
      type_pattern.push(num);
    } else {
      type_pattern = [];
      type_pattern.push(num);
      props[1] = temp_props[1];
    }

    if (props[2] == temp_props[2]) {
      size_pattern.push(num);
    } else {
      size_pattern = [];
      size_pattern.push(num);
      props[2] = temp_props[2];
    }
  }

  if (color_pattern.length > betType) {
    if (props[0] == "black") {
      opp = "Red";
    } else {
      opp = "Black";
    }
    var color_pattern_list = color_pattern.join(", ");
    p1 = "<p>Black/Red: " + color_pattern_list + " - BET: " + opp + "</p>";
  } else {
    var color_pattern_list2 = color_pattern.join(", ");
    p1 = "<p>Black/Red: " + color_pattern_list2 + "</p>";
  }

  if (type_pattern.length > betType) {
    if (props[1] == "even") {
      opp = "Odd";
    } else {
      opp = "Even";
    }
    var type_pattern_list = type_pattern.join(", ");
    p2 = "<p>Odd/Even: " + type_pattern_list + " - BET: " + opp + "</p>";
  } else {
    var type_pattern_list2 = type_pattern.join(", ");
    p2 = "<p>Odd/Even: " + type_pattern_list2 + "</p>";
  }

  if (size_pattern.length > betType) {
    if (props[2] == "high") {
      opp = "Low";
    } else {
      opp = "High";
    }
    var size_pattern_list = size_pattern.join(", ");
    p3 = "<p>High/Low: " + size_pattern_list + " - BET: " + opp + "</p>";
  } else {
    var size_pattern_list2 = size_pattern.join(", ");
    p3 = "<p>High/Low: " + size_pattern_list2 + "</p>";
  }

  document.getElementById("pattern1").innerHTML = p1;
  document.getElementById("pattern2").innerHTML = p2;
  document.getElementById("pattern3").innerHTML = p3;

  var resultListString = resultList.join(", ");
  p4 = "<p>" + resultListString + "</p>";
  document.getElementById("resultHist").innerHTML = p4;
}

function set_props(num, clr) {
  var temp_props = [null, null, null];
  temp_props[0] = clr;

  if (num % 2 == 0) {
    temp_props[1] = "even";
  } else {
    temp_props[1] = "odd";
  }
  if (num < 19) {
    temp_props[2] = "low";
  } else {
    temp_props[2] = "high";
  }

  return temp_props;
}

function checkRouletteColor(number) {
  if (number === 0) {
    return "green";
  } else if (number % 2 === 0 && number >= 1 && number <= 10) {
    // Even numbers between 1 and 10 are black
    return "black";
  } else if (number % 2 !== 0 && number >= 1 && number <= 10) {
    // Odd numbers between 1 and 10 are red
    return "red";
  } else if (number % 2 === 0 && number >= 11 && number <= 18) {
    // Even numbers between 11 and 18 are red
    return "red";
  } else if (number % 2 !== 0 && number >= 11 && number <= 18) {
    // Odd numbers between 11 and 18 are black
    return "black";
  } else if (number % 2 === 0 && number >= 19 && number <= 28) {
    // Even numbers between 19 and 28 are black
    return "black";
  } else if (number % 2 !== 0 && number >= 19 && number <= 28) {
    // Odd numbers between 19 and 28 are red
    return "red";
  } else if (number % 2 === 0 && number >= 29 && number <= 36) {
    // Even numbers between 29 and 36 are red
    return "red";
  } else {
    // Odd numbers between 29 and 36 are black
    return "black";
  }
}
