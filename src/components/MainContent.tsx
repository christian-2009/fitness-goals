import { useState, useEffect } from "react";
import axios from "axios";

interface weightData {
  weight: string;
  id: string;
  dates: Date;
}

export default function MainContent(): JSX.Element {
  const [weightArray, setWeightArray] = useState<string[]>([]);
  const [weightArrayOfObjects, setWeightArrayOfObjects] = useState<
    weightData[]
  >([]);
  const [text, setText] = useState("");

  //adding the weight to database
  const handleAddWeight = () => {
    const data = { weight: text };
    axios.post("http://localhost:4000/weights", data);
    setText("");
    setWeightArray([...weightArray, text]);
  };

  // const handleDeleteWeight = () => {
  //   const filteredWeightArray = weightArray.filter((object.id) => {

  //   })
  // }

  //fetching the weights from server
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:4000/weights").then((response) => {
        const weightData: weightData[] = response.data;
        console.log(weightData);
        setWeightArrayOfObjects(weightData);
      });
    };
    fetchData();
  }, [weightArray]);

  //mapping over weight objects to display onscreen
  const displayWeights = weightArrayOfObjects.map((object) => {
    const currentDate = new Date(object.dates).toLocaleDateString();
    return (
      <div key={object.id}>
        <li className="individual-weight">
          {object.weight + "kg " + currentDate}
        </li>
        <div className="center-delete">
          {/* need to fix the delete function */}
          {/* <button className='individual-weight delete-button' onClick = {() => {
               const filteredWeightArray = weightArray.filter((obj) =>{
                 obj.id === object.id
               })
             }}>delete</button> */}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="form-style">
        <h2 className="weight-title">Weigh in</h2>
        <div className="input-button">
          <input
            className="enter-weight"
            placeholder="weight..."
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <button className="weight-button" onClick={handleAddWeight}>
            Enter
          </button>
        </div>

        <ul className="weight-list">
          {displayWeights.slice(Math.max(0, displayWeights.length - 10))}
        </ul>
      </div>
    </>
  );
}
