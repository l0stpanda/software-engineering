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
    <tr key={props.id}>
      <td className="px-6 py-3">{props.id}</td>
      <td className="px-6 py-3">{props.status}</td>
      <td className="px-6 py-3">{formatDate(props.requestDate)}</td>
      <td className="px-6 py-3">{formatTime(props.requestDate)}</td>
      <td className="px-6 py-3">{props.room}</td>
      <td className="px-6 py-3">
        <button>
          {/*This will have a delete button eventually*/}
          <i className="px-9 py-3"></i>
        </button>
      </td>
    </tr>
  );
}

export default PendingRequestItem;
