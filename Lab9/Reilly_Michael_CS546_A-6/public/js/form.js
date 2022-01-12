(function () {
    function fibonacci(num) {
        if(num==1){
            return 1;
        }
        if(num<1){
            return 0;
        }
        
        let a=1;
        let b=0;
        let temp;

        while(num>=1){
            temp=a;
            a=a+b;
            b=temp;
            num--;
        }
        return parseInt(b);
    }

    function isPrime(num) {
        if (num <= 1) {
            return false;
        }
        let i;
        for (i = 2; i < num; i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }

    // Michael Reilly
    // I pledge my honor that I have abided by the Stevens Honor System.

    const mainForm = document.getElementById('main-form');
    if (mainForm) {
        
        const errorContainer = document.getElementById('error-container');
        const errorTextElement = errorContainer.getElementsByClassName('alert-danger')[0];

        const resultContainer = document.getElementById('results-container');
        const resultTextElement = resultContainer.getElementsByClassName('alert-success')[0];

        mainForm.addEventListener('submit', (event) => {
            event.preventDefault();
            errorContainer.classList.add('hidden');
            resultContainer.classList.add('hidden');

            const number = parseInt(document.getElementById('number').value);

            if (number === undefined || number === null) {
                errorTextElement.textContent = 'No number parameter is given.';
                errorContainer.classList.remove('hidden');
            }
            else if (typeof number !== 'number') {
                errorTextElement.textContent = 'The number parameter is not of type number.';
                errorContainer.classList.remove('hidden');
            }
            else if (isNaN(number)) {
                errorTextElement.textContent = 'The number parameter is NaN.';
                errorContainer.classList.remove('hidden');
            }
            else{
            
            const fib = fibonacci(number);

            const prime = isPrime(fib);
            resultContainer.classList.remove('hidden');

            if (prime) {
                let results = document.getElementById("results");
                let li = document.createElement("li");
                li.setAttribute("class", "is-prime");
                let text = document.createTextNode("The Fibonacci of " + number.toString() + " is " + fib.toString() + ".");
                li.appendChild(text);
                results.appendChild(li);
            }
            else {
                let results = document.getElementById("results");
                let li = document.createElement("li");
                li.setAttribute("class", "not-prime");
                let text = document.createTextNode("The Fibonacci of " + number.toString() + " is " + fib.toString() + ".");
                li.appendChild(text);
                results.appendChild(li);
            }
            }
        })
    }
})();