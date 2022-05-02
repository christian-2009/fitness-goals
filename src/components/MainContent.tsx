import { useState, useEffect } from "react";
import axios from "axios";

interface weightData {
  weight: string;
  id: number;
  dates: Date;
}

export default function MainContent(): JSX.Element {
  const [weightArray, setWeightArray] = useState<string[]>([]);
  const [weightArrayOfObjects, setWeightArrayOfObjects] = useState<
    weightData[]
  >([]);
  const [text, setText] = useState("");

  //adding the weight to database
  const handleAddWeight = async () => {
    const data = { weight: text };
    await axios.post(
      "https://christians-fitness-app.herokuapp.com/weights",
      data
    );
    setWeightArray([...weightArray, text]);
    setText("");
  };

  const handleDeleteWeight = async (id: number) => {
    await axios.delete(
      `https://christians-fitness-app.herokuapp.com/weights/${id}`
    );
    setWeightArrayOfObjects(
      weightArrayOfObjects.filter((weight) => weight.id !== id)
    );
  };

  //fetching the weights from server
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://christians-fitness-app.herokuapp.com/weights")
        .then((response) => {
          const weightData: weightData[] = response.data;
          setWeightArrayOfObjects(weightData);
          console.log(weightData);
        });
    };
    fetchData();
  }, [weightArray]);

  //mapping over weight objects to display onscreen
  const displayWeights = weightArrayOfObjects.map((object) => {
    const currentDate = new Date(object.dates).toLocaleDateString();
    return (
      <div key={object.id}>
        <div className="individual-weight">
          {object.weight + "kg " + currentDate}
        </div>
        <div className="center-delete">
          <button
            className="delete-button"
            onClick={() => handleDeleteWeight(object.id)}
          >
            delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="weigh-in">
        <h2 className="weight-title">Weigh in</h2>
        <div>
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

        <div className="weight-list">
          {displayWeights.slice(Math.max(0, displayWeights.length - 10))}
        </div>
      </div>
    </>
  );
}
