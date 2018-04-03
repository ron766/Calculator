/**
* @author rohan patil
	@description calculator code
*/


/**
*	@description declaring input array
*/
var exp
exp = "";

/**
*	@function fetchNos(val:string) 
*	@description fetching numbers from textbox
*	@param {array} 
*/
function fetchNos(val) 
{
	document.getElementById('inputNum1').value += val;
	exp += val;
}

/**
*	@function fetchKeys(val:string)
*	@description fetching from textbox and appending operator with |
*	@param {array}
*/
function fetchKeys(val) 
{

	document.getElementById('inputNum1').value += val;
	if(val=="+" || val == "-" || val == "/" || val == "*")
	{
		operator = val;
	}
	exp = exp + "|" + operator + "|";
}

/**
*	@function equalsAns()
*	@description splitting array and passing it to the function calculation(inputNo:array) 
*/
function  equalsAns() 
{
	var inputNo = exp.split("|");  
	calculation(inputNo);
}

/**
*	@function calculation(inputNo:array)
*	@description main calculation code 
*	@param {array} split by pipe
*/
function calculation(inputNo)
{
	debugger;
	let index = 0;
	let ans = 0;
		

		//Division forEach
		inputNo.forEach((input) =>
		{
			debugger;
			if (input == "/")
			{	
				let num1 = index - 1;
				let num2 = index + 1;
				ans = parseInt(inputNo[num1]) / parseInt(inputNo[num2]);
				inputNo.splice(index , 2);
				inputNo[num1] = ans.toString();
			}
			index += 1;
		});
		index = 0;

		//Multiplication
		inputNo.forEach((input) =>
		{ 
		debugger;             
			if (input == "*")
			{
				let num1 = index - 1;
				let num2 = index + 1;
				ans = parseInt(inputNo[num1]) * parseInt(inputNo[num2]);
				inputNo.splice(index , 2);
				inputNo[num1] = ans.toString();

			}
			index += 1;	
		});	
		index = 0;	

		//Addition
		inputNo.forEach((input) =>
		{ 
		debugger;             
			if (input == "+")
			{
				let num1 = index - 1;
				let num2 = index + 1;
				ans = parseInt(inputNo[num1]) + parseInt(inputNo[num2]);
				inputNo.splice(index , 2);
				inputNo[num1] = ans.toString();

			}
			index += 1;	
		});	
		index = 0;	
		
		//Subtraction
		inputNo.forEach((input) =>
		{ 
		debugger;             
			if (input == "-")
			{
				let num1 = index - 1;
				let num2 = index + 1;
				ans = parseInt(inputNo[num1]) - parseInt(inputNo[num2]);
				inputNo.splice(index , 2);
				inputNo[num1] = ans.toString();
			}
			index += 1;	
		});	
		index = 0;	
		document.getElementById('inputNum1').value = ans;
}

/**
*	@function clearTxt() 
*	@description clear input textbox
*/
function clearTxt() 
{
	document.getElementById("inputNum1").value = "";
	exp = "";
}





