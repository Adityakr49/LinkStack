"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faArrowLeft, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import LogoutButton from "@/components/buttons/LogoutButton";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const path = usePathname();
  return (
    <nav className="inline-flex mx-auto flex-col text-center mt-8 gap-2 text-gray-500">
      <Link
        href={"/account"}
        className={
          "flex gap-4 p-2 " + (path === "/account" ? "text-blue-500" : "")
        }
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faFileLines}
          className={"w-6 h-6"}
        />
        <span>My Page</span>
      </Link>
      <Link
        href={"/analytics"}
        className={
          "flex gap-4 p-2 " + (path === "/analytics" ? "text-blue-500" : "")
        }
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faChartLine}
          className={"w-6 h-6"}
        />
        <span>Analytics</span>
      </Link>
      {/* <button type="button" className="flex gap-4">
                  <FontAwesomeIcon
                    fixedWidth={true}
                    icon={faRightFromBracket}
                    className={"w-6 h-6"}
                  />
                  <span className="text-gray-700">Logout</span>
                </button> */}
      <LogoutButton
        className={"flex gap-4 items-center text-gray-500 p-2"}
        iconLeft={true}
        iconClasses={"w-6 h-6"}
      />
      <Link
        href={"/"}
        className="flex items-center gap-2 text-xs text-gray-500 border-t pt-4"
      >
        <FontAwesomeIcon icon={faArrowLeft} className={"w-4 h-4"} />
        <span>Back to website</span>
      </Link>
    </nav>
  );
}
