import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { User } from "../../../typings";
import { fetchUsers } from "../../../utils/fetchUsers";

export interface Main {
  children: ReactNode;
  title: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export const CloseIconContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => false);

export const ContextUser = createContext<string>("");

const MainModal = ({ children, show, setShow, title }: Main) => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  const value = setShow;
  useEffect(() => {
    if (show) {
      var Body = document.getElementById("HTML");
      if (Body) Body.classList.add("overflowhidden");
    } else {
      var Body = document.getElementById("HTML");
      if (Body) Body.classList.remove("overflowhidden");
    }
  }, [show]);

  useEffect(() => {
    const getUsers = async () => {
      if (router.isReady) {
        const users = await fetchUsers();
        // console.log(users.allUser);

        setUsers(users.allUser);
      }
    };
    getUsers();
  }, []);

  const filtredUser = users?.filter(
    (user) => user.email === session?.user?.email
  );
  const userValue = filtredUser[0]?._id!;

  const modalContent = show ? (
    <>
      <div
        className="absolute top-0 left-0 flex items-center justify-center w-full h-full focused"
        id="focused"
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 100,
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            background: "white",
            width: "625px",
            maxHeight: "90%",
            overflowY: "scroll",
            borderRadius: "20px",
            border: "none",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
          className="scrollbar-hide"
        >
          <section className="flex items-center justify-between py-[20px] px-[40px] border-b-[#D1D1D1] border-b border-solid">
            <h2 className="not-italic font-semibold text-xl text-[#8C8A8A]">
              {title}
            </h2>
            <button onClick={() => setShow(false)}>
              <AiOutlineClose size={24} />
            </button>
          </section>
          <CloseIconContext.Provider value={value}>
            <ContextUser.Provider value={userValue}>
              <section style={{ padding: "20px 40px" }}>{children}</section>
            </ContextUser.Provider>
          </CloseIconContext.Provider>
        </div>
      </div>
    </>
  ) : null;

  return modalContent;
};

export default MainModal;
