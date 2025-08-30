export const getWeather = ({ latitude, longitude }, APIkey) => {
return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`)
.then((res) => {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Error: ${res.status}`);
    }
    });
};

const conditionMap = {
  clear: {
    day: "clear",
    night: "clear-night",
  },
  clouds: {
    day: "cloudy",
    night: "cloudy-night",
  },
  rain: {
    day: "rainy",
    night: "rainy-night",
  },
  snow: {
    day: "snowy",
    night: "snowy-night",
  },
  fog: {
    day: "foggy",
    night: "foggy-night",
  },
  storm: {
    day: "stormy",
    night: "stormy-night",
  },
};


export const filterWeatherData = (data) => {
    const result = {};
    result.city = data.name;
    result.temp = {
        F: Math.round(data.main.temp), 
        C: Math.round(((data.main.temp - 32) * 5) / 9),
    };
    result.type = getWeatherType(result.temp.F);
    result.apiCondition = data.weather[0].main.toLowerCase();

    result.isDay = isDay(data.sys, Date.now());

      const timeOfDay = result.isDay ? 'day' : 'night';
      result.condition = conditionMap[result.apiCondition]?.[timeOfDay] || 'clear';

    return result;
};

const isDay = ({sunrise, sunset}, now) => {
    return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
    if (temperature > 86) {
        return "hot";
    } else if (temperature >= 66 && temperature < 85) {
        return "warm";
    } else {
        return "cold";
    }
};