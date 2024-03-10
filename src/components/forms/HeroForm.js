"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function HeroForm({ user }) {
  const router = useRouter();
  // useEffect(() => {
  //   if (
  //     "localStorage" in window &&
  //     window.localStorage.getItem("desiredUsername")
  //   ) {
  //     const username = window.localStorage.getItem("desiredUsername");
  //     window.localStorage.removeItem("desiredUsername");
  //     redirect("/account?desiredUsername=" + username);
  //   }
  // }, []);
  async function HandleSubmit(ev) {
    ev.preventDefault();
    const form = ev.target;
    const input = form.querySelector("input");
    const username = input.value;
    if (username.length > 0) {
      // window.localStorage.setItem("desiredUsername", username);
      if (user) {
        router.push("/account?desiredUsername=" + username);
      } else {
        await signIn("google", {
          callbackUrl: `/account?desiredUsername=${username}`,
        });
      }
    }
  }
  return (
    <form
      onSubmit={HandleSubmit}
      className="inline-flex items-center shadow-lg shadow-gray-700/20 bg-white"
    >
      <span className="bg-white py-4 pl-4">linklist.to/</span>
      <input
        type="text"
        className="py-4"
        style={{ backgroundColor: "white", marginBottom: 0, paddingLeft: 0 }}
        placeholder="username"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-4 px-6 whitespace-nowrap"
      >
        Join for free
      </button>
    </form>
  );
}

//one way to grab input is to use useState then in input tag
// value={username} onChange={(ev)=>setUsername(ev.target.value)}
