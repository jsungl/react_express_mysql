import React, {useState} from 'react';
import axios from 'axios';
import Topic from './topic';


function App() {
  const [data, setData] = useState([]);
  
  const onIncrease = async() => {
    const res = await axios.get('/topic');
    //topic = [...res.data.topic];
    setData([...res.data.topic]);
  }

  return (
    <div>
      <h1>topic</h1>
      <div>
        {data.map(data => <Topic topics={data} key={data.id} />)}
      </div>
      <button onClick={onIncrease}>connect to server</button>
    </div>
  );
}

export default App;
