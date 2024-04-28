import React from "react";
// import Slider from "react-slick";
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
import vincent_picture from "../assets/softeng_vincent.jpg";
import najum_picture from "../assets/softeng_najum.jpg";

const teamMembers = [
  { name: "Carter Moore", role: "Lead Soft Eng", img: carter_picture },
  { name: "Krishna Garg", role: "Assis. Lead Soft Eng", img: krishna_picture },
  {name: "Alessandra Giovenco", role: "Assis. Lead Soft Eng", img: ally_picture,},
  { name: "Ben Zeng", role: "Document Analyst", img: ben_picture },
  { name: "Samruddhi Naik", role: "Product Owner", img: sam_picture },
  { name: "Abelardo Broche", role: "Full-Time Soft Eng", img: abe_picture },
  { name: "Mike Wilkinson", role: "Team Coach", img: mike_picture },
  { name: "Sean Peacock", role: "Full-Time Soft Eng", img: sean_picture },
  { name: "Sahil Mirani", role: "Full-Time Soft Eng", img: sahil_picture },
  { name: "Najum Soofi", role: "Project Manager", img: najum_picture },
  { name: "Qiushi Chen", role: "Full-Time Soft Eng", img: quishi_picture },
  { name: "Vincent Huang", role: "Full-Time Soft Eng", img: vincent_picture },
];
function AboutPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    <div className="about-page-container">
      {/* all the other stuff */}
      {/*<Slider {...settings}>*/}
      {/*  {teamMembers.map((member) => (*/}
      {/*    <div key={member.name} className="team-member">*/}
      {/*      <div className="team-member-image">*/}
      {/*        <img src={member.img} alt={member.name} />*/}
      {/*      </div>*/}
      {/*      <div className="team-member-info">*/}
      {/*        <h3>{member.name}</h3>*/}
      {/*        <p>{member.role}</p>*/}
      {/*          <p>*insert favorite quote requirement*</p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</Slider>*/}
    {/*    tbd once this fucking WORKS*/}
    </div>
  );
}

export default AboutPage;

//sahil's abtPage. commented out in case its needed bc this is a mess im sorry.
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
