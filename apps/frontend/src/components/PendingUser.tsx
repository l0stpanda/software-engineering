type users = {
  id: string;
  email: string;
  username: string;
  role: string;
};

function PendingUser(props: users) {
  return (
    <tr className="bg-background border-b-2 border-secondary" key={props.id}>
      <td className="p-3 text-sm text-left">{props.email}</td>

      <td className="p-3 text-sm text-left">{props.username}</td>

      <td className="p-3 text-sm text-left">{props.role}</td>
    </tr>
  );
}

export default PendingUser;
