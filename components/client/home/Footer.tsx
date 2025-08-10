import { LocationEditIcon, MapPinCheckIcon, Send } from "lucide-react";

export default function Footer() {
  return (
    <>
      <div className="w-full bg-[#D02B38] flex flex-wrap items-center justify-around py-12 ">
        <div>
          <h2 className="text-[22px] font-medium text-white">
            Subscribe Our Newsletter!
          </h2>
          <p className="text-[16px] font-normal text-gray-200">
            Subscribe our marketing platforms for latest updates
          </p>
        </div>

        <div className="flex items-center justify-center rounded-[40px] bg-gray-200/30 pr-2 ">
          <input
            type="text"
            placeholder="Enter your email"
            className=" px-2 lg:px-6 py-6 focus:outline-none placeholder-gray-300"
          />
          <button className="flex items-center gap-6 bg-gray-200 py-4 px-4 lg:px-10 text-gray-600 rounded-[30px]">
            <Send />
            Subscribe
          </button>
        </div>
      </div>
      <div className="w-full bg-black py-20">
        <div className="flex item-center justify-around text-gray-300">
          <div>
            <h1 className="text-gray-300 flex items-center gap-6 text-[18px]">
              <MapPinCheckIcon className="" />
              Restuarant SaaS
            </h1>
            <p>© 2025 Restuarant SaaS. Develop with </p>
          </div>
          <div className="text-gray-300">
            <div>
              <h1>Community</h1>
              <ul>
                <li>About ListingHub</li>
              </ul>
            </div>
          </div>
          <div>
            <h1>Get In Touch</h1>
            <div>
              <h3>
                <LocationEditIcon />
              </h3>
              <div>
                <p>ngraster 7, Greenhorst Los Angeles QTC564</p>
                <span>Reach Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
