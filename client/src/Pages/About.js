import React from "react";
import Layout from "../Components/Layout/Layout";
import { Link } from "react-router-dom";
import {
  BsLinkedin,
  BsGithub,
  BsMailbox,
  BsCloudDownloadFill,
} from "react-icons/bs";
import { MdOutlineGrid3X3 } from "react-icons/md";
const About = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className=" mt-3 text-center">
              {" "}
              About | Quickbuy : Personal Project{" "}
            </h2>
            <p style={{ "text-align": "justify" }}>
              QuickBuy is a user-friendly online marketplace that simplifies
              buying and selling experiences. With its intuitive interface,
              users can effortlessly browse a wide range of items, from
              electronics to fashion, and securely complete transactions.
              Whether you're a buyer looking for great deals or a seller eager
              to reach a broad audience, QuickBuy provides a seamless platform
              for efficient and convenient online commerce. AI-based
              recommendation system to track user search history and generate
              personalized recommendations for each user.
            </p>
            <div className=" mt-5 zoom-effect">
              <img
                src={process.env.PUBLIC_URL + "/Images/about.jpg"}
                alt="about "
                height={300}
                width={650}
              />
            </div>
          </div>

          <div className="col-md-6">
            <h2 className=" mt-3 text-center "> About | Rohan Mali </h2>
            <p style={{ "text-align": "justify" }}>
              I am a dedicated B.Tech student majoring in Information Technology
              at Government College of Engineering, Karad. Eager to learn
              cutting-edge technologies, I am passionate about applying my
              skills to solve real-world problems. With a strong commitment to
              innovation and problem-solving, I am driven to make a meaningful
              impact in the tech industry.
            </p>
            <div>
              <h4>Connect with me : </h4>
              <div className="row">
                <ul style={{ "list-style-type": "none" }}>
                  <li>
                    <Link className="m-4" to={"https://www.linkedin.com/feed/"}>
                      <button className=" m-2 btn btn-outline-primary">
                        <BsLinkedin /> {" - "}LinkedIn
                      </button>
                    </Link>
                    <Link className="m-4" to={"https://github.com/RohanM-12"}>
                      <button className=" m-2 btn btn-outline-primary">
                        <BsGithub /> {" - "}
                        GitHib
                      </button>
                    </Link>
                    <Link
                      className="m-4"
                      to={"mailto:RohanMali.2002@gmail.com"}
                    >
                      <button className="btn btn-outline-primary">
                        {" "}
                        <BsMailbox /> {" - "} Gmail
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" row">
              <h4>More Projects :</h4>
              <Link className="m-4" to={"http://tic-tac-toe-byrm.surge.sh/"}>
                <button className=" m-2 w-25  btn btn-outline-primary">
                  {" "}
                  <MdOutlineGrid3X3 /> TIC TAC TOE Game
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
