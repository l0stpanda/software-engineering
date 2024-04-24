import abe_picture from "../assets/softeng_abe.jpg";
import carter_picture from "../assets/softeng_carter.jpg";
import krishna_picture from "../assets/softeng_krishna.png";
import sam_picture from "../assets/softeng_sam.jpg";
import ally_picture from "../assets/softeng_ally.jpg";
import ben_picture from "../assets/softeng_ben.jpg";
import sean_picture from "../assets/softeng_sean.jpg";
import sahil_picture from "../assets/softeng_sahil.jpg";
import quishi_picture from "../assets/softeng_quishi.jpg";
import vincent_picture from "../assets/softeng_vincent.jpg";
import mike_picture from "../assets/softeng_mike.png";
import najum_picture from "../assets/softeng_najum.jpg";
import AboutPageBackground from "../components/allyBackground.tsx";

function AboutPage() {
  return (
    <div className="flex flex-row overflow-hidden">
      <AboutPageBackground />
      <div className="flex flex-col ml-2 mt-5 py-5 px-5 items-center bg-background rounded-xl border-primary border-2 w-[25%] h-fit font-header">
        <h1>WPI Computer Science Department</h1>
        <h1>CS3733-D24 Software Engineering</h1>
        <h1>Professor Wilson Wong</h1>
      </div>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="mb-10">
          <h1 className="text-5xl mt-5 font-header underline">
            Meet the Team!
          </h1>
        </div>
        <div className="h-screen flex top-32 justify-center">
          <div className="flex flex-col items-center">
            <div className="flex flex-row mb-2 gap-6">
              <div className="flex flex-col justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border border-2">
                  <img
                    className="w-full object-cover"
                    src={carter_picture}
                  ></img>
                </div>
                <p className="text-center">Carter Moore</p>
                <p className="text-center">Lead Soft Eng</p>
              </div>

              <div className="flex flex-col justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border border-2">
                  <img className="w-full object-cover" src={ally_picture}></img>
                </div>
                <p className="text-center">Alessandra Giovenco</p>
                <p className="text-center">Assis. Lead Soft Eng</p>
              </div>

              <div className="flex flex-col justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border border-2">
                  <img
                    className="w-full object-cover"
                    src={krishna_picture}
                  ></img>
                </div>
                <p className="text-center">Krishna Garg</p>
                <p className="text-center">Assis. Lead Soft Eng</p>
              </div>

              <div className="flex flex-col justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border border-2">
                  <img className="w-full object-cover" src={ben_picture}></img>
                </div>
                <p className="text-center">Ben Zeng</p>
                <p className="text-center">Document Analyst</p>
              </div>
            </div>

            <div className="flex flex-row mb-2 gap-6">
              <div className="flex flex-col justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border border-2">
                  <img className="w-full object-cover" src={sam_picture}></img>
                </div>
                <p className="text-center">Samruddhi Naik</p>
                <p className="text-center">Product Owner</p>
              </div>

              <div className="flex flex-col justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border border-2">
                  <img className="w-full object-cover" src={abe_picture}></img>
                </div>
                <p className="text-center">Abelardo Broche</p>
                <p className="text-center">Full-Time Soft Eng</p>
              </div>

              <div className="flex flex-col justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border border-2">
                  <img className="w-full object-cover" src={mike_picture}></img>
                </div>
                <p className="text-center">Mike Wilkinson</p>
                <p className="text-center">Team Coach</p>
              </div>

              <div className="flex flex-col justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border border-2">
                  <img className="w-full object-cover" src={sean_picture}></img>
                </div>
                <p className="text-center">Sean Peacock</p>
                <p className="text-center">Full-Time Soft Eng</p>
              </div>

              <div className="flex flex-col justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border border-2">
                  <img
                    className="w-full object-cover"
                    src={sahil_picture}
                  ></img>
                </div>
                <p className="text-center">Sahil Mirani</p>
                <p className="text-center">Full-Time Soft Eng</p>
              </div>
            </div>

            <div className="flex flex-row gap-6">
              <div className="flex flex-col justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border border-2">
                  <img
                    className="w-full object-cover"
                    src={najum_picture}
                  ></img>
                </div>
                <p className="text-center">Najum Soofi</p>
                <p className="text-center">Project Manager</p>
              </div>

              <div className="flex flex-col justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border border-2">
                  <img
                    className="w-full object-cover"
                    src={quishi_picture}
                  ></img>
                </div>
                <p className="text-center">Qiushi Chen</p>
                <p className="text-center">Full-Time Soft Eng</p>
              </div>

              <div className="flex flex-col justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden items-center self-center border border-2">
                  <img
                    className="w-full object-cover"
                    src={vincent_picture}
                  ></img>
                </div>
                <p className="text-center">Vincent Huang</p>
                <p className="text-center">Full-Time Soft Eng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed ml-2 mt-5 py-5 px-5 bg-background rounded-xl border-primary w-[28%] border-2 h-fit font-header self-end bottom-5 left-0.25">
        <p>
          Thank You Brigham and Women’s Hospital and especially Andrew Shinn
        </p>
        <p className="text-xs">
          Disclaimer: The Brigham & Women’s Hospital maps and data used in this
          application are copyrighted and provided for the sole use of
          educational purposes.”
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
