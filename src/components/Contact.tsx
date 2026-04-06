"use client";
import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import CustomAlert from "@/components/Alert";
import CustomError from "@/components/Error";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendClick = async () => {
    if (!email) {
      setAlertVisible(false);
      setMessage("Please enter an email address.");
      setErrorVisible(true);
      return;
    }
    if (!isValidEmail(email)) {
      setAlertVisible(false);
      setMessage("Please enter a valid email address.");
      setErrorVisible(true);
      return;
    }
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const res = await response.json();
    if (res.status === 200) {
      setErrorVisible(false);
      setMessage(res.message);
      setAlertVisible(true);
      setEmail("");
    } else {
      setAlertVisible(false);
      setMessage(res.error);
      setErrorVisible(true);
    }
  };

  useEffect(() => {
    (async function () {
      const Cal = await getCalApi();
      Cal("ui", {});
    })();
  }, []);
  return (
    <div>
      {alertVisible && (
        <CustomAlert message={message} onClose={() => setAlertVisible(false)} />
      )}
      {errorVisible && (
        <CustomError message={message} onClose={() => setErrorVisible(false)} />
      )}
      <div
        className="mb-[250px] mt-[200px] h-full flex justify-center items-center"
        style={{
          backgroundImage: "url(/background.svg)",
          backgroundSize: "cover",
        }}
      >
        <div className="flex justify-center items-center flex-col xl:flex-row xl:mt-0">
          <div className="relative flex justify-center items-center xl:mr-[30px]">
            <div className="absolute flex flex-col justify-center items-center gap-[32px] z-10 mt-[30px]">
              <p className="text-[48px] leading-[56px] text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-[#9AA2B8]">
                Let’s Talk
              </p>
              <div className="flex flex-col justify-center items-center gap-[16px]">
                <input
                  type="email"
                  id="UserEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="pl-[20px] mt-1 w-full h-[64px] rounded-[39px] border-[1px] border-[#4A4A61] bg-[#28283E] text-white shadow-sm font-[500px] text-[18px] hover:border-[#C1CAFE] hover:shadow-[0_0_4px_4px_rgba(88,114,251,0.15)]"
                />
                <button
                  onClick={handleSendClick}
                  className="bg-gradient-radial from-[#648CF5] to-[#2766E1] rounded-[39px] h-[64px] w-[320px] md:w-[382px] text-[24px] text-white hover:shadow-[0_0_10px_10px_rgba(74,97,218,0.15)] transition-shadow duration-500 ease-in"
                >
                  Send me updates
                </button>
              </div>
            </div>
            <div className="relative w-[320px] md:w-[390px] h-[345px] lg:w-[470px] lg:h-[400px]">
              <div className="absolute left-[82%] right-[-40%] top-[6.25%] bottom-[26.08%] bg-[#F158E2] filter blur-[150px] left-gradient"></div>
              <div className="absolute left-[9%] right-[22%] top-[14.25%] bottom-[14.5%] bg-[#1920C1] filter blur-[150px]"></div>
              <div className="absolute left-[-20%] right-[72%] top-[29.25%] bottom-[26.5%] bg-[#FFCE52] filter blur-[150px] right-gradient"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-[#DCDCDF] pb-[16px]">
        <p>© 2024 Algozeus | All Rights Reserved</p>
      </div>
    </div>
  );
}
