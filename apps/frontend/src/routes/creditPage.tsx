// import { Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
import Slider from "react-slick";

// frameworks
import viteImg from "../assets/vite.svg";
import yarnImg from "../assets/yarn.png";
import reactImg from "../assets/react.svg";
import postgresImg from "../assets/pgAdmin4.png";
import prismaImg from "../assets/prisma.png";
import expressImg from "../assets/express.png";

// libraries
import tailwindImg from "../assets/tailwind.png";
import auth0Img from "../assets/auth0.png";
import axiosImg from "../assets/axios.png";
import bootstrapImg from "../assets/bootstrap.png";
import dayjsImg from "../assets/dayjs.png";
import prettierImg from "../assets/Prettier.png";
import sassImg from "../assets/sass.png";
import materialUI from "../assets/materialui.png";

// tools
import webstormImg from "../assets/webstorm.png";
import githubImg from "../assets/github.png";
import taigaImg from "../assets/taiga.png";
import discordImg from "../assets/discord.png";

// background
import Background from "../assets/allyBackground.png";

const pngsLinksEtc = [
  //tools
  {
    link: "https://www.jetbrains.com/webstorm/",
    img: webstormImg,
    label: "tools",
    alt: "Webstorm Logo",
    title: "Webstorm",
  },
  {
    link: "https://github.com/",
    img: githubImg,
    label: "tools",
    alt: "Github Logo",
    title: "Github",
  },
  {
    link: "https://taiga.io/",
    img: taigaImg,
    label: "tools",
    alt: "Taiga Logo",
    title: "Taiga",
  },
  {
    link: "https://discord.com/",
    img: discordImg,
    label: "tools",
    alt: "Discord Logo",
    title: "Discord",
  },
  //libraries
  {
    link: "https://auth0.com/",
    img: auth0Img,
    label: "libraries",
    alt: "Auth0 Logo",
    title: "Auth0",
  },
  {
    link: "https://mui.com/material-ui/",
    img: materialUI,
    label: "libraries",
    alt: "Material UI Logo",
    title: "Material UI",
  },
  {
    link: "https://www.axios.com/",
    img: axiosImg,
    label: "libraries",
    alt: "Axios Logo",
    title: "Axios",
  },
  {
    link: "https://getbootstrap.com/",
    img: bootstrapImg,
    label: "libraries",
    alt: "Bootstrap Logo",
    title: "Bootstrap",
  },
  {
    link: "https://day.js.org/",
    img: dayjsImg,
    label: "libraries",
    alt: "DayJS Logo",
    title: "DayJS",
  },
  {
    link: "https://tailwindcss.com/",
    img: tailwindImg,
    label: "libraries",
    alt: "Tailwind Logo",
    title: "Tailwind",
  },
  {
    link: "https://prettier.io/",
    img: prettierImg,
    label: "libraries",
    alt: "Prettier Logo",
    title: "Prettier",
  },
  {
    link: "https://sass-lang.com/",
    img: sassImg,
    label: "libraries",
    alt: "Sass Logo",
    title: "Sass",
  },
  //frameworks
  {
    link: "https://vitejs.dev/",
    img: viteImg,
    label: "frameworks",
    alt: "Vite Logo",
    title: "Vite",
  },
  {
    link: "https://yarnpkg.com/",
    img: yarnImg,
    label: "frameworks",
    alt: "Yarn Logo",
    title: "Yarn",
  },
  {
    link: "https://react.dev/",
    img: reactImg,
    label: "frameworks",
    alt: "React Logo",
    title: "React",
  },
  {
    link: "https://www.prisma.io/",
    img: prismaImg,
    label: "frameworks",
    alt: "Prisma Logo",
    title: "Prisma",
  },
  {
    link: "https://www.postgresql.org/",
    img: postgresImg,
    label: "frameworks",
    alt: "PostgresSQL Logo",
    title: "PostgresSQL",
  },
  {
    link: "https://expressjs.com/",
    label: "frameworks",
    img: expressImg,
    alt: "Express Logo",
    title: "Express",
  },
];

// make that shit move!!!!!!! its 3am.
const credSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: false,
  cssEase: "linear",
};

export default function CreditPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs = ["Tools", "Libraries", "Frameworks"];
  function handleTabChange(index: number) {
    setActiveTab(index);
  }
  //i want to try my hand in tailwind buttons. its 4am.
  const tabClasses = (index: number) =>
    `cursor-pointer py-3 px-5 text-m font-medium text-center ${
      activeTab === index
        ? "text-primary bg-white bg-opacity-80 border-b-2 border-primary rounded-t-2xl"
        : "text-primary hover:bg-background hover:bg-opacity-80 rounded-t-lg"
    }`;

  const itemsFiltered = () => {
    const label = tabs[activeTab].toLowerCase(); //Tools -> tools.
    return pngsLinksEtc.filter((item) => item.label === label);
  };

  return (
    <div
      className="h-full
                 w-screen
                 bg-cover
                 fixed"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      <h1
        className="font-header text-primary font-bold text-center p-10 mt-12 relative"
        style={{
          fontSize: "42px",
        }}
      >
        Software Tools, Frameworks and Libraries
      </h1>
      {/*^^I wanted to make the font size consistent with the about page^^*/}

      {/*<Tabs*/}
      {/*    value={tabDisplayed}*/}
      {/*    onChange={(event, num) => handleTabChange(event, num)}*/}
      {/*    className="font-header"*/}
      {/*style = {{*/}
      {/*    position: "absolute",*/}
      {/*    marginTop: "0%",*/}
      {/*    marginLeft: "40%",*/}
      {/*}}>*/}
      {/*    <Tab label="Tools" id="tab-0" value={0} className = "font-header" />*/}
      {/*    <Tab label="Libraries" id="tab-1" value={1} />*/}
      {/*    <Tab label="Frameworks" id="tab-2" value={2} />*/}
      {/*</Tabs>*/}

      <div className="flex justify-center space-x-1 bg-transparent pt-5">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={tabClasses(index)}
            onClick={() => handleTabChange(index)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="py-5">
        {activeTab >= 0 && activeTab <= 2 && (
          <Slider {...credSettings}>
            {itemsFiltered().map((item, index) => (
              <div key={index} className="outline-none">
                <div className="flex justify-center items-center py-[6.5%] pt-12">
                  <a
                    href={item.link}
                    className="transition duration-300 ease-in-out transform hover:scale-110"
                  >
                    <div className="flex flex-col px-5 py-5 pt-0">
                      {/*the style attr is there because i didnt want the pngs to be transparent, just the box.*/}
                      <div
                        className="h-60 w-60 self-center box-content p-5 pb-11 rounded-xl"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                        }}
                      >
                        <img
                          src={item.img}
                          className="object-contain h-full w-full"
                          alt={item.alt}
                        />
                        {/*name of the thingys*/}
                        <h3
                          className="text-center py-1 font-header text-primary"
                          style={{
                            fontSize: "25px",
                            fontWeight: "bold",
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
