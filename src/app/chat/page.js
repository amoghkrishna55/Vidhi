"use client";

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import Response from "../components/Response";
import Image from "next/image";
import logo from "../../assets/images/vidhi.png";
import report from "../../assets/images/report.png";
import thumb_up from "../../assets/images/thumb_up.png";
import logout from "../../assets/images/logout.png";
import PreResponse from "../components/PreResponse";
import { useRouter } from "next/navigation";
import GeneratingLoader from "../components/GeneratingLoader";

const Chat = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [reference, setReference] = useState([]);
  const chatDisplayRef = useRef(null);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    report: false,
    like: false,
  });

  const validateUser = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data.success);
      if (!response.data.success) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      validateUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [response]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    console.log("Input : ", input);
    setResponse((prevResponse) => [
      ...prevResponse,
      { message: input, role: "You" },
    ]);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/chat", { msg: input });
      console.log(response);
      setResponse((prevResponse) => [
        ...prevResponse,
        { message: response.data.content, role: "Crime-Bot" },
      ]);
      response.data.reference && response.data.reference.length > 0
        ? setReference(response.data.reference)
        : setReference(null);
      setInput("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async ({ type }) => {
    try {
      setFeedback({ report: type === "report", like: type === "like" });
      const responseFeedback = await axios.post("/api/users/report", {
        type: type,
        response: response,
      });
      console.log(responseFeedback);
    } catch (error) {
      console.log(error);
    } finally {
      setFeedback({
        report: false,
        like: false,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleClickLoadQues = (query) => {
    setInput(query);
    let enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
    handleKeyDown(enterEvent);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("success logout ", response.data.success);
      if (response.data.success) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-[100vw] h-[100vh] overflow-x-hidden bg-[#1E1E1E]">
      <div className="w-[20%] h-[90%] border-r-2 border-[#4a4a4a] px-2 py-2 flex items-center flex-col">
        <div className="w-[100%] h-[8%] flex justify-evenly items-center">
          <div
            className="w-[48%] h-[90%] border border-slate-600 rounded-3xl flex justify-center items-center gap-2 cursor-pointer"
            onClick={() => handleFeedback({ type: "report" })}
          >
            {feedback.report ? (
              "Reporting..."
            ) : (
              <>
                <Image src={report} alt="Report image" width={20} height={20} />

                <span className="text-[#F8F8F8] text-[12px]">
                  Report content
                </span>
              </>
            )}
          </div>
          <div
            className="w-[48%] h-[90%] border border-slate-600 rounded-3xl flex justify-center items-center gap-2 my-1 cursor-pointer"
            onClick={() => handleFeedback({ type: "like" })}
          >
            {feedback.like ? (
              "Liking..."
            ) : (
              <>
                <Image
                  src={thumb_up}
                  alt="Thumb up image"
                  width={20}
                  height={20}
                />

                <span className="text-[#F8F8F8] text-[12px]">Thumbs Up</span>
              </>
            )}
          </div>
        </div>

        <div
          className="w-[90%] h-[7%] border border-slate-600 rounded-3xl flex justify-center items-center gap-2 my-1 cursor-pointer"
          onClick={() => handleLogout()}
        >
          <Image src={logout} alt="Log out image" width={20} height={20} />

          <span className="font-bold text-[#F8F8F8]">Log out</span>
        </div>

        <div className="w-[100%] h-[2px] bg-[#2d2d2d] mt-2"></div>
        <div className=" w-[100%] h-[100%] overflow-auto rounded-md px-2 py-4">
          <h2 className="font-bold text-lg text-[#F8F8F8]">Disclaimer</h2>
          <br />
          <ul className="text-sm text-[#ababab] ">
            <li>
              This information is for general knowledge purposes only and does
              not constitute legal advice. It is recommended to consult a
              qualified lawyer for specific legal guidance and representation.
            </li>
            <br />
            <li>
              Laws and regulations vary by jurisdiction, and legal outcomes can
              differ based on individual circumstances. Therefore, it is
              important to seek the advice of a qualified lawyer tailored to
              your situation.
            </li>
            <br />
          </ul>
        </div>
      </div>
      <div className="w-[80%] h-[90%] fixed top-0 right-0 overflow-auto">
        <div className=" flex flex-col items-center" ref={chatDisplayRef}>
          {response && response.length > 0 ? (
            response.map((item, index) => (
              <Response
                role={item.role}
                message={item.message}
                loading={loading}
                reference={reference ? reference : null}
                isCurrentLoading={index === response.length - 1}
              />
            ))
          ) : (
            <PreResponse handleClickLoad={handleClickLoadQues} />
          )}
        </div>
      </div>

      <div className="w-[18%] h-[10%] fixed left-0 bottom-0">
        <Image className="w-[100%] h-[100%]" src={logo} alt="logo" />
      </div>
      <div className="w-[80%] fixed bottom-0 right-0 h-[10%] flex justify-center items-center">
        <div className="w-[70%] h-[2.8rem] rounded-3xl flex justify-center items-center px-2 border border-slate-500 bg-[#323232]">
          <input
            className="rounded-3xl h-[100%] w-[96%] px-2 border-none outline-none bg-[#323232] text-[#F8F8F8]"
            type="text"
            placeholder="Type your legal question..."
            value={input}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInput(e.target.value)}
          />
          <span
            className="text-3xl cursor-pointer text-[#F8F8F8]"
            onClick={handleSubmit}
          >
            {loading ? <GeneratingLoader /> : <IoIosSend />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
