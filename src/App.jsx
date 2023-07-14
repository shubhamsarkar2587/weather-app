/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { WeatherToday } from './components/WeatherToday';
import { WeatherHighlights } from './components/WeatherHighlight';

export const App = () => {
	const [city, setCity] = useState('New Delhi');
	const [weatherData, setWeatherData] = useState(null);
	const [error, setError] = useState(null);

	const fetchWeatherData = async () => {
		try {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
			const data = await axios.get(url);
			setWeatherData(data?.data || {});
			setError(null);
		} catch (err) {
			setWeatherData(null);
			setError('Wrong City or Internal Server Error !');
		}
	};

	useEffect(() => {
		fetchWeatherData();
	}, []);

	return (
		<div className="h-screen p-12 bg-slate-100">
			<h2 className="text-2xl text-center font-bold mb-5">Weather App</h2>
			<div className="flex flex-col items-center">
				<div className="mb-8">
					<input
						type="text"
						placeholder="Enter city name"
						className="rounded-l p-2 border-t border-b border-l text-gray-800"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
					<button
						className="bg-blue-500 hover:bg-blue-600 text-white rounded-r px-4 py-2"
						onClick={() => fetchWeatherData()}
					>
            Get Weather
					</button>
				</div>
				<>
					{error && <div className="text-red-500 mb-4">{error}</div>}
					{weatherData && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="p-8">
								<h2 className="mb-4 text-center text-xl font-semibold text-indigo-800">Today's Weather</h2>
								<WeatherToday weatherData={weatherData} />
							</div>
							<div className="p-8">
								<h2 className="mb-4 text-center text-xl font-semibold text-indigo-800">Today's Highlights</h2>
								<WeatherHighlights weatherData={weatherData} />
							</div>
						</div>
					)}
				</>
			</div>
		</div>
	);
};
