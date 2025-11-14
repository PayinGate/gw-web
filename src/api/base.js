let BASE_URL; 

if(document.location.hostname === "localhost") BASE_URL = process.env.REACT_APP_API_URL;
else BASE_URL = process.env.REACT_APP_IP_URL;

export { BASE_URL as baseUrl };