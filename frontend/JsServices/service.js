import axios from 'axios';

const BASE_URL = 'http://192.168.0.105:3000';

/**
 * Fetch weather data for a specific location.
 * @param {string} location - The location for which to fetch weather data.
 * @returns {Promise<WeatherData>} - A promise that resolves to the weather data.
 */
export const fetchWeatherData = async (location) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not authenticated. Token missing.');
    }

    const response = await axios.get(`${BASE_URL}/widget/weather`, {
      params: { location },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw error;
  }
};

/**
 * Save a weather widget configuration.
 * @param {Object} config - The widget configuration to save.
 * @returns {Promise<WeatherData>} - A promise that resolves to the API response.
 */
export const saveWeatherWidget = async (config) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not authenticated. Token missing.');
    }

    const response = await axios.post(
      `${BASE_URL}/widget/add`,
      {
        widget_type: 'weather',
        config,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error saving weather widget:', error.message);
    throw error;
  }
};

/**
 * Remove a weather widget.
 * @param {number} widgetId - The ID of the widget to remove.
 * @returns {Promise<WeatherData>} - A promise that resolves to the API response.
 */
export const removeWeatherWidget = async (widgetId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not authenticated. Token missing.');
    }

    const response = await axios.delete(`${BASE_URL}/widget/remove`, {
      data: { widget_id: widgetId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error removing weather widget:', error.message);
    throw error;
  }
};


// const pkgInfo = require("./package.json");
// const Service = require("webos-service");
// const axios = require("axios");

// const BASE_URL = "http://192.168.0.105:3000";

// // Initialize the service
// const service = new Service(pkgInfo.name);

// // Token variable to store the authentication token
// let token = "";

// /**
//  * Fetch weather data for a specific location.
//  * Exposed as a callable service method.
//  */
// service.register("fetchWeather", async (message) => {
//   console.log("Fetching weather data...");
//   const location = message.payload.location;

//   if (!location) {
//     message.respond({
//       returnValue: false,
//       errorText: "Location parameter is missing.",
//     });
//     return;
//   }

//   try {
//     const response = await axios.get(`${BASE_URL}/widget/weather`, {
//       params: { location },
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     message.respond({
//       returnValue: true,
//       data: response.data,
//     });
//   } catch (error) {
//     console.error("Error fetching weather data:", error.message);
//     message.respond({
//       returnValue: false,
//       errorText: error.message,
//     });
//   }
// });

// /**
//  * Save a weather widget configuration.
//  * Exposed as a callable service method.
//  */
// service.register("saveWeatherWidget", async (message) => {
//   console.log("Saving weather widget configuration...");
//   const config = message.payload.config;

//   if (!config) {
//     message.respond({
//       returnValue: false,
//       errorText: "Config parameter is missing.",
//     });
//     return;
//   }

//   try {
//     const response = await axios.post(
//       `${BASE_URL}/widget/add`,
//       {
//         widget_type: "weather",
//         config,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     message.respond({
//       returnValue: true,
//       data: response.data,
//     });
//   } catch (error) {
//     console.error("Error saving widget:", error.message);
//     message.respond({
//       returnValue: false,
//       errorText: error.message,
//     });
//   }
// });

// /**
//  * Set the authentication token.
//  */
// service.register("setToken", (message) => {
//   console.log("Setting authentication token...");
//   token = message.payload.token || "";

//   if (!token) {
//     message.respond({
//       returnValue: false,
//       errorText: "Token is missing.",
//     });
//     return;
//   }

//   message.respond({
//     returnValue: true,
//     token,
//   });
// });
// async function fetchWeatherData(location, authToken) {
//     if (!location) {
//       throw new Error("Location is required");
//     }
  
//     const response = await axios.get(`${BASE_URL}/widget/weather`, {
//       params: { location },
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     });
  
//     return response.data;
//   }
  
//   // Exporting service and helper functions for compatibility
//   module.exports = { service, fetchWeatherData };
  
