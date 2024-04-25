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
                <Tab label="Tools" id="tab-0" value={0}/>
                <Tab label="Libraries" id="tab-1" value={1}/>
                <Tab label="Frameworks" id="tab-2" value={2}/>
            </Tabs>

            <div hidden={tabDisplayed !== 0} id={`tab-${0}`}>
                {tabDisplayed === 0 && (
                    <div className="grid grid-cols-2">

                        <a href="https://www.jetbrains.com/webstorm/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={webstormImg} className="object-contain h-full w-full"
                                         alt="Webstorm Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Webstorm
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://github.com/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={githubImg} className="object-contain h-full w-full"
                                         alt="Github Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Github
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://taiga.io/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={taigaImg} className="object-contain h-full w-full"
                                         alt="Taiga Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Taiga
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://discord.com/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={discordImg} className="object-contain h-full w-full"
                                         alt="Discord Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Discord
                                    </h3>
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
                                <div className="h-10 w-10 self-center">
                                    <img src={auth0Img} className="object-contain h-full w-full"
                                         alt="Auth0 Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Auth0
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://mui.com/material-ui/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={materialUI} className="object-contain h-full w-full"
                                         alt="Material UI Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Material UI
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://www.axios.com/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={axiosImg} className="object-contain h-full w-full"
                                         alt="Axios Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Axios
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://getbootstrap.com/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={bootstrapImg} className="object-contain h-full w-full"
                                         alt="Bootstrap Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Bootstrap
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://day.js.org/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={dayjsImg} className="object-contain h-full w-full"
                                         alt="DayJS Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        DayJS
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://tailwindcss.com/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={tailwindImg} className="object-contain h-full w-full"
                                         alt="Tailwind Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Tailwind
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://prettier.io/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={prettierImg} className="object-contain h-full w-full"
                                         alt="Prettier Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Prettier
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://sass-lang.com/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={sassImg} className="object-contain h-full w-full"
                                         alt="Sass Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Sass
                                    </h3>
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
                                <div className="h-10 w-10 self-center">
                                    <img src={viteImg} className="object-contain h-full w-full"
                                         alt="Vite Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Vite
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://yarnpkg.com/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={yarnImg} className="object-contain h-full w-full"
                                         alt="Yarn Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Yarn
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://react.dev/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={reactImg} className="object-contain h-full w-full"
                                         alt="React Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        React
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://www.prisma.io/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={prismaImg} className="object-contain h-full w-full"
                                         alt="Prisma Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Prisma
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://www.postgresql.org/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={postgresImg} className="object-contain h-full w-full"
                                         alt="PostgresSQL Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        PostgresSQL
                                    </h3>
                                </div>
                            </div>
                        </a>

                        <a href="https://expressjs.com/">
                            <div className="flex flex-col px-5 py-5">
                                <div className="h-10 w-10 self-center">
                                    <img src={expressImg} className="object-contain h-full w-full"
                                         alt="Express Logo"/>
                                </div>
                                <div>
                                    <h3 className="text-center">
                                        Express
                                    </h3>
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
