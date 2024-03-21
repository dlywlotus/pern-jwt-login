import { useEffect, useState } from "react";

type userInfo = {
  user_id: string;
  user_name: string;
  user_password: string;
};

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState<userInfo>({
    user_id: "",
    user_name: "",
    user_password: "",
  });

  useEffect(() => {
    let ignore = false;

    async function getDashBoardData() {
      try {
        const res = await fetch("http://localhost:5000/dashboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (ignore) return;
        if (!res.ok) throw new Error(data);
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    }

    getDashBoardData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className='dashboard'>
      <div className='space-between'>
        <div className='key'>Username</div>
        <div className='value'>{userInfo.user_name}</div>
      </div>
      <div className='space-between'>
        <div className='key'>User id</div>
        <div className='value'>{userInfo.user_id}</div>
      </div>
    </div>
  );
}
