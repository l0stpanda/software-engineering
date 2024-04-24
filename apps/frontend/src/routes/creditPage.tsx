import { Button } from "@mui/material";
import { useState } from "react";
//import {viteLink} from "../../public/vite.svg";
//import {background} from "../assets/about_page_background.png";

export default function CreditPage() {
  const [textIndex, setTextIndex] = useState<number>(0);

  const allText = [
    { text: "React", url: "https://react.dev/", img: "" },
    { text: "Tailwind", url: "https://tailwindcss.com/", img: "" },
    { text: "PostgreSQL", url: "https://www.postgresql.org/", img: "" },
    { text: "Docker", url: "https://www.docker.com/", img: "" },
    { text: "Webstorm", url: "https://www.jetbrains.com/webstorm/", img: "" },
    { text: "AWS", url: "https://aws.amazon.com/", img: "" },
    { text: "Yarn", url: "https://yarnpkg.com/", img: "" },
    { text: "Node.js", url: "https://nodejs.org/en", img: "" },
    { text: "Vite", url: "https://vitejs.dev/", img: "" },
    { text: "Auth0", url: "https://auth0.com/", img: "" },
    { text: "Axios", url: "https://www.axios.com/", img: "" },
    { text: "Material.ui", url: "https://mui.com/material-ui/", img: "" },
    { text: "PrismaORM", url: "https://www.prisma.io/", img: "" },
    { text: "Taiga", url: "https://taiga.io/", img: "" },
    { text: "Github", url: "https://github.com/", img: "" },
    { text: "Figma", url: "https://www.figma.com/", img: "" },
    { text: "Draw.io", url: "https://www.drawio.com/", img: "" },
    { text: "Miro", url: "https://miro.com/", img: "" },
  ];

  const handleChangeRight = () => {
    if (textIndex == allText.length - 1) {
      setTextIndex(0);
    } else {
      setTextIndex(textIndex + 1);
    }
  };

  const handleChangeLeft = () => {
    if (textIndex == 0) {
      setTextIndex(allText.length - 1);
    } else {
      setTextIndex(textIndex - 1);
    }
  };

  return (
    <div className="">
      <h1 className="font-header text-primary font-bold text-3xl text-center px-6 h-fit justify-center py-10 pb-30 gap-4 -m-5">
        Tool, Libraries and Frameworks
      </h1>

      <div className="flex flex-row justify-evenly align-center">
        <Button
          onClick={() => handleChangeLeft()}
          type="button"
          id="zoomInBut"
          variant="contained"
          className="zoomInBut"
          size="medium"
          sx={{
            borderRadius: "30px",
            fontSize: "22px",
            font: "header",
            height: "50px",
          }}
        >
          &lt;
        </Button>
        <a
          href={allText[textIndex].url}
          className="flex text-primary font-bold text-5xl text-center px-20 h-fit justify-center py-20 gap-4 -m-5 underline"
        >
          {/*<img src={allText[textIndex].img} alt="Image"/>*/}
          {allText[textIndex].text}
        </a>
        <Button
          onClick={() => handleChangeRight()}
          type="button"
          id="zoomInBut"
          variant="contained"
          className="zoomInBut"
          size="medium"
          sx={{
            borderRadius: "30px",
            fontSize: "22px",
            font: "header",
            height: "50px",
          }}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}
