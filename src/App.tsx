import { useState } from 'react'
import './App.css'

interface wheatherApp {
  name:string,
  main:{
    temp:number
  }
  weather:{
    description:string
  }[]
}
function App() {

const [cityName,setCityName]=useState("");
const [weather, setWeather] = useState<wheatherApp|null>(null);

const apiKey="0a9573ae5cbb31913e813d5a3ee938d3";

const getWeather=async()=>{
  if(!cityName) return;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
  console.log("---url",url);
  
  try {
    const response = await fetch(url)
    const data =await response.json()
    console.log('---data',data)
    if(data.cod===200){
      setWeather(data)
    }else{
      setWeather(null)
      alert("City not found")
    }
  }catch(error){
    console.log("Error Fetching weather",error);
    alert("Something went wrong")
    
  }
}

  return (
    <>
     <h1>Weather App</h1>
     <input type="text" value={cityName}  onChange={(e:any)=>setCityName(e.target.value)}/>
     <button onClick={getWeather}>Click</button>
     {weather&&(
      <div>
        <h2>{weather.name}</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Weather: {weather.weather[0].description}</p>
      </div>
     )}
    </>
  )
}

export default App
