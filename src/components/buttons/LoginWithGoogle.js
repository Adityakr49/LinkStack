"use client";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";

export default function LoginWithGoogle() {
  return (
    <button
      className="bg-white shadow text-center w-full py-4 flex gap-3 justify-center items-center"
      onClick={() =>
        signIn("google")
      }
    >
      <FontAwesomeIcon icon={faGoogle} className="h-8" />
      <span>Sign In with Google</span>
    </button>
  );
}
