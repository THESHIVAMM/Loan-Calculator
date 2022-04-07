//Listen to the submit event
document.getElementById('loan-form').addEventListener('submit',function(e){
    //Hide results
    document.getElementById('results').style.display = 'none';
    //Show loading gif
    document.getElementById('loading').style.display = 'block';
    setTimeout(CalculateResults,3000);
    e.preventDefault();
});

//function 'CalculateResults'
function CalculateResults(){
    console.log('Calculating');

    //UI Vars
    const UIamount = document.getElementById('amount');
    const UIinterest = document.getElementById('interest');
    const UIyears = document.getElementById('years');
    const UImonthlyPayment = document.getElementById('monthly-payment');
    const UItotalPayment = document.getElementById('total-payment');
    const UItotalInterest = document.getElementById('total-interest');

    //convert UI vars value to useable float values
    const principle = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(UIyears.value) * 12;

    //compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)) {
        UImonthlyPayment.value = monthly.toFixed(2);
        UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        UItotalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);
        //Show results
        document.getElementById('results').style.display = 'block';
        //Hide loading gif
         document.getElementById('loading').style.display = 'none';
    }else{
        showError('Please check your entered numbers!!!');
    }
}

//function showError()
function showError(error){
    //Hide results
    document.getElementById('results').style.display = 'none';
    //Hide loading gif
    document.getElementById('loading').style.display = 'none';

    //create a div for error message
    const errorDiv = document.createElement('div');

    //Add class to give it color and UI
    errorDiv.className = 'alert alert-danger';

    //Add text node with error message
    errorDiv.appendChild(document.createTextNode(error));

    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //enter error message above haeding in the card
    card.insertBefore(errorDiv,heading);

    //Clear error message after 3 seconds
    setTimeout(clearError,3000);
}

//Function clearError
function clearError(){
    document.querySelector('.alert').remove();
}