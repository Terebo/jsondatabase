function start() {
	//fetch user id from uiddirectory.json
		var a_username = document.getElementById("Uusername").value;
	    var a = $.ajax({
		url: 'signup/uiddirectory/uiddirectory.json',
		type: "GET",
		dataType: "json",
		success: function (response) {
			if(response.ids[a_username] === undefined) {
			document.getElementById("hai").innerHTML = "unknown username";
			document.getElementById("hai").style.color = "red";
			document.getElementById("hai").style.display = "block";
			document.getElementById("hideMe").style.display = "none";
			return;}
		else {
		window.extra = response.ids[a_username]-1;}}
  });
	
	
	
	
	//use the fetched id to find the person in users.json and get password and username
     var j = $.ajax({
       url: 'signup/jsonFile/users.json',
       type: "GET",
       dataType: "json",
       success: function (response) {
         var myObj = response.Users;
		 var id_username = window.extra;
       var u_username = myObj[id_username]["Username"];
	   var u_password = myObj[id_username]["Password"];
	   var u_name = myObj[id_username]["Name"];
	   var u_middlename;
	   if (u_name[1] === null){u_middlename = "";} else{u_middlename = u_name[1];};
			if (document.getElementById("Uusername").value === u_username && document.getElementById("password").value === u_password){
			window.FullName = "welcome " + u_name[0] + " " + u_middlename + " " + u_name[2];
			through(Uusername.value);
			document.getElementById("hai").style.display = "blcok";
			document.getElementById("hideMe").style.display = "block";
			document.getElementById("hai").innerHTML = window.FullName;
			document.getElementById("hai").style.color = "#D1DAD9";
			document.getElementById("hai").style.fontSize = "16pt";
			}
			else {
			document.getElementById("hai").innerHTML = "incorrect password";
			document.getElementById("hai").style.color = "red";
			document.getElementById("hai").style.display = "block";
			document.getElementById("hideMe").style.display = "none";
			}
    }
  });

} 
	//after password and username are correct, search the info in the users.json database, and create the selectable divs for every entry.		
function through(username) {
		var inputdiv = document.getElementById("hideMe");
		inputdiv.innerHTML = "<div id='header' style='background-color: #292b2f; color: #D1DAD9; height: 60pt; font-size: 50pt; margin-top:-50pt; text-align: center; border-left: 1vw solid #ffe163; position: sticky; top: 0; z-index: 2; backgound-color: #292b2f;'><p>Hollidays:</p></div>";
	    
		var a = $.ajax({
		url: 'signup/jsonFile/users.json',
		type: "GET",
		dataType: "json",
		success: function (response) {
		var Response = response.Users;
		var id_username = window.extra;
        var hollidaysobj = Response[id_username]["Hollidays"];
		var i = 0;
		hollidaysobj.forEach(function(){
		i = i + 1;})
		console.log(i);
		var amount = -1;
		htypeinit();
		console.info("fase 1 started")
		setTimeout(function(){
		hollidaysobj.forEach(function(){
			amount = amount+1;
			console.info("done");
			console.log(hollidaysobj.lenght);
		inputdiv.innerHTML = inputdiv.innerHTML + "<div class='selectbutton' onclick='selectbutton(" + amount + ")' id='selectbutton" + amount + "'><p>Name: " + eval("window.hname" + amount) + "</p><p>amount of people: " + hollidaysobj[amount]["AmountOfPeople"] + "</p><p>date: " + hollidaysobj[amount]["Date"][0] + "-" + hollidaysobj[amount]["Date"][1] + "-" + hollidaysobj[amount]["Date"][2] + "</p></div>";
		})
		}, 25 * i)
		}
		})
		}

//accacibility feature, uncover password.
function visible() {
	document.getElementById("password").type="text";
	setTimeout(function(){
		document.getElementById("password").type="password";
			}, 2000);}

//function for selecting buttons. resets all buttons to unclicked state, then sets the clicked button to the clicked state			
function selectbutton(amount){
	var clickdiv = document.getElementById("selectbutton" + amount);
	var inputdiv = document.getElementById("hideMe");
	var headerdiv = document.getElementById("header");
	var alldivs = inputdiv.querySelectorAll("div");
	alldivs.forEach(function(element) {
		element.style.boxShadow = "0px 0.0vh 0.0vh 0px rgba(0, 0, 0, 0)";
		element.style.borderLeft = "1vw solid #ffe163";
		element.style.zIndex = "0";
		headerdiv.style.zIndex = "2";});
	clickdiv.style.borderLeft = "1vw solid #24b973";
	clickdiv.style.boxShadow = "0px 0.8vh 0.4vh 0px rgba(0, 0, 0, 0.25)";
	clickdiv.style.zIndex = "1";
	headerdiv.style.zIndex = "2";
}

//1.fetch Name of holliday 2. assign name to global variable
function htypeinit() {
		var b = $.ajax({
		url: 'hollidays.json',
		type: "GET",
		dataType: "json",
		success: function (response) {
		window.fetchedhresponse = response
		console.info("recieved")
		hollidaytype();
}});}
function hollidaytype() {
		console.info("fase 2 started")
		var fetchedhresponse = window.fetchedhresponse;
	    var a = $.ajax({
		url: 'signup/jsonFile/users.json',
		type: "GET",
		dataType: "json",
		success: function (response) {
		var Response = response.Users;
		var id_username = window.extra;
        var hollidaysobj = Response[id_username]["Hollidays"];
		var amount = -1;
		window.hamout = -1;
		var htype;
		var tempstorage = 0;
		hollidaysobj.forEach(function(){
			amount = amount+1;
			window.hamout = amount;
			eval("tempstorage" + "= '" + hollidaysobj[amount]["HollidayType"] + "'");
			eval("window.hname" + window.hamout + " = fetchedhresponse.holldiays['" + tempstorage + "'][\"name\"]");
		});console.info("fase 2 finished");}});
}