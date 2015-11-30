"use strict"

/*
*@author WeRDying
*@e-mail heyin223@163.com
*version V1.0
*
*/

window.onbeforeunload = function() {
    saveAll();
    return 'You have unsaved changes!';
}

window.onload = function(){
	init();
	checkList();
	// alert("You'd better use Google Chrome");
}

var modal = document.getElementById("newlist-item");
var addBtn = document.getElementById("add");
var newBtn = document.getElementById("new-list");
var cancelBtn = document.getElementById("cancel");
var cleanAll = document.getElementById("delete");
var cleanCompleted = document.getElementById("clean-list");
var panel = document.getElementById("panel");

newBtn.addEventListener("click",showModal);
addBtn.addEventListener("click",newList);
cancelBtn.addEventListener("click",cancel);
cleanAll.addEventListener("click",delAllList);
cleanCompleted.addEventListener("click",cleanAllList);
/*
*initialize when page open
*/
function init(){
	var count = localStorage.getItem("listCount");
	var ul = document.getElementById("list");
	// alert(count);
	for(var i = 0; i < parseInt(count); i++){

		var item = JSON.parse(localStorage.getItem("list"+i));
		var content = item.content;
		var status = parseInt(item.status);

		var li =  document.createElement("li");
		var div = document.createElement("div");
		var span = document.createElement("span");
		var input = document.createElement("input");
		input.addEventListener("click",checked);
		input.setAttribute("type","checkbox");
		div.innerHTML = content;
		span.innerHTML = "del";
		span.addEventListener("click",deleteOne);
		div.setAttribute("contenteditable","true");

		if(status == 1){
			input.setAttribute("checked","checked");
		}

		li.appendChild(input);
		li.appendChild(div);
		li.appendChild(span);
		ul.appendChild(li);
	}
}

/*
* save all todo list
*/
function saveAll(){
	localStorage.clear();
	var list = document.getElementById("list").getElementsByTagName("li");
	var count = list.length;

	for(var i = 0; i < count; i++){
		if(list[i].getElementsByTagName("input")[0].checked){
			var status = 1;
		}else{
			var status = 0;
		}
		var item = {
			status:status,
			content:list[i].getElementsByTagName("div")[0].innerHTML
		}
		// alert(list[i].childNodes[1].innerHTML);
		localStorage.setItem("list"+i,JSON.stringify(item));
	}
	localStorage.setItem("listCount",count);
}

/*
*delete all todo list
*/
function delAll(){
	localStoryage.clear;
	document.getElementById("list").innerHTML = "";
}

/*
*add a new todolist item
*/
function newList () {
	var content = document.getElementById("new-content").value;
	var ul = document.getElementById("list");
	var status = 0; //not complete

	if(content != null && content != ""){
		var li =  document.createElement("li");
		var div = document.createElement("div");
		var span = document.createElement("span");
		var input = document.createElement("input");
		input.setAttribute("type","checkbox");
		input.addEventListener("click",checked);
		div.innerHTML = content;
		div.setAttribute("contenteditable","true");
		span.innerHTML = "del";
		span.addEventListener("click",deleteOne);

		li.appendChild(input);
		li.appendChild(div);
		li.appendChild(span);
		ul.appendChild(li);

		saveAll();
		modal.style.display = "none";
	}else{
		alert("you must write something");
	}
}

/*
*show modal frame
*/
function showModal(){
	modal.style.display = "block";
}

/*
*check all listItem which is completed and cahnge the color
*/
function checkList(){
	var list = document.getElementById("list").getElementsByTagName("li");
	for(var i = 0; i < list.length ; i++){

		if(list[i].getElementsByTagName("input")[0].checked){
			list[i].getElementsByTagName("div")[0].setAttribute("class","completed");
		}else{
			list[i].getElementsByTagName("div")[0].removeAttribute("class");
		}
		// console.log(list[i].getElementsByTagName("div")[0].nodeName);

	}
	setTimeout(checkList,100);
	panel.innerHTML = countIncomplete();

}

/*
*delete one listItem
*/
function deleteOne (event) {
	event = event || window.event;
	event.target.parentNode.parentNode.removeChild(event.target.parentNode);
}
/*
*clean all list
*/
function delAllList() {
	localStorage.clear();
	var ul = document.getElementById("list");
	ul.innerHTML = "";
}

/*
*clean list item which has been finished
*/
function cleanAllList(){
	var list = document.getElementById("list").getElementsByTagName("li");
	for(var i = 0; i < list.length; i++){
		if(list[i].getElementsByTagName("input")[0].checked){
			list[i].parentNode.removeChild(list[i]);
			console.log(list[i]);
		}
	}
	saveAll();
}

/*
*return the number of incomplete
*/
function countIncomplete(){
	var count = 0;
	var list = document.getElementById("list").getElementsByTagName("li");
	for(var i = 0; i < list.length; i++){
		if(list[i].getElementsByTagName("input")[0].checked) count++;
	}
	return list.length - count;
}
/*
*saveAll when click checkedBtn
*/
function checked(){
	saveAll();
}

/*
*close modal
*/
function cancel () {
	modal.style.display = "none";
}