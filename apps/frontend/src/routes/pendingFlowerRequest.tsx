import React from "react";
//import {GetReq} from "../objects/DAO_FlowerReq.ts";

export default function PendingFlowerRequest() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <table className="table-fixed,border-separate border border-slate-500, rounded-2xl">
          <thead>
            <tr>
              <th className="border border-slate-500">
                Flower Delivery Request
              </th>
              <th className="border">Status</th>
              <th className="border">Date Entered</th>
              <th className="border">Time Entered</th>
              <th className="border">Destination</th>
              <th className="border">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="flex justify-center">Mr. Jones Request</td>
              <td>Pending</td>
              <td>03/03/03</td>
              <td>10:45 AM</td>
              <td>Room 304</td>
              <td>
                <button>
                  <i className="fa">&#xf014;</i>
                </button>
              </td>
            </tr>
            <tr>
              <td>Betty Crocker Request</td>
              <td>Pending</td>
              <td>03/03/03</td>
              <td>10:45 AM</td>
              <td>Room 304</td>
              <td>
                <button>
                  <i className="fa">&#xf014;</i>
                </button>
              </td>
            </tr>
            <tr>
              <td>Bartholomeow Request</td>
              <td>Pending</td>
              <td>03/03/03</td>
              <td>10:45 AM</td>
              <td>Room 304</td>
              <td>
                <button>
                  <i className="fa">&#xf014;</i>
                </button>
              </td>
            </tr>
            <tr>
              <td>Bartholomeow Request</td>
              <td>Pending</td>
              <td>03/03/03</td>
              <td>10:45 AM</td>
              <td>Room 304</td>
              <td>
                <button>
                  <i className="fa">&#xf014;</i>
                </button>
              </td>
            </tr>
            <tr>
              <td>Bartholomeow Request</td>
              <td>Pending</td>
              <td>03/03/03</td>
              <td>10:45 AM</td>
              <td>Room 304</td>
              <td>
                <button>
                  <i className="fa">&#xf014;</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
