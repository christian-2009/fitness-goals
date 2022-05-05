import { useState, useEffect } from "react";
import axios from "axios";
import DisplayWeights from "./DisplayWeights";

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
  const [goalWeightInput, setGoalWeightInput] = useState<string>("");
  const [goalWeight, setGoalWeight] = useState<string>('')

  //adding the weight to database
  const handleAddWeight = async () => {
    if (!checkIfStringContainsOnlyNumbers(text)) {
      window.alert("must be a number. Try again");
      setText("");
    } else {
      const data = { weight: text };
      await axios.post(
        "https://christians-fitness-app.herokuapp.com/weights",
        data
      );
      setWeightArray([...weightArray, text]);
      setText("");
    }
  };

  const handleDeleteWeight = async (id: number) => {
    await axios.delete(
      `https://christians-fitness-app.herokuapp.com/weights/${id}`
    );
    setWeightArrayOfObjects(
      weightArrayOfObjects.filter((weight) => weight.id !== id)
    );
  };

  // const handleSubmitGoalWeight = async () => {

  // }

  function checkIfStringContainsOnlyNumbers(string: string) {
    if (string.match(/^[0-9]+$/) != null) {
      return true;
    }
  }

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

  const displayWeights = weightArrayOfObjects.map((object) => (
    <div key={object.id}>
      <DisplayWeights
        weight={object.weight}
        id={object.id}
        dates={object.dates}
        handleDeleteWeight={handleDeleteWeight}
      />
    </div>
  ));
  console.log(displayWeights);

  return (
    <>
      <div className="weigh-in-container">
        <h2 className="weight-title">Weigh in</h2>
        <p>
          {/* Your goal:
          {checkIfStringContainsOnlyNumbers(goalWeight) &&
            parseInt(goalWeight) > 0
          ? <b>{goalWeight}</b> :
          <>
          <input
            placeholder="enter goal..."
            value={goalWeightInput}
            onChange={(event) => {
              setGoalWeightInput(event.target.value);
            }}
          ></input>
          <button onClick={handleSubmitGoalWeight}>Submit</button>
          </>
          } */}
        </p>
        <div>
          <input
            className="enter-weight"
            placeholder="weight..."
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <button className="enter-button" onClick={handleAddWeight}>
            Enter
          </button>
        </div>

        <div className="weight-list">{displayWeights}</div>
      </div>
    </>
  );
}
