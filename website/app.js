/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'e2167b815a779bb13b4042a8ab942775&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// HTML element to listen for click events
const button = document.getElementById('generate');
// HTML elements to get the values
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');

// HTML elements to update dynamically
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

button.addEventListener('click', async (e) => {
    e.preventDefault();

    if (zip.value === '' && feelings.value === '') {
        alert('Please enter a zip code and feelings!');
        return;
    }

    try {
        const temp = await getTemp(zip.value);
        

         postData('http://127.0.0.1:8000/addWeatherData', temp);

        const data = await getData('http://127.0.0.1:8000/getWeatherData');
        updateUI(data);
    } catch (error) {
       
        alert('An error occurred. Please try again later.');
    }
});


const getTemp = async (zip)=>{
    const res = await fetch(`${baseUrl}?zip=${zip}&APPID=${apiKey}`);
    try{
    const data = await res.json();
    const temp = data.main.temp;
    return temp;
    }catch(error){
        console.log('error', error);
    }
}

const postData = async (url,temp)=>{
try {
        await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
   'Content-Type': 'application/json',
   },
   body: JSON.stringify(
    {
    temp:Math.round(temp),
    date:newDate,
    feelings:feelings.value
   })
   })
}catch(error){
    console.log('error', error);

   }
 
}

const getData = async (url)=>{
    const res = await fetch(url);
    try{
        const data = await res.json();
        return data;
        }catch(error){

        console.log('error', error);
    }

}

const updateUI = (data)=>{
    date.innerHTML=`${data.date}`;
    temp.innerHTML=`${data.temp} C`;
    content.innerHTML=`${data.feelings}`;

}

