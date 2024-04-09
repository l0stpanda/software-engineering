import trashIcon from "../assets/trashicon.png";
import axios from "axios";
//import {flowerReqFields} from "common/src/flowerRequest.ts";
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

  // async function idToName(id : string){
  //     const name = await axios.get(`/import/idToName/${id}`);
  //     console.log(name.data);
  //     return name.data;
  // }
  //takes in the id of the request to be deleted and deletes in the database
  async function deleteData(idVal: number) {
    console.log(idVal);
    try {
      //call to backend
      await axios.delete(`api/flowerRequest/${idVal}`);
    } catch (e) {
      console.log(e);
      return;
    }
    alert("Successfully deleted flower request with ID number " + idVal);
    //window must be reloaded on delete to show updated results
    window.location.reload();
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
        <button id={"deleteButton"}>
          <img
            onClick={() => deleteData(props.id)}
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
