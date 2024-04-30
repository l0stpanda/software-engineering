export const CustomTooltipBar = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div className="
            font-header
            font-bold
            text-md
            bg-background
            bg-opacity-75
            rounded-2xl
            p-4">
                <span>{label}</span>
                <br />
                {payload.map((ele, index) => (
                    <>
                        <small key={index} >
                            {ele.name} : {ele.value}
                        </small>
                        <br />
                    </>
                ))}
            </div>
        );
    }
    return null;
};


export const CustomTooltipPie = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div>
                <span>{label}</span>
                <br />
                {payload.map((ele, index) => (
                    <>
                        <small key={index} className="font-header font-bold text-sm bg-background bg-opacity-75 rounded-2xl p-3">
                            {ele.name} : {ele.value}
                        </small>
                        <br />
                    </>
                ))}
            </div>
        );
    }
    return null;
};
