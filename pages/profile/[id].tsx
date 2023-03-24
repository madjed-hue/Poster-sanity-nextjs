import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { WithContext as ReactTags } from "react-tag-input";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/router";
import { fetchSingleUser } from "../../utils/fetchSingleUser";
import Layout from "../../components/Layout/Layout";
import { Tag, User, UserBody } from "../../typings";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [skills, setSkills] = useState<Tag[]>([]);
  const [studyDegree, setStudyDegree] = useState("");
  const [diplomes, setDiplomes] = useState([{ diplome: "" }]);
  const [yearsOfExp, setYearsOfExp] = useState<number | string>("");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const progLang = ["ReactJS", "NodeJS", "NextJS", "Html", "CSS", "JavaScript"];
  const suggestions = progLang.map((lang) => {
    return {
      id: lang,
      text: lang,
    };
  });

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i: number) => {
    setSkills(skills.filter((skill, index) => index !== i));
  };
  // @ts-ignore
  function handleAddition(skill: Tag) {
    if (skills.length <= 8) {
      setSkills([...skills, skill]);
    } else {
      toast.error("Cannot add more than 8 skills");
    }
  }

  const handleDrag = (tag: any, currPos: number, newPos: number) => {
    // @ts-ignore
    const newSkill = tags.slice();

    newSkill.splice(currPos, 1);
    newSkill.splice(newPos, 0, tag);

    // re-render
    setSkills(newSkill);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  // handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list = [...diplomes];
    list[index].diplome = value;
    setDiplomes(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...diplomes];
    list.splice(index, 1);
    setDiplomes(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setDiplomes([...diplomes, { diplome: "" }]);
  };

  const postUser = async () => {
    const userBody: UserBody = {
      username: userName,
      email: email,
      profileImg:
        profileImg ||
        "https://media.istockphoto.com/id/1397556857/vector/avatar-13.jpg?s=612x612&w=0&k=20&c=n4kOY_OEVVIMkiCNOnFbCxM0yQBiKVea-ylQG62JErI=",
      skills: skills,
      diplomes: diplomes,
      studyDegree: studyDegree,
      yearsOfExp: yearsOfExp,
    };
    const refreshToast = toast.loading("Updating...");
    const result = await fetch(`/api/addUser`, {
      body: JSON.stringify(userBody),
      method: "POST",
    });
    const json = await result.json();
    toast.success("Profile Created.", {
      id: refreshToast,
    });
    router.push("/");
    return json;
  };

  const { id } = router.query;

  useEffect(() => {
    const getUserDetails = async () => {
      if (router.isReady) {
        const user = await fetchSingleUser(id);
        setUser(user.user[0]);
      }
    };
    getUserDetails();
  }, [id]);

  useEffect(() => {
    if (user) {
      setSkills(user?.skills!);
      setStudyDegree(user?.studyDegree!);
      setDiplomes(user?.diplomes!);
      setYearsOfExp(user?.yearsOfExp!);
    }
  }, [user]);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session?.user?.name || "");
      setEmail(session?.user?.email || "");
      setProfileImg(session?.user?.image || "");
    } else if (status === "unauthenticated") {
      router.push("/");
    }
  }, [session, status]);

  const handlePost = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    postUser();
    setSkills([]);
    setStudyDegree("");
    setDiplomes([{ diplome: "" }]);
    setYearsOfExp("");
  };

  return (
    <Layout>
      {!user?._id ? (
        <div className=" bg-white w-4/5 my-5 mx-auto py-4 px-6 rounded-xl justify-between">
          <form className="flex items-center" onSubmit={handlePost}>
            <div className="text-center w-4/12">
              <img
                src={
                  session?.user?.image ||
                  "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png"
                }
                alt="user-image"
                className="mx-auto rounded-full mb-2"
              />
              <div>
                <h3 className="mb-1">{session?.user?.name}</h3>
                <p className="mb-2">{session?.user?.email}</p>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white hover:opacity-90 transition-all duration-200 ease-in-out disabled:opacity-50"
                  disabled={!session}
                >
                  Update
                </button>
              </div>
            </div>
            <div className="middle w-3/5">
              <input
                type="text"
                placeholder="Degree"
                value={studyDegree}
                onChange={(e) => setStudyDegree(e.target.value)}
                className="w-full border-gray-400 border outline-none rounded-full py-2 px-4 mb-4 bg-gray-50"
              />
              <ReactTags
                tags={skills}
                suggestions={suggestions}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="top"
                autocomplete
                placeholder="Press enter to add new skill"
              />
              {diplomes.map((x, i) => {
                return (
                  <div className="flex items-center space-x-2 my-4" key={i}>
                    <input
                      type="text"
                      name={`dimplome${i + 1}`}
                      placeholder={`dimplome ${i + 1}..`}
                      value={x.diplome}
                      onChange={(e) => handleInputChange(e, i)}
                      className="w-full border-gray-400 border outline-none rounded-full py-2 px-4 bg-gray-50"
                    />

                    <div className="btn-box flex items-center space-x-2">
                      {diplomes.length !== 1 && (
                        <span
                          className="py-2 px-4 rounded-md border border-gray-50 bg-red-500 text-white cursor-pointer"
                          onClick={() => handleRemoveClick(i)}
                        >
                          <BsTrash />
                        </span>
                      )}
                      {diplomes.length - 1 === i && (
                        <button
                          onClick={handleAddClick}
                          className="py-2 px-4 rounded-md border border-gray-50 bg-blue-500 text-white disabled:opacity-50"
                          disabled={diplomes.length === 3}
                        >
                          <AiOutlinePlus />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              <input
                type="number"
                placeholder="Years of experience"
                value={yearsOfExp}
                onChange={(e) => setYearsOfExp(Number(e.target.value))}
                className="w-full border-gray-400 border outline-none rounded-full py-2 px-4 mb-4 bg-gray-50"
              />
            </div>
          </form>
        </div>
      ) : (
        <>
          {user && (
            <div className="w-11/12 md:w-3/4 bg-white p-8 mx-auto rounded-lg">
              <h2 className="text-center font-bold text-mainColor pb-4 mb-4 border-b border-b-gray-100">
                Profile of : {user.username}{" "}
              </h2>
              <div className="flex items-center flex-col md:flex-row ">
                <div className="w-full md:w-2/6 flex flex-col items-center justify-center mb-4 md:mb-0">
                  <img
                    src={user.profileImg!}
                    alt={user.username!}
                    className="rounded-full mb-2 mx-0"
                  />
                  <h4 className="text-gray-600 font-bold text-lg">
                    {user.username}
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold">
                    {" "}
                    ℗{user.username?.replace(/\s+/g, "").toLowerCase()}{" "}
                  </p>
                </div>
                <div className="w-full md:w-3/5">
                  <div className="flex space-x-2 mb-2">
                    <p className="font-semibold">Degree:</p>
                    <p> {user.studyDegree} </p>
                  </div>
                  <div className="flex space-x-2 mb-2">
                    <p className="font-semibold">Email:</p>
                    <p> {user.email} </p>
                  </div>

                  {user.diplomes && (
                    <div className="flex space-x-2 mb-2">
                      <p className="font-semibold">Deplomes: </p>
                      <div className="flex space-x-2">
                        {user.diplomes.map(({ diplome }) => (
                          <p key={diplome}> {diplome} </p>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex space-x-2 mb-2">
                    <p className="font-semibold">Experience: </p>
                    <p> {user.yearsOfExp} years</p>
                  </div>
                  {user.skills && (
                    <div className="flex space-x-2">
                      <p className="font-semibold">Skills: </p>
                      <div className="flex space-x-2 flex-wrap">
                        {user.skills.map(({ text, id }) => (
                          <p key={id}> {text} </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default UserProfile;
