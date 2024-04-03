function PendingRequestItem(props: { id: number }) {
  return (
    <tr>
      <td className="px-6 py-3">Flower Delivery Request</td>
      <td className="px-6 py-3">{props.id}</td>
      <td className="px-6 py-3"></td>
      <td className="px-6 py-3">10:45 AM</td>
      <td className="px-6 py-3">Room 304</td>
      <td>
        <button>
          <i className="fa px-9 py-3">&#xf014;</i>
        </button>
      </td>
    </tr>
  );
}

export default PendingRequestItem;
