interface DisplayWeightsInterface {
  weight: string;
  id: number;
  dates: Date;
  handleDeleteWeight: (id: number) => Promise<void>;
}

export default function DisplayWeights({
  weight,
  id,
  dates,
  handleDeleteWeight,
}: DisplayWeightsInterface): JSX.Element {
  const currentDate = new Date(dates).toLocaleDateString();

  return (
    <>
      <div className="individual-weight">
        <div>
          <p className="individual-weight--weight">
            You weighed: {weight + "kg "}
          </p>
          <br />
          <p className="individual-weight--date">Date: {currentDate}</p>
        </div>
        <div className="center-delete">
          <button
            className="delete-button"
            onClick={() => handleDeleteWeight(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
