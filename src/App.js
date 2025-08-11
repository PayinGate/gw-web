import { useEffect } from 'react';
import './App.css';
import Router from './routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookieData, createCookieDate, GWCookies } from './utils/storage/cookies';
import { v4 as uuidv4 } from 'uuid';

function App() {

  useEffect(()=>{
      const gwCookies = new GWCookies(document);
      gwCookies.getCookie('device_id').catch(()=>{
        const deviceCookie = new CookieData('device_id', uuidv4(), createCookieDate(10*365*24*60*60));
        gwCookies.saveCookies([deviceCookie]);
      })
  }, []);
  

  return (
    <div className="App h-screen">
      <div className='darkmode h-full fixed w-full -z-10 '></div>
      <div className='lightmode h-full fixed w-full -z-10'></div>
      <Router />
      <ToastContainer limit={5} />
    </div>
  );
}

export default App;
