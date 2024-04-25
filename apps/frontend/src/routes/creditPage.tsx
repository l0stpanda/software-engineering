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
                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://www.jetbrains.com/webstorm/">
                                <div>
                                    <img src={webstormImg} className="object-contain"
                                         style={{width: "20%", height: "20%"}}
                                         alt="Webstorm Logo"/>
                                </div>
                                <div>
                                    <h3>
                                        Webstorm
                                    </h3>
                                </div>
                            </a>
                        </div>

                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://github.com/">
                                <div>
                                    <img src={githubImg} className="object-contain"
                                         style={{width: "20%", height: "20%"}}
                                         alt="Github Logo"/>
                                </div>
                                <div>
                                    <h3>
                                        Github
                                    </h3>
                                </div>
                            </a>
                        </div>


                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://taiga.io/">
                                <div>
                                    <img src={taigaImg} className="object-contain"
                                         style={{width: "20%", height: "20%"}}
                                         alt="Taiga Logo"/>
                                </div>
                                <div>
                                    <h3>
                                        Taiga
                                    </h3>
                                </div>
                            </a>
                        </div>
                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://discord.com/">
                                <div>
                                    <img src={discordImg} className="object-contain"
                                         style={{width: "20%", height: "20%"}}
                                         alt="Discord Logo"/>
                                </div>
                                <div>
                                    <h3>
                                        Discord
                                    </h3>
                                </div>
                            </a>
                        </div>

                    </div>

                )}
            </div>

            <div hidden={tabDisplayed !== 1} id={`tab-${1}`}>
                {tabDisplayed === 1 && (
                    <div className="grid grid-cols-4 justify-evenly">

                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://auth0.com/">
                                <div>
                                    <img src={auth0Img} className="object-contain"
                                         style={{width: "20%", height: "20%"}}
                                         alt="Auth0 Logo"/>
                                </div>
                                <div>
                                    <h3>
                                        Auth0
                                    </h3>
                                </div>
                            </a>
                        </div>

                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://mui.com/material-ui/">
                                <div>
                                    <img src={materialUI} className="object-contain"
                                         style={{width: "20%", height: "20%"}}
                                         alt="Material IU Logo"/>
                                </div>
                                <div>
                                    <h3>
                                        Material IU
                                    </h3>
                                </div>
                            </a>
                        </div>

                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://www.axios.com/">
                                <div>
                                    <img src={axiosImg} className="object-contain"
                                         style={{width: "20%", height: "20%"}}
                                         alt="Axios Logo"/>
                                </div>
                                <div>
                                    <h3>
                                        Axios
                                    </h3>
                                </div>
                            </a>
                        </div>

                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://getbootstrap.com/">
                                <div>
                                    <img src={bootstrapImg} className="object-contain"
                                         style={{width: "20%", height: "20%"}}
                                         alt="Bootstrap Logo"/>
                                </div>
                                <div>
                                    <h3>
                                        Bootstrap
                                    </h3>
                                </div>
                            </a>
                        </div>

                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://day.js.org/">
                                <div>
                                    <img src={dayjsImg} className="object-contain"
                                         style={{width: "20%", height: "20%"}}
                                         alt="DayJS Logo"/>
                                </div>
                                <div>
                                    <h3>
                                        DayJS
                                    </h3>
                                </div>
                            </a>
                        </div>

                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://tailwindcss.com/">
                                <div>
                                    <img src={tailwindImg} className="object-contain"
                                         style={{width: "20%", height: "20%"}}
                                         alt="Tailwind CSS Logo"/>
                                </div>
                                <div>
                                    <h3>
                                        Tailwind CSS
                                    </h3>
                                </div>
                            </a>
                        </div>

                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://prettier.io/">
                                <div>
                                    <img src={prettierImg} className="object-contain"
                                         style={{width: "20%", height: "20%"}}
                                         alt="Prettier Logo"/>
                                </div>
                                <div>
                                    <h3>
                                        Prettier
                                    </h3>
                                </div>
                            </a>
                        </div>

                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://sass-lang.com/">
                                <div>
                                    <img src={sassImg} className="object-contain"
                                         style={{width: "20%", height: "20%"}}
                                         alt="Sass Logo"/>
                                </div>
                                <div>
                                    <h3>
                                        Sass
                                    </h3>
                                </div>
                            </a>
                        </div>


                    </div>
                )}
            </div>

            <div hidden={tabDisplayed !== 2} id={`tab-${2}`}>
                {tabDisplayed === 2 && (


                    <div className="grid grid-cols-3 justify-evenly">
                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://vitejs.dev/">
                                <img src={viteImg} style={{width: "20%", height: "20%"}}
                                     alt="Vite Logo"/>
                                <h3>
                                    Vite
                                </h3>
                            </a>

                        </div>
                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://yarnpkg.com/">
                                <img src={yarnImg} className="object-contain" style={{width: "20%", height: "20%"}}
                                     alt="Yarn Logo"/>
                                <h3>
                                    Yarn
                                </h3>
                            </a>

                        </div>
                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://react.dev/">
                                <img src={reactImg} className="object-contain" style={{width: "20%", height: "20%"}}
                                     alt="React Logo"/>
                                <h3>
                                    React
                                </h3>
                            </a>

                        </div>
                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://www.prisma.io/">
                                <img src={prismaImg} className="object-contain" style={{width: "20%", height: "20%"}}
                                     alt="Prisma Logo"/>
                                <h3 >
                                    Prisma
                                </h3>
                            </a>

                        </div>
                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://www.postgresql.org/">
                                <img src={postgresImg} className="object-contain" style={{width: "20%", height: "20%"}}
                                     alt="PostgresSQL Logo"/>
                                <h3>
                                    PostgresSQL
                                </h3>
                            </a>

                        </div>
                        <div className="flex flex-col justify-center px-5 py-5">
                            <a href="https://expressjs.com/">
                                <img src={expressImg} className="object-contain" style={{width: "20%", height: "20%"}}
                                     alt="Express Logo"/>
                                <h3>
                                    Express
                                </h3>
                            </a>

                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}


 // export default CreditPage;
