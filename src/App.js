import './App.css';
import Router from './routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  return (
    <div className="App h-screen relative">
      <div className='darkmode h-full absolute w-full -z-10 '></div>
      <div className='lightmode h-full absolute w-full -z-10'></div>
      <Router />
      <ToastContainer limit={5} />
    </div>
  );
}

export default App;
