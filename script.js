const API_KEY = 'a2ea6029f27a4516b3521032250806';
const BASE_URL = 'https://api.weatherapi.com/v1';

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
}

// Enter 키로 검색 가능하도록 설정
document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});
