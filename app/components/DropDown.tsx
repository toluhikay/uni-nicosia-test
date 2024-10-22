import { useAuthStore } from "@/lib/store/useAuthStore";
import React from "react";
import { FaPowerOff } from "react-icons/fa6";

const DropDown = ({ displayState, setDisplayState }: { displayState: boolean; setDisplayState: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { user, logout } = useAuthStore();

  return (
    <div
      className={`absolute lg:w-[20rem] md:w-[50vw] sm:w-[80vw] w-[90vw] z-[99] transition-all  top-[120%] ${displayState ? "h-auto p-3 py-[2rem]" : "h-0"} overflow-hidden shadow-md right-0 bg-gray-800 flex flex-col justify-center items-center rounded-2xl  gap-y-[1rem]`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="text-center">
        <p className="text-sm font-semibold">{user?.fullName}</p>
        <p className="lowercase font-normal text-sm">{user?.email?.toLowerCase()}</p>
      </div>
      <div className="w-full">
        {/* <Link to={RouterEnum.MY_PROFILE}>
          <p
            className="p-2 border-b-[.5px] border-primary-1/30 capitalize font-normal hover:bg-primary-1/30"
            onClick={() => {
              setDisplayState(false);
            }}
          >
            My Profile
          </p>
        </Link> */}
        <p
          className="p-2 flex items-center gap-[.25rem] capitalize text-red-700 cursor-pointer hover:bg-red-100"
          onClick={() => {
            logout();
          }}
        >
          Sign Out <FaPowerOff />
        </p>
      </div>{" "}
    </div>
  );
};

export default DropDown;
