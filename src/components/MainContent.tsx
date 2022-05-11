import { useState, useEffect } from "react";
import axios from "axios";
import DisplayWeights from "./DisplayWeights";
import checkIfStringContainsOnlyNumbers from '../utils/checkIfStringContainsOnlyNumbers'

interface weightData {
  weight: string;
  id: number;
  dates: Date;
  type: string
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://christians-fitness-app.herokuapp.com"
    : "http://localhost:4000";


export default function MainContent(): JSX.Element {
  const [weightArray, setWeightArray] = useState<string[]>([]);
  const [weightArrayOfObjects, setWeightArrayOfObjects] = useState<
    weightData[]
  >([]);
  const [text, setText] = useState("");
  const [goalWeightInput, setGoalWeightInput] = useState<string>("");
  const [goalWeightArray, setGoalWeightArray] = useState<string[]>([]);
  const [goalWeight, setGoalWeight] = useState<string>('')
  const [toggle, setToggle] = useState<boolean>(false)

  //adding the weight to database
  const handleAddWeight = async () => {
    if (!checkIfStringContainsOnlyNumbers(text)) {
      window.alert("must be a number. Try again");
      setText("");
    } else {
      const data = { weight: text, type: 'weight' };
      await axios.post(
        baseUrl + "/weights",
        data
      );
      setWeightArray([...weightArray, text]);
      setText("");
    }
  };

  const handleDeleteWeight = async (id: number) => {
    await axios.delete(
      baseUrl + `/weights/${id}`
    );
    setWeightArrayOfObjects(
      weightArrayOfObjects.filter((weight) => weight.id !== id)
    );
  };
  console.log(goalWeight)

  //adding the goal weight to database
  const handleSubmitGoalWeight = async () => {
    console.log(goalWeightInput)
      const data = {weight: goalWeightInput, type: 'goal'}
      await axios.post(baseUrl + '/weights', data)
    // }else {
    //   const data = {weight: goalWeightInput}
    //   await axios.put(baseUrl + '/weights/goals', data)
    // }
    setGoalWeightArray([...goalWeightArray, goalWeightInput])
    setToggle(toggle => !toggle)

  }

  //fetching the weights from server
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(baseUrl + "/weights")
        .then((response) => {
          const weightData: weightData[] = response.data;
          setWeightArrayOfObjects(weightData);
          console.log('this is the weight data we receive', weightData);
        })};
    
    fetchData();
  }, [weightArray]);

  //trying to fetch the goal weight from the database
  useEffect(() => {
    console.log('useEffect is running')
    const fetchGoalWeightData = async () => {
      await axios
        .get(baseUrl + "/weights/goals")
        .then((response) => {
          const goalWeightData: weightData[] = response.data;
          setGoalWeight(goalWeightData[0].weight);
          console.log('this is our goal weight data', goalWeightData);
        })};
    
    fetchGoalWeightData();
  }, [toggle])

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
  

  return (
    <>
      <div className="weigh-in-container">
        <h2 className="weight-title">Weigh in</h2>
        <p>
          Your goal:
          {checkIfStringContainsOnlyNumbers(goalWeightArray[goalWeightArray.length-1]) &&
            parseInt(goalWeightArray[goalWeightArray.length-1]) > 0
          ? <> <b>{goalWeight}kg</b> <button>edit</button> </> :
          <>
          <input
            placeholder="enter goal..."
            className = "enter-weight"
            value={goalWeightInput}
            onChange={(event) => {
              setGoalWeightInput(event.target.value);
            }}
          ></input>
          <button className="submit-button" onClick={handleSubmitGoalWeight}>Submit</button>
          </>
          }
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
