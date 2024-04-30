export const CustomTooltipBar = (props: {
  active: boolean;
  payload: { name: string; value: string }[];
  label: string;
}) => {
  if (props.active && props.payload?.length) {
    return (
      <div
        className="
            font-header
            font-bold
            text-md
            bg-background
            bg-opacity-75
            rounded-2xl
            p-4"
      >
        <span>{props.label}</span>
        <br />
        {props.payload.map(
          (ele: { name: string; value: string }, index: number) => (
            <>
              <small key={index}>
                {ele.name} : {ele.value}
              </small>
              <br />
            </>
          ),
        )}
      </div>
    );
  }
  return null;
};

export const CustomTooltipPie = (props: {
  active: boolean;
  payload: { name: string; value: string }[];
  label: string;
}) => {
  if (props.active && props.payload?.length) {
    return (
      <div>
        <span>{props.label}</span>
        <br />
        {props.payload.map(
          (ele: { name: string; value: string }, index: number) => (
            <>
              <small
                key={index}
                className="font-header font-bold text-sm bg-background bg-opacity-75 rounded-2xl p-3"
              >
                {ele.name} : {ele.value}
              </small>
              <br />
            </>
          ),
        )}
      </div>
    );
  }
  return null;
};
