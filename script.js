window.addEventListener('load', ()=> {      //On loading the page
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let icon_selector = document.querySelector(".icon");
    let icon;
    let degreeSection = document.querySelector(".degree-section");
    const degreeSpan = document.querySelector(".degree-section span");

    if(navigator.geolocation) {     //If this exists in the browser, we can find the location of the user
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            longitude = position.coords.longitude;    //78 -> Doon
            latitude = position.coords.latitude;  //30.31
            // console.log(longitude);
            // console.log(latitude);
            
            //API Code from RapidAPI - Weather (by WeatherBit)
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '5f5d3c7a40mshb633f2533ebec91p1bad9djsne1017fa356b2',
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
                }
            };
            
            const api = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${latitude}&lon=${longitude}`;

            //GET the details using fetch
            fetch(api, options)
	            .then(response => response.json())      //then, runs after fetch() has completed execution
                                                      //Convert information to json to use it with js
	            .then(response => { 
                    console.log(response);
                    //app_temp is the name of the variable that contains temperature in object returned by API.
                    const {app_temp} = response.data[0];      //same as response.data[0].something; data[0]->1st ele in data array
                    
                    //Set DOM elements from the API
                    //Extracting info from the API
                    //we can use variable as in above statement and also do it like in below statements
                    temperatureDegree.textContent = app_temp;
                    temperatureDescription.textContent = response.data[0].weather.description;
                    locationTimezone.textContent = response.city_name;
                    icon = response.data[0].weather.icon;

                    //For Celsius
                    let farenheit = (app_temp * (9 / 5)) + 32;

                    //Set Icon
                    setIcon(icon);

                    //Change Temp to Celsius / Farenheit
                    degreeSection.addEventListener('click', ()=> {
                        if(degreeSpan.textContent === "F") {
                            degreeSpan.textContent = "C";
                            temperatureDegree.textContent = app_temp;
                        }
                        else {
                            degreeSpan.textContent = "F";
                            temperatureDegree.textContent = Math.floor(farenheit);
                        }
                    });
                })
	            .catch(err => console.error(err));


            // //API Code from RapidAPI - Dark Sky
            // const options = {
            //     method: 'GET',
            //     headers: {
            //         'X-RapidAPI-Key': '5f5d3c7a40mshb633f2533ebec91p1bad9djsne1017fa356b2',
            //         'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
            //     }
            // };

            // const proxy = "https://cors-anywhere.herokuapp.com/";
            // const link = `${proxy}https://dark-sky.p.rapidapi.com/${latitude},${longitude}?units=auto&lang=en`;

            // //GET the details using fetch
            // fetch(link, options)
            //     .then(response => response.json())      //then, runs after fetch() has completed execution
            //                                         //Convert info to json to use it with js
            //     .then(response => console.log(response))
            //     .catch(err => console.error(err));

        });
    }
    else {
        h1.textContent = "This is not working in your Browser";
    }

    // let icon_code = [
    //     {desc:"Thunderstorm with rain", code:"t02n"},
    //     {desc:"Moderate Rain", code:"r02n"},
    //     {desc:"Heavy Rain", code:"r03n"},
    //     {desc:"Snow", code:"t02n"},
    //     {desc:"Clear sky", code:"c01n"},
    //     {desc:"Few clouds", code:"c02n"},
    //     {desc:"Fog", code:"a05n"},
    //     {desc:"Drizzle", code:"d02n"},
    // ];

    //icon.src = "icons/t03n.png";
    function setIcon(icons) {
        //const searchIndex = icon_code.findIndex((i) => i.desc==icons);
        //console.log(searchIndex);
        icon_selector.src = `icons/${icons}.png`;
    }
});