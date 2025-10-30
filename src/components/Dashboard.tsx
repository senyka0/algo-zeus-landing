import Image from "next/image";
import { DataProps } from "@/global";

export default function Dashboard({ data = [] }: DataProps) {
  if (!data || data.length < 2) {
    return null;
  }
  const total_return =
    (data[data.length - 1]["Performance"] / data[0]["Performance"] - 1) * 100;
  const returns = data
    .map((item, index, arr) => {
      if (index != 0) {
        return item["Performance"] / arr[index - 1]["Performance"] - 1;
      }
    })
    .filter((x) => x !== undefined);
  const dates = data.length;
  const avg =
    (returns.reduce((a, b) => (a || 0) + (b || 0), 0) || 0) / returns.length;
  const std_dev = Math.sqrt(
    returns.map((x) => Math.pow((x || 0) - avg, 2)).reduce((a, b) => a + b) /
      returns.length
  );
  const sharpe = (avg / std_dev) * Math.sqrt(365.25);

  return (
    <div className="flex justify-center items-center mt-[80px]">
      <div className="animated-border-box-glow w-[345px] h-[235px] md:w-[755px] md:h-[515px] lg:w-[1000px] lg:h-[686px] xl:w-[1268px] xl:h-[869px]"></div>
      <div className="relative rounded-[39px] w-[355px] h-[245px] md:w-[755px] md:h-[515px] lg:w-[1000px] lg:h-[686px] xl:w-[1268px] xl:h-[869px]">
        <div className="z-10 w-full h-full">
          <Image
            className="border-[1px] border-[#4A4A61] rounded-[39px] object-cover object-center w-full h-full"
            src="/hedge-fund-landing/portfolio.svg"
            alt="Portfolio"
            layout="fill"
            priority
          />
        </div>
        <div className="absolute left-0 top-0 w-full h-full flex items-center">
          <div className="absolute bottom-28 w-full h-[200px] md:w-[800px] md:h-[600px] md:left-[-100px] md:bottom-[-100px] lg:w-[1000px] lg:h-[700px] xl:w-[1140px] xl:h-[750px] lg:left-[-140px] lg:bottom-[-100px] bg-[#111121] blur-[25px] md:blur-[70px]"></div>
          <div className="ml-[10px] md:mt-[25px] xl:mt-[150px] flex items-start justify-center flex-col gap-[16px] z-10">
            <p className="text-[28px] leading-[38px] font-[600] lg:text-[56px] lg:leading-[76px] text-[#F3F3F4]">
              Outperform web3 markets with algorithmic multi-strategy portfolios
            </p>
            <div className="flex flex-row items-start gap-[12px]">
              <div className="bg-[#1b1b2f] rounded-[20px] flex flex-col items-start justify-normal gap-[4px] px-[20px] py-[12px] hover:shadow-[0_0_10px_10px_rgba(27,27,47,0.6)] transition-shadow duration-500 ease-in border-[1px] border-[#4A4A61]">
                <p className="text-[20px] leading-[27px] lg:text-[28px] font-[600] lg:leading-[38px] text-[#BDF5BC]">
                  {total_return.toFixed(2)}%
                </p>
                <p className="text-[14px] leading-[19px] lg:text-[20px] font-[400] lg:leading-[27px] text-[#F3F3F4]">
                  in {dates} days
                </p>
              </div>
              <div className=" bg-[#1b1b2f] rounded-[20px] flex flex-col items-start justify-normal gap-[4px] px-[20px] py-[12px] hover:shadow-[0_0_10px_10px_rgba(27,27,47,0.6)] transition-shadow duration-500 ease-in border-[1px] border-[#4A4A61]">
                <p className="text-[20px] leading-[27px] lg:text-[28px] font-[600px] lg:leading-[38px] text-[#BDF5BC]">
                  {sharpe.toFixed(2)}
                </p>
                <p className="ext-[14px] leading-[19px] lg:text-[20px] font-[400px] lg:leading-[27px] text-[#F3F3F4]">
                  Sharpe
                </p>
              </div>
            </div>
            <a
              href="https://app.enzyme.finance/vault/0x76a92d05ce8f5346de5851ccf0ced82af0f4c8ba"
              target="_blank"
            >
              <button className="bg-gradient-radial from-[#648CF5] to-[#2766E1] rounded-[39px] h-[64px] w-[300px] lg:w-[260px] text-[18px] text-white hover:shadow-[0_0_10px_10px_rgba(74,97,218,0.15)] transition-shadow duration-500 ease-in">
                See Demo
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
