const API_KEY = 'a2ea6029f27a4516b3521032250806';
const BASE_URL = 'https://api.weatherapi.com/v1';

// 날씨 상태에 따른 캐릭터 매핑
const weatherCharacters = {
    'Sunny': 'https://raw.githubusercontent.com/your-username/weather-characters/main/sunny.png',
    'Clear': 'https://raw.githubusercontent.com/your-username/weather-characters/main/clear.png',
    'Partly cloudy': 'https://raw.githubusercontent.com/your-username/weather-characters/main/partly-cloudy.png',
    'Cloudy': 'https://raw.githubusercontent.com/your-username/weather-characters/main/cloudy.png',
    'Overcast': 'https://raw.githubusercontent.com/your-username/weather-characters/main/overcast.png',
    'Mist': 'https://raw.githubusercontent.com/your-username/weather-characters/main/mist.png',
    'Patchy rain possible': 'https://raw.githubusercontent.com/your-username/weather-characters/main/rain.png',
    'Patchy snow possible': 'https://raw.githubusercontent.com/your-username/weather-characters/main/snow.png',
    'Patchy sleet possible': 'https://raw.githubusercontent.com/your-username/weather-characters/main/sleet.png',
    'Patchy freezing drizzle possible': 'https://raw.githubusercontent.com/your-username/weather-characters/main/freezing-drizzle.png',
    'Thundery outbreaks possible': 'https://raw.githubusercontent.com/your-username/weather-characters/main/thunder.png',
    'Blowing snow': 'https://raw.githubusercontent.com/your-username/weather-characters/main/blowing-snow.png',
    'Blizzard': 'https://raw.githubusercontent.com/your-username/weather-characters/main/blizzard.png',
    'Fog': 'https://raw.githubusercontent.com/your-username/weather-characters/main/fog.png',
    'Freezing fog': 'https://raw.githubusercontent.com/your-username/weather-characters/main/freezing-fog.png',
    'Patchy light drizzle': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-drizzle.png',
    'Light drizzle': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-drizzle.png',
    'Freezing drizzle': 'https://raw.githubusercontent.com/your-username/weather-characters/main/freezing-drizzle.png',
    'Heavy freezing drizzle': 'https://raw.githubusercontent.com/your-username/weather-characters/main/heavy-freezing-drizzle.png',
    'Patchy light rain': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-rain.png',
    'Light rain': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-rain.png',
    'Moderate rain at times': 'https://raw.githubusercontent.com/your-username/weather-characters/main/moderate-rain.png',
    'Moderate rain': 'https://raw.githubusercontent.com/your-username/weather-characters/main/moderate-rain.png',
    'Heavy rain at times': 'https://raw.githubusercontent.com/your-username/weather-characters/main/heavy-rain.png',
    'Heavy rain': 'https://raw.githubusercontent.com/your-username/weather-characters/main/heavy-rain.png',
    'Light freezing rain': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-freezing-rain.png',
    'Moderate or heavy freezing rain': 'https://raw.githubusercontent.com/your-username/weather-characters/main/heavy-freezing-rain.png',
    'Light sleet': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-sleet.png',
    'Moderate or heavy sleet': 'https://raw.githubusercontent.com/your-username/weather-characters/main/heavy-sleet.png',
    'Patchy light snow': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-snow.png',
    'Light snow': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-snow.png',
    'Patchy moderate snow': 'https://raw.githubusercontent.com/your-username/weather-characters/main/moderate-snow.png',
    'Moderate snow': 'https://raw.githubusercontent.com/your-username/weather-characters/main/moderate-snow.png',
    'Patchy heavy snow': 'https://raw.githubusercontent.com/your-username/weather-characters/main/heavy-snow.png',
    'Heavy snow': 'https://raw.githubusercontent.com/your-username/weather-characters/main/heavy-snow.png',
    'Ice pellets': 'https://raw.githubusercontent.com/your-username/weather-characters/main/ice-pellets.png',
    'Light rain shower': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-rain-shower.png',
    'Moderate or heavy rain shower': 'https://raw.githubusercontent.com/your-username/weather-characters/main/heavy-rain-shower.png',
    'Torrential rain shower': 'https://raw.githubusercontent.com/your-username/weather-characters/main/torrential-rain.png',
    'Light sleet showers': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-sleet-shower.png',
    'Moderate or heavy sleet showers': 'https://raw.githubusercontent.com/your-username/weather-characters/main/heavy-sleet-shower.png',
    'Light snow showers': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-snow-shower.png',
    'Moderate or heavy snow showers': 'https://raw.githubusercontent.com/your-username/weather-characters/main/heavy-snow-shower.png',
    'Light showers of ice pellets': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-ice-pellets.png',
    'Moderate or heavy showers of ice pellets': 'https://raw.githubusercontent.com/your-username/weather-characters/main/heavy-ice-pellets.png',
    'Patchy light rain with thunder': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-rain-thunder.png',
    'Moderate or heavy rain with thunder': 'https://raw.githubusercontent.com/your-username/weather-characters/main/heavy-rain-thunder.png',
    'Patchy light snow with thunder': 'https://raw.githubusercontent.com/your-username/weather-characters/main/light-snow-thunder.png',
    'Moderate or heavy snow with thunder': 'https://raw.githubusercontent.com/your-username/weather-characters/main/heavy-snow-thunder.png'
};

// 기본 캐릭터 이미지
const defaultCharacter = 'https://raw.githubusercontent.com/your-username/weather-characters/main/default.png';

async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();

    if (!city) {
        alert('도시 이름을 입력해주세요.');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`);
        const data = await response.json();

        if (response.ok) {
            updateWeatherUI(data);
        } else {
            alert('도시를 찾을 수 없습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        console.error('날씨 정보를 가져오는 중 오류가 발생했습니다:', error);
        alert('날씨 정보를 가져오는 중 오류가 발생했습니다.');
    }
}

function updateWeatherUI(data) {
    const location = data.location;
    const current = data.current;

    document.getElementById('city-name').textContent = `${location.name}, ${location.country}`;
    document.getElementById('temperature').textContent = `${current.temp_c}°C`;
    document.getElementById('weather-description').textContent = current.condition.text;
    document.getElementById('humidity').textContent = `${current.humidity}%`;
    document.getElementById('wind-speed').textContent = `${current.wind_kph} km/h`;
    document.getElementById('weather-icon').src = `https:${current.condition.icon}`;
    
    // 날씨 상태에 따른 캐릭터 업데이트
    const weatherCharacter = document.getElementById('weather-character');
    const characterImage = weatherCharacters[current.condition.text] || defaultCharacter;
    weatherCharacter.src = characterImage;
}

// Enter 키로 검색 가능하도록 설정
document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});
