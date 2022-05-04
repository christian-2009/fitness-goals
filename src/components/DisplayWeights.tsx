interface DisplayWeightsInterface {
    weight: string;
    id: number;
    dates: Date;
    handleDeleteWeight: (id: number) => Promise<void>
}


export default function DisplayWeights({weight, id, dates, handleDeleteWeight}: DisplayWeightsInterface): JSX.Element {
  const currentDate = new Date(dates).toLocaleDateString();

  return (
    <>
      <div className="individual-weight">
        <b>{weight + "kg " + currentDate}</b>
      </div>
      <div className="center-delete">
        <button
          className="delete-button"
          onClick={() => handleDeleteWeight(id)}
        >
          delete
        </button>
      </div>
    </>
  );
}