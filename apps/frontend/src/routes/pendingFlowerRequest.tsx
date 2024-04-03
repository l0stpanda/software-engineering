import React from "react";
// import {GetReq} from "../objects/DAO_FlowerReq.ts";
//import axios from "axios";
//import PendingRequestItem from "../components/PendingRequestItem.tsx";

export default function PendingFlowerRequest() {
  /*type flowerReqData = {
    id: number;
    room: string;
    sent_by: string;
    sent_to: string;
    requestDate: string;
    note: string;
    status: string;
  };

  async function handleShow() {
    const returnVal = await axios.get("/api/flowerRequest").then((response) => {
      return response.data;
    });
    return showItems(returnVal);
  }

  function createItem(id: number) {
    return <PendingRequestItem id={id} />;
  }

  function showItems(reqs: flowerReqData[]) {
    for (let i = 0; i < reqs.length; i++) {
      return createItem(reqs[i].id);
    }
    return <></>;
  }*/

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex items-center justify-center">
      {/*<body className={"bg-blue"}*/}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Flower Delivery Request
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Date Entered
            </th>
            <th scope="col" className="px-6 py-3">
              Time Entered
            </th>
            <th scope="col" className="px-6 py-3">
              Destination
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-3">Betty Crocker Request</td>
            <td className="px-6 py-3">Pending</td>
            <td className="px-6 py-3">03/03/03</td>
            <td className="px-6 py-3">10:45 AM</td>
            <td className="px-6 py-3">Room 304</td>
            <td>
              <button>
                <i className="fa px-9 py-3">&#xf014;</i>
              </button>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-3">Betty Crocker Request</td>
            <td className="px-6 py-3">Pending</td>
            <td className="px-6 py-3">03/03/03</td>
            <td className="px-6 py-3">10:45 AM</td>
            <td className="px-6 py-3">Room 304</td>
            <td>
              <button>
                <i className="fa px-9 py-3">&#xf014;</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
