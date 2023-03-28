import Dates from './components/Dates/Dates'
import Sidebar from './components/Sidebar/Sidebar';
import styles from "./App.module.css"
function App() {
  return (
    <div className={styles.App}>
      <Sidebar/>   
      <Dates/>
    </div>
  );
}

export default App;
