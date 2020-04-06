function start() {
	signup();
	uid();
}
//assigns an id in the uiddirectory file to the username
function uid() {

var xhr = new XMLHttpRequest(),
    jsonArr,
    method = "GET",
    jsonRequestURL = "uiddirectory/";

xhr.open(method, jsonRequestURL, true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == 4 && xhr.status == 200)
    {
        jsonArr = JSON.parse(xhr.responseText);
		var last = Object.keys(jsonArr.ids).length + 1;
        jsonArr["ids"][document.getElementById("Uusername").value] = last;

        xhr.open("POST", jsonRequestURL, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("jsonTxt="+JSON.stringify(jsonArr));
    }
};
xhr.send(null);
return;
}	
//creates profile in the users.json file
function signup() {
var xhr = new XMLHttpRequest(),
    jsonArr,
    method = "GET",
    jsonRequestURL = "jsonFile/";

xhr.open(method, jsonRequestURL, true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == 4 && xhr.status == 200)
    {
        jsonArr = JSON.parse(xhr.responseText);
		var name0 = document.getElementById("name0").value;
		if(document.getElementById("name1").value === ""){var name1 = null} else{var name1 = document.getElementById("name1").value}
		var name2 = document.getElementById("name2").value;
		var bday0 = document.getElementById("bday0").value;
		var bday1 = document.getElementById("bday1").value;
		var bday2 = document.getElementById("bday2").value;
		var email = document.getElementById("e_mail").value;
		var Username = document.getElementById("Uusername").value;
		var Password = document.getElementById("password").value;
		
        jsonArr.Users.push(         {
            "Name":[
               name0,
               name1,
               name2
            ],
            "Birthday":[
               bday0,
               bday1,
               bday2
            ],
            "Username":Username,
            "Password":Password,
			"email": email,
            "Hollidays":[
            ]
         });

        xhr.open("POST", jsonRequestURL, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("jsonTxt="+JSON.stringify(jsonArr));
    }
};
xhr.send(null);

//sends an email to the person to wlcome them
var email = document.getElementById("e_mail").value;
var Username = document.getElementById("Uusername").value;
var Password = document.getElementById("password").value;
		var name0 = document.getElementById("name0").value;
		if(document.getElementById("name1").value === ""){var name1 = ""} else{var name1 = document.getElementById("name1").value + " "}
		var name2 = document.getElementById("name2").value;
Email.send({
	SecureToken: "see https://www.smtpjs.com/",
    To : email,
    From : "from",
	Name: "",
    Subject : "!",
    Body : "<html><head><link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet'></head><body style='font-family: 'Roboto', sans-serif;'><img src='your logo' style='width: 30%; margin-right: 5%;'><p>Welcome, " + name0 + " " + name1 + name2 + " ,to your project name</p><p style='display: inline-block'>Your username is: </p><p style=' display: inline-block; color: #24b973'>" + Username + "</p><br><p style='display: inline-block'>Your password is: </p><p style=' display: inline-block; color: #24b973'>" + Password + "</p><p>Have fun!</p><p>hThe team of your project name</p></body></html>"
});
}

//accacibility feature, uncover password.
function visible() {
	document.getElementById("password").type="text";
	setTimeout(function(){
		document.getElementById("password").type="password";
			}, 2000);}
