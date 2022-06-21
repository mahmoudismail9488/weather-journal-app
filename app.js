/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date(),
    newDate = d.toDateString();
// api key 
const myApiKey = ",&appid=48286aefc93d45306c73213979e6ba87&units=metric";
// base URL
const myUrl = "https://api.openweathermap.org/data/2.5/weather?zip="
// my server
const server = "http://localhost:3030"

const getData = () => {
    // get the value of the inputs
    const zip = document.getElementById("zip").value,
        feelings = document.getElementById("feelings").value;
    //get the data from the url
    weatherData(zip).then((data) => {
        if (data) {
            const {
                main: { temp },
                name: city,
                weather: [{ description }],
            } = data;
            weatherData(zip).then((data) => {
                if (data) {
                    const info = { newDate, city: data.name, temp: Math.round(data.main.temp), feelings, };
                    postData(server + "/add", info);
                    clientSide();
                    document.getElementById("output").style.display = "block";
                }
            })
        }
    })

};
document.getElementById("generate").addEventListener("click", getData)
const weatherData = async (zip) => {
    try {
        const res = await fetch(myUrl + zip + myApiKey);
        const data = await res.json();

        if (data.cod != 200) {
            document.getElementById("error").innerText = data.message;
            setTimeout(_ => error.innerText = "", 2000);
            throw `${data.message}`;
        }
        return data;
    } catch (error) {
        console.log(error)
    }
}
// function to post data

const postData = async (url = "", info = {}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });
    try {
        const newData = await res.json();;
        console.log("the data save is :" + newData);
        return newData;
    } catch (error) {
        console.log(error)
    }

}
// function to get project data
const clientSide = async () => {
    const res = await fetch(server + "/all");
    try {
        const savedData = await res.json();
        document.getElementById("date").innerText = "Today: " + savedData.newDate;
        document.getElementById("temp").innerText = "The temprature: "+savedData.temp + " degC"
        document.getElementById("content").innerText = "Your feelings: "+ savedData.feelings;
        document.getElementById("city").innerText = "The city: "+savedData.city
    } catch (error) {
        console.log(error)
    }
}