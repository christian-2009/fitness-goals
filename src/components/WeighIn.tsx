import { useState, useEffect } from "react";
import axios from "axios";
import DisplayWeights from "./DisplayWeights";
import checkIfStringContainsOnlyNumbers from "../utils/checkIfStringContainsOnlyNumbers";
import { baseUrl } from "../utils/URL";

interface WeightData {
  weight: string;
  id: number;
  dates: Date;
  type: string;
}

interface WeighInInterface {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  weights: WeightData[];
}

export default function WeighIn({
  toggle,
  setToggle,
  weights,
}: WeighInInterface): JSX.Element {
  const [weightArray, setWeightArray] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [goalWeightInput, setGoalWeightInput] = useState<string>("");
  const [goalWeightArray, setGoalWeightArray] = useState<string[]>([]);
  const [goalWeight, setGoalWeight] = useState<string>("");

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleAddWeight();
    }
  };

  //adding the weight to database
  const handleAddWeight = async () => {
    if (!checkIfStringContainsOnlyNumbers(text)) {
      window.alert("must be a number. Try again");
      setText("");
    } else {
      const data = { weight: text, type: "weight" };
      await axios.post(baseUrl + "/weights", data);
      setToggle((toggle) => !toggle);
      console.log(toggle);
      setText("");
    }
  };

  const handleDeleteWeight = async (id: number) => {
    await axios.delete(baseUrl + `/weights/${id}`);
    setToggle((toggle) => !toggle);
  };

  //adding the goal weight to database
  // const handleSubmitGoalWeight = async () => {
  //   console.log('this is the goalweight input', goalWeightInput)
  //     const data = {weight: goalWeightInput, type: 'goal'}
  //     await axios.post(baseUrl + '/weights', data)
  //   console.log('this is the goalweightarray', goalWeightArray)
  //   setToggle(toggle => !toggle)

  // }

  //fetching the weights from server

  // const response = await fetch("https://dog.ceo/api/breeds/image/random");
  //     const jsonBody: DogInterface = await response.json();
  //     setDog1(jsonBody);

  //trying to fetch the goal weight from the database
  // useEffect(() => {
  //   console.log('useEffect is running')
  //   const fetchGoalWeightData = async () => {
  //     const response = await axios.get(baseUrl + "/weights/goals")
  //     const goalWeightData: WeightData = await response.data
  //     console.log('this is our goal weight data', goalWeightData);
  //     setGoalWeight(goalWeightData.weight);
  //     setGoalWeightArray([...goalWeightArray, goalWeightData.weight])

  //       };

  //   fetchGoalWeightData();
  // }, [])

  // useEffect(() => {
  //   console.log('useEffect is running')
  //   const fetchGoalWeightData = async () => {
  //     const response = await axios.get(baseUrl + "/weights/goals")
  //     const goalWeightData: WeightData = await response.data
  //     setGoalWeight(goalWeightData.weight);
  //     console.log('this is our goal weight data', goalWeightData);
  //       };

  //   fetchGoalWeightData();
  // }, [toggle])

  //mapping over weight objects to display onscreen

  const displayWeights = weights.map((object) => (
    <div key={object.id}>
      <DisplayWeights
        weight={object.weight}
        id={object.id}
        dates={object.dates}
        handleDeleteWeight={handleDeleteWeight}
      />
    </div>
  ));

  //make the edit of goal weight an onclick on the actual weight. not a button
  //get rid of enter button

  return (
    <>
      <div className="weigh-in-container">
        <h2 className="weight-title">Weigh-in</h2>
        {/* <div className = 'weigh-in--goal'>
        
        <p>
          Your goal:
          {checkIfStringContainsOnlyNumbers(goalWeight) &&
            parseInt(goalWeight) > 0
          ? <> <b onClick = {handleEditGoalWeight}>{goalWeight}kg</b> <button className="edit-button" >edit</button> </> :
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
        </div> */}
        <div className="weight-list--enter-weight-container">
          <p className="weight-list--weight-string">
            Your weight of the week:{" "}
          </p>
          <input
            className="enter-weight"
            placeholder="weight..."
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>

        <div className="weight-list">{displayWeights}</div>
      </div>
    </>
  );
}
