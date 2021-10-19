console.log('Client side javascript file is loaded!');

// Goal: Fetch weather!
//
// 1. Setup a call to fetch weather for Boston
// 2. Get the parse JSON response
//  - If error property, print error
//  - If no error property, print location and forecast
// 3. Refresh the browser and test your work

fetch('/weather?address=Boston').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            return console.log('Error:', data.error);
        }

        console.log('Location:', data.location);
        console.log('Forecast:', data.forecast);
    });
});
