import React, { useState } from "react";
import Slider from "react-slick"; //new toy to use! little library for carousels. I could use mui, but this is already done w this
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import abe_picture from "../assets/softeng_abe.jpg";
import carter_picture from "../assets/softeng_carter.jpg";
import krishna_picture from "../assets/softeng_krishna.png";
import sam_picture from "../assets/softeng_sam.jpg";
import ally_picture from "../assets/softeng_ally.jpg";
import ben_picture from "../assets/softeng_ben.jpg";
import sean_picture from "../assets/softeng_sean.jpg";
import sahil_picture from "../assets/softeng_sahil.jpg";
import quishi_picture from "../assets/softeng_quishi.jpg";
import mike_picture from "../assets/softeng_mike.png";
import vincent_picture from "../assets/softeng_vincent.png";
import najum_picture from "../assets/softeng_najum.jpg";
import blueBG from "../assets/bluehexa.png"; //background image :D

// array of team members and their info
const teamMembers = [
  {
    name: "Carter Moore",
    role: "Lead Software Engineer, Full Stack",
    img: carter_picture,
    quote: '"read discord cratr"- Ben at 3:42am',
  },
  {
    name: "Krishna Garg",
    role: "Assistant Lead Software Engineer, Full Stack",
    img: krishna_picture,
    quote: '"I have been finding god throughout this class" - Krishna Garg',
  },
  {
    name: "Alessandra Giovenco",
    role: "Assistant Lead Software Engineer, Full Stack",
    img: ally_picture,
    quote:
      '"Life is tough and I am not, but the least I could do is take care of myself" - Lexi aka NewlyNova',
  },
  {
    name: "Ben Zeng",
    role: "Document Analyst, Full Stack",
    img: ben_picture,
    quote: '"Who put the seeds in my apple?" - Isaac Newton',
  },
  {
    name: "Samruddhi Naik",
    role: "Product Owner, Full Stack",
    img: sam_picture,
    quote:
      '"You guys need to focus on your majors not your minors: focus on CS"- Sam',
  },
  {
    name: "Sean Peacock",
    role: "Scrum Master, Full Stack",
    img: sean_picture,
    quote:
      '"One must be sane to think clearly, but one can think deeply and be quite insane" - Nikola Tesla',
  },
  {
    name: "Najum Soofi",
    role: "Project Manager, Full Stack",
    img: najum_picture,
    quote: "",
  },
  {
    name: "Mike Wilkinson",
    role: "Team Coach",
    img: mike_picture,
    quote: '"The first step to failure is trying." - Homer Simpson',
  },
  {
    name: "Abelardo Broche",
    role: "Full-Time Software Engineer, Full Stack",
    img: abe_picture,
    quote:
      'Ben: "Why are you hugging the pillar?"' +
      '\n Abe: "Because I want Krishna to show me his drop downs, Krishna can you please show me your drop downs"',
  },
  {
    name: "Sahil Mirani",
    role: "Full-Time Software Engineer, Full Stack",
    img: sahil_picture,
    quote:
      ' "I think Abe has a different kind of ball game in mind" - Sahil Mirani',
  },
  {
    name: "Qiushi Chen",
    role: "Full-Time Software Engineer, Full Stack",
    img: quishi_picture,
    quote: '"Hello World"',
  },
  {
    name: "Vincent Huang",
    role: "Full-Time Software Engineer, Full Stack",
    img: vincent_picture,
    quote: '"Hello World"',
  },
];

function AboutPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  //settings for the carousel. 4 slides at a time, responsive to screen size, goes continuously (infinite)
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    //container!!
    <div
      className="h-full
                 w-screen
                 bg-cover"
      style={{
        backgroundImage: `url(${blueBG})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className="mx-auto
        rounded-2xl
        max-w-2xl
        p-0.5
        m-8
        text-center
        font-header
        items-center
        bg-background
        bg-opacity-65 bg-position-center bg-cover"
      >
        {/*words. we love words*/}
        <h2 className="teamHeader font-bold">Meet the Team!</h2>
        <div className="text-lg">
          <h1>WPI Computer Science Department</h1>
          <h1>CS3733-D24 Software Engineering</h1>
          <h1>Professor Wilson Wong</h1>
          <p className="text-xs text-center mb-5" style={{ color: "#FF0000" }}>
            Disclaimer: The Brigham & Women’s Hospital maps and data used in
            this application are
            <p>
              copyrighted and provided for the sole use of educational purposes
            </p>
          </p>
        </div>
      </div>

      {/*carousel yay (cry)*/}
      <div
        className="aboutPageContainer"
        style={{
          borderColor: "transparent",
          borderRadius: "40px",
        }}
      >
        <Slider {...sliderSettings}>
          {teamMembers.map((member, index) => (
            <div key={index} className="teamMemImgCont">
              <div
                className="text-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="teamMemImg"
                />
                <div
                  className={`infoOverlay ${hoveredIndex === index ? "flex" : "hidden"}`}
                >
                  <div className="text-container">
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                    <p>{member.quote}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <p
          className="
           text-sm
           mx-auto
           rounded-2xl
           max-w-2xl
           p-0.5
           mb-1.5
           text-center
           font-header
           items-center
           bg-background
           bg-opacity-65 bg-position-center bg-cover"
        >
          Thank You Brigham and Women’s Hospital and especially Andrew Shinn
        </p>
      </div>
    </div>
  );
}

export default AboutPage;

//sahil's abtPage. commented out in case its needed bc MINE is a mess im sorry.
// function AboutPage() {
//   return (
//     <div className="flex flex-row overflow-hidden">
//       <AboutPageBackground />
//       <div className="flex flex-col ml-2 mt-5 py-5 px-5 items-center bg-background rounded-xl border-primary border-2 w-[25%] h-fit font-header">
//         <h1>WPI Computer Science Department</h1>
//         <h1>CS3733-D24 Software Engineering</h1>
//         <h1>Professor Wilson Wong</h1>
//       </div>
//       <div className="h-screen flex flex-col items-center justify-center">
//         <div className="mb-10">
//           <h1 className="text-5xl mt-5 font-header underline">
//             Meet the Team!
//           </h1>
//         </div>
//         <div className="h-screen flex top-32 justify-center">
//           <div className="flex flex-col items-center">
//             <div className="flex flex-row mb-2 gap-6">
//               <div className="flex flex-col justify-center">
//                 <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border-2">
//                   <img
//                     className="w-full object-cover"
//                     src={carter_picture}
//                     alt="carter_picture"
//                   ></img>
//                 </div>
//                 <p className="text-center">Carter Moore</p>
//                 <p className="text-center">Lead Soft Eng</p>
//               </div>
//
//               <div className="flex flex-col justify-center">
//                 <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border-2">
//                   <img
//                     className="w-full object-cover"
//                     src={ally_picture}
//                     alt="ally_picture"
//                   ></img>
//                 </div>
//                 <p className="text-center">Alessandra Giovenco</p>
//                 <p className="text-center">Assis. Lead Soft Eng</p>
//               </div>
//
//               <div className="flex flex-col justify-center">
//                 <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border-2">
//                   <img
//                     className="w-full object-cover"
//                     src={krishna_picture}
//                     alt="krishna_picture"
//                   ></img>
//                 </div>
//                 <p className="text-center">Krishna Garg</p>
//                 <p className="text-center">Assis. Lead Soft Eng</p>
//               </div>
//
//               <div className="flex flex-col justify-center">
//                 <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border-2">
//                   <img
//                     className="w-full object-cover"
//                     src={ben_picture}
//                     alt="ben_picture"
//                   ></img>
//                 </div>
//                 <p className="text-center">Ben Zeng</p>
//                 <p className="text-center">Document Analyst</p>
//               </div>
//             </div>
//
//             <div className="flex flex-row mb-2 gap-6">
//               <div className="flex flex-col justify-center">
//                 <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border-2">
//                   <img
//                     className="w-full object-cover"
//                     src={sam_picture}
//                     alt="sam_picture"
//                   ></img>
//                 </div>
//                 <p className="text-center">Samruddhi Naik</p>
//                 <p className="text-center">Product Owner</p>
//               </div>
//
//               <div className="flex flex-col justify-center">
//                 <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border-2">
//                   <img
//                     className="w-full object-cover"
//                     src={abe_picture}
//                     alt="abe_picture"
//                   ></img>
//                 </div>
//                 <p className="text-center">Abelardo Broche</p>
//                 <p className="text-center">Full-Time Soft Eng</p>
//               </div>
//
//               <div className="flex flex-col justify-center">
//                 <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border-2">
//                   <img
//                     className="w-full object-cover"
//                     src={mike_picture}
//                     alt="abe_picture"
//                   ></img>
//                 </div>
//                 <p className="text-center">Mike Wilkinson</p>
//                 <p className="text-center">Team Coach</p>
//               </div>
//
//               <div className="flex flex-col justify-center">
//                 <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border-2">
//                   <img
//                     className="w-full object-cover"
//                     src={sean_picture}
//                     alt="sean_picture"
//                   ></img>
//                 </div>
//                 <p className="text-center">Sean Peacock</p>
//                 <p className="text-center">Full-Time Soft Eng</p>
//               </div>
//
//               <div className="flex flex-col justify-center">
//                 <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border-2">
//                   <img
//                     className="w-full object-cover"
//                     src={sahil_picture}
//                     alt="sahil_picture"
//                   ></img>
//                 </div>
//                 <p className="text-center">Sahil Mirani</p>
//                 <p className="text-center">Full-Time Soft Eng</p>
//               </div>
//             </div>
//
//             <div className="flex flex-row gap-6">
//               <div className="flex flex-col justify-center">
//                 <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border-2">
//                   <img
//                     className="w-full object-cover"
//                     src={najum_picture}
//                     alt="najum_picture"
//                   ></img>
//                 </div>
//                 <p className="text-center">Najum Soofi</p>
//                 <p className="text-center">Project Manager</p>
//               </div>
//
//               <div className="flex flex-col justify-center">
//                 <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border-2">
//                   <img
//                     className="w-full object-cover"
//                     src={quishi_picture}
//                     alt="quishi_picture"
//                   ></img>
//                 </div>
//                 <p className="text-center">Qiushi Chen</p>
//                 <p className="text-center">Full-Time Soft Eng</p>
//               </div>
//
//               <div className="flex flex-col justify-center">
//                 <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border-2">
//                   <img
//                     className="w-full object-cover"
//                     src={vincent_picture}
//                     alt="vincent_picture"
//                   ></img>
//                 </div>
//                 <p className="text-center">Vincent Huang</p>
//                 <p className="text-center">Full-Time Soft Eng</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="fixed ml-2 mt-5 py-5 px-5 bg-background rounded-xl border-primary w-[28%] border-2 h-fit font-header self-end bottom-5 left-0.25">
//         <p>
//           Thank You Brigham and Women’s Hospital and especially Andrew Shinn
//         </p>
//         <p className="text-xs">
//           Disclaimer: The Brigham & Women’s Hospital maps and data used in this
//           application are copyrighted and provided for the sole use of
//           educational purposes.”
//         </p>
//       </div>
//     </div>
//   );
// }
//
// export default AboutPage;
