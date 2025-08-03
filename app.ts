import React, { useState, useEffect } from "react";
import Calendar from "./components/Calender";
import Header from "./components/Header";
import HolidayList from "./components/HolidayList";
import CountryYearSelector from "./components/CountryYearSelector";
import { addMonths, subMonths } from "date-fns";
import "./index.css"; // Make sure Tailwind is imported here

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [country, setCountry] = useState("US");
  const [year, setYear] = useState(new Date().getFullYear());
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchHolidays = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`
        );
        const data = await res.json();
        setHolidays(data);
      } catch (err) {
        setError("Failed to load holidays");
      } finally {
        setLoading(false);
      }
    };
    fetchHolidays();
  }, [country, year]);

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 font-sans p-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-6 md:p-10 space-y-8">
        <h1 className="text-3xl font-bold text-center text-blue-800">
          🌍 Public Holiday Calendar
        </h1>

        <Header
          currentMonth={currentMonth}
          onPrevMonth={() => setCurrentMonth(subMonths(currentMonth, 1))}
          onNextMonth={() => setCurrentMonth(addMonths(currentMonth, 1))}
          onToday={goToToday}
        />

        <CountryYearSelector
          country={country}
          year={year}
          onCountryChange={setCountry}
          onYearChange={setYear}
        />

        <input
          type="text"
          placeholder="🔍 Search holidays..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {loading ? (
          <p className="text-center text-blue-600 font-medium">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <Calendar
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              holidays={holidays}
              onDateClick={setSelectedDate}
            />
            <HolidayList
              holidays={holidays}
              selectedDate={selectedDate}
              filter={filter}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
