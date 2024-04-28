import { Tabs, Tab } from "@mui/material";
import { useState } from "react";

// frameworks
import viteImg from "../../public/vite.svg";
import yarnImg from "../../public/yarn.png";
import reactImg from "../../public/react.svg";
import postgresImg from "../../public/pgAdmin4.png";
import prismaImg from "../../public/prisma.png";
import expressImg from "../../public/express.png";

// libraries
import tailwindImg from "../../public/tailwind.png";
import auth0Img from "../../public/auth0.png";
import axiosImg from "../../public/axios.png";
import bootstrapImg from "../../public/bootstrap.png";
import dayjsImg from "../../public/dayjs.png";
import prettierImg from "../../public/Prettier.png";
import sassImg from "../../public/sass.png";
import materialUI from "../../public/materialui.png";

// tools
import webstormImg from "../../public/webstorm.png";
import githubImg from "../../public/github.png";
import taigaImg from "../../public/taiga.png";
import discordImg from "../../public/discord.png";

import Background from "../components/allyBackground.tsx";

export default function CreditPage() {
  const [tabDisplayed, setTabDisplayed] = useState<number>(0);

  function handleTabChange(event: React.SyntheticEvent, num: number) {
    setTabDisplayed(num);
  }

  return (
    <div>
      <Background></Background>
      <h1 className="font-header text-primary font-bold text-3xl text-center px-6 h-fit justify-center py-10 pb-30 gap-4 -m-5">
        Software Tools, Frameworks and Libraries
      </h1>

      <Tabs
        value={tabDisplayed}
        onChange={(event, num) => handleTabChange(event, num)}
        className=""
      >
        <Tab label="Tools" id="tab-0" value={0} />
        <Tab label="Libraries" id="tab-1" value={1} />
        <Tab label="Frameworks" id="tab-2" value={2} />
      </Tabs>

      <div hidden={tabDisplayed !== 0} id={`tab-${0}`}>
        {tabDisplayed === 0 && (
          <div className="grid grid-cols-2">
            <a href="https://www.jetbrains.com/webstorm/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={webstormImg}
                    className="object-contain h-full w-full"
                    alt="Webstorm Logo"
                  />
                  <h3 className="text-center pt-3">Webstorm</h3>
                </div>
              </div>
            </a>

            <a href="https://github.com/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={githubImg}
                    className="object-contain h-full w-full"
                    alt="Github Logo"
                  />
                  <h3 className="text-center pt-3">Github</h3>
                </div>
              </div>
            </a>

            <a href="https://taiga.io/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={taigaImg}
                    className="object-contain h-full w-full"
                    alt="Taiga Logo"
                  />
                  <h3 className="text-center pt-3">Taiga</h3>
                </div>
              </div>
            </a>

            <a href="https://discord.com/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={discordImg}
                    className="object-contain h-full w-full"
                    alt="Discord Logo"
                  />
                  <h3 className="text-center pt-3">Discord</h3>
                </div>
              </div>
            </a>
          </div>
        )}
      </div>

      <div hidden={tabDisplayed !== 1} id={`tab-${1}`}>
        {tabDisplayed === 1 && (
          <div className="grid grid-cols-4 justify-evenly">
            <a href="https://auth0.com/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={auth0Img}
                    className="object-contain h-full w-full"
                    alt="Auth0 Logo"
                  />
                  <h3 className="text-center pt-3">Auth0</h3>
                </div>
              </div>
            </a>

            <a href="https://mui.com/material-ui/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={materialUI}
                    className="object-contain h-full w-full"
                    alt="Material UI Logo"
                  />
                  <h3 className="text-center pt-3">Material UI</h3>
                </div>
              </div>
            </a>

            <a href="https://www.axios.com/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={axiosImg}
                    className="object-contain h-full w-full"
                    alt="Axios Logo"
                  />
                  <h3 className="text-center pt-3">Axios</h3>
                </div>
              </div>
            </a>

            <a href="https://getbootstrap.com/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={bootstrapImg}
                    className="object-contain h-full w-full"
                    alt="Bootstrap Logo"
                  />
                  <h3 className="text-center pt-3">Bootstrap</h3>
                </div>
              </div>
            </a>

            <a href="https://day.js.org/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={dayjsImg}
                    className="object-contain h-full w-full"
                    alt="DayJS Logo"
                  />
                  <h3 className="text-center pt-3">DayJS</h3>
                </div>
              </div>
            </a>

            <a href="https://tailwindcss.com/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={tailwindImg}
                    className="object-contain h-full w-full"
                    alt="Tailwind Logo"
                  />
                  <h3 className="text-center pt-3">Tailwind</h3>
                </div>
              </div>
            </a>

            <a href="https://prettier.io/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={prettierImg}
                    className="object-contain h-full w-full"
                    alt="Prettier Logo"
                  />
                  <h3 className="text-center pt-3">Prettier</h3>
                </div>
              </div>
            </a>

            <a href="https://sass-lang.com/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={sassImg}
                    className="object-contain h-full w-full"
                    alt="Sass Logo"
                  />
                  <h3 className="text-center pt-3">Sass</h3>
                </div>
              </div>
            </a>
          </div>
        )}
      </div>

      <div hidden={tabDisplayed !== 2} id={`tab-${2}`}>
        {tabDisplayed === 2 && (
          <div className="grid grid-cols-3 justify-evenly">
            <a href="https://vitejs.dev/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={viteImg}
                    className="object-contain h-full w-full"
                    alt="Vite Logo"
                  />
                  <h3 className="text-center pt-3">Vite</h3>
                </div>
              </div>
            </a>

            <a href="https://yarnpkg.com/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={yarnImg}
                    className="object-contain h-full w-full"
                    alt="Yarn Logo"
                  />
                  <h3 className="text-center pt-3">Yarn</h3>
                </div>
              </div>
            </a>

            <a href="https://react.dev/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={reactImg}
                    className="object-contain h-full w-full"
                    alt="React Logo"
                  />
                  <h3 className="text-center pt-3">React</h3>
                </div>
              </div>
            </a>

            <a href="https://www.prisma.io/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={prismaImg}
                    className="object-contain h-full w-full"
                    alt="Prisma Logo"
                  />
                  <h3 className="text-center pt-3">Prisma</h3>
                </div>
              </div>
            </a>

            <a href="https://www.postgresql.org/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={postgresImg}
                    className="object-contain h-full w-full"
                    alt="PostgresSQL Logo"
                  />
                  <h3 className="text-center pt-3">PostgresSQL</h3>
                </div>
              </div>
            </a>

            <a href="https://expressjs.com/">
              <div className="flex flex-col px-5 py-5">
                <div className="h-32 w-32 self-center box-content bg-background p-5 pb-11 rounded-lg drop-shadow-lg opacity-80">
                  <img
                    src={expressImg}
                    className="object-contain h-full w-full"
                    alt="Express Logo"
                  />
                  <h3 className="text-center pt-3">Express</h3>
                </div>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// export default CreditPage;
