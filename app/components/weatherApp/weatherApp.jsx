import React, { useState } from 'react'; // Correct import statement
import Image from 'next/image';
import './weatherApp.css';

// Make sure to import your image icons
import search_icon from '@/app/components/Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import humidity_icon from '../Assets/humidity.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp =  () => {
    
    let api_key="3a6e7e2bd7f59ac042263f84f42d50e4";
    
    const  [ Wicon, setWicon] = useState(cloud_icon);
       //setWicon(snow_icon);
    
        const search = async ()=>{
            
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value===""){
            return 0;
        }
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data= await response.json();
        const humidity=document.getElementsByClassName("humidity-percent");
        const windspeed=document.getElementsByClassName("Windspeed");
        const temp=document.getElementsByClassName("weather-temp");
        const location=document.getElementsByClassName("weather-location");

        humidity[0].innerHTML=data.main.humidity+ " %";
        windspeed[0].innerHTML=Math.floor(data.wind.speed) + " km/h";
        temp[0].innerHTML=Math.floor(data.main.temp)+" °C";
        location[0].innerHTML=data.name;
        
        const icon = data.weather[0].icon;
         setWicon(snow_icon);
        if (icon === "01d" || icon === "01n") {
            setWicon(clear_icon);
        } else if (icon === "02d" || icon === "02n") {
            setWicon(cloud_icon);
        } else if (icon === "03d" || icon === "03n" || icon === "04d" || icon === "04n") {
            setWicon(drizzle_icon);
        } else if (icon === "09d" || icon === "09n" || icon === "10d" || icon === "10n") {
            setWicon(rain_icon);
        } else if (icon === "13d" || icon === "13n") {
            setWicon(snow_icon);
        } else {
            setWicon(clear_icon);
        }
    }
    return ( 
            <div className='container'>
                <div className="top-bar">
                    <input  type="text" className="cityInput" placeholder="search city" />
                    <div className="search-icon" onClick={()=>{search()}}>
                        <Image src={search_icon} alt="Custom Icon" />
                    </div>
                </div>
                <div className="weather-image">
                    <Image src={Wicon} alt="Custom Icon" />
                </div>
                <div className="weather-temp">24°C</div>
                <div className="weather-location">London</div>
                <div className="data-container">
                    <div className="element">
                        <Image src={humidity_icon} alt="Custom Icon" />
                        <div className="data">
                            <div className="humidity-percent">64%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <Image src={wind_icon} alt="Custom Icon" />
                        <div className="data">
                            <div className="Windspeed">18km/h</div>
                            <div className="text">Windspeed</div>
                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default WeatherApp; // Corrected component name to start with uppercase
