
import React, {useState, useEffect} from 'react';
import WeatherCard from './weatherCard';
 
const Weather=()=>{
    const [searchvalue, setsearchvalue]=useState("pune");
    const [tempinfo, settempinfo]=useState({});
    

    const getweatherinfo=async()=>{

        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=6f0b30491dfc12df2397d101aa2c0e47`

            const res=await fetch(url);
            const data=await res.json();

            const{temp,pressure, humidity}=data.main;
            const{speed}=data.wind;
            const{country, sunset}=data.sys;
            const{name}=data;
            const{main:weathermood}=data.weather[0];

            const newweatherinfo={
                temp,pressure, humidity,speed, country, sunset, name, weathermood
            };

            settempinfo(newweatherinfo);


        }
        catch(error){
            console.log(error);
        }
    }


    useEffect( getweatherinfo,"" );


    return(
        <>
           <div className="wrap">
               <div className="search">
                   <input type="search" className="searchTerm" placeholder="✍search...." autoFocus id="search"  
                     value={searchvalue}
                     onChange={(e)=>setsearchvalue(e.target.value)}
                   ></input>
                   <button className="searchButton" onClick={getweatherinfo}>search</button>
               </div>
           </div>

           <div>
                <WeatherCard   tempinfo={tempinfo} />
           </div>
        </>
    	);
}

export default Weather;


