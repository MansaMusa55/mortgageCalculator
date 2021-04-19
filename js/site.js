//This function grabs each value that the user entered
function numbersEntered() {
    //Loan amount entered by user
    let amount = Number(document.getElementById("amount").value);
    //Interest amount entered by user
    let interestRate = document.getElementById("interestRate").value;
    //Loan term
    let months = document.getElementById("months").value;

    let loanNumbers = calculateLoan(amount, interestRate, months);

displayData(loanNumbers, amount);
    

}
//This Function calculates our interestRate and monthlyPayments
//also creates a for loop for our payment schedule table 
function calculateLoan(amount, interestRate, months){
    let rate = interestRate / 1200;
    //Formula for monthly payments
    let monthlyPayment = (amount) * (rate) / (1 - Math.pow((1 + rate), -months));
    let remainingBalance = amount;
    let totalInterest = 0;
    let totalPrincipal = 0;
    //displays monthly payment and principle to UI
    document.getElementById("monthlyPayment").innerHTML = `$${monthlyPayment.toFixed(2)}`;
    document.getElementById("totalPrinciple").innerHTML = `$${amount}`;

    let output = [];
//In this for loop we are looping through an object 
//that pushes new information to the end of the list until it reaches the max month
    for(let i = 1; i <= months; i++){
        let interestPayment = remainingBalance * rate;
        let principalPayment = monthlyPayment - interestPayment;
        let obj = {};
        obj["month"] = i;
        obj["payment"] = monthlyPayment;
        obj["interest"] = interestPayment;
        obj["principal"] = principalPayment;
        obj["balance"] = remainingBalance -= principalPayment;
        obj["currentPTotal"] = currentPTotal = totalPrincipal += principalPayment;
        obj["totalInterest"] = currentITotal = totalInterest += interestPayment;
        obj["currentTTotal"] = currentPTotal + currentITotal;
        
        output.push(obj);
    }

    return output;
}

//This function displays data to the resultsBody which is linked to the HTML
function displayData(addMortgage, amount) {
    const template = document.getElementById("Data-template");
    const resultsBody = document.getElementById("resultsBody");
//This for loop loops through the template and inserts row data until the array reaches addMortgage.length
    resultsBody.innerHTMl = "";
    for (let i = 0; i <= addMortgage.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("month").textContent = addMortgage[i].month;
        dataRow.getElementById("payment").textContent = `$${addMortgage[i].payment.toFixed(2)}`;
        dataRow.getElementById("principal").textContent = `$${addMortgage[i].principal.toFixed(2)}`;
        dataRow.getElementById("interest").textContent = `$${addMortgage[i].interest.toFixed(2)}`;
        dataRow.getElementById("totalInterest").textContent = `$${addMortgage[i].totalInterest.toFixed(2)}`;
        dataRow.getElementById("balance").textContent = `$${addMortgage[i].balance.toFixed(2)}`;

        resultsBody.appendChild(dataRow)

        if(i == addMortgage.length - 1){
            document.getElementById("totalInterest").innerHTML = `$${addMortgage[i].totalInterest.toFixed(2)}`;
            document.getElementById("totalCost").innerHTML = `$${(parseInt(amount) + parseInt(addMortgage[i].totalInterest)).toFixed(2)}`;        
        }
    }
}