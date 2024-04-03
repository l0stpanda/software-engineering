import trashIcon from "../assets/trashicon.png";

type FlowerReqData = {
  id: number;
  room: string;
  requestDate: string;
  status: string;
};

function PendingRequestItem(props: FlowerReqData) {
  // Formats date string to date format
  function formatDate(requestDate: string) {
    const dateToFormat: Date = new Date(requestDate);
    return dateToFormat.toLocaleDateString();
  }

  // Formats date string to time format
  function formatTime(requestDate: string) {
    const dateToFormat: Date = new Date(requestDate);
    return dateToFormat.toLocaleTimeString();
  }

  return (
    <tr className="bg-background border-b-2 border-secondary" key={props.id}>
      <td className="p-3 text-sm">{props.id}</td>
      <td className="p-3 text-sm">
        <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-secondary rounded-lg">
          {props.status}
        </span>
      </td>
      <td className="p-3 text-sm">{formatDate(props.requestDate)}</td>
      <td className="p-3 text-sm">{formatTime(props.requestDate)}</td>
      <td className="p-3 text-sm">{props.room}</td>
      <td className="p-3 text-sm">
        <button>
          <img
            src={trashIcon}
            alt="Trash icon"
            className="px-7 flex justify-center transform h-6 hover:scale-125"
          />
        </button>
      </td>
    </tr>
  );
}

export default PendingRequestItem;
