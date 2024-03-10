"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// because form with action

import SectionBox from "../layout/SectionBox";
import {
  faCloudArrowDown,
  faCloudArrowUp,
  faGripLines,
  faLink,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { upload } from "@/libs/upload";
import Image from "next/image";
import { savePageLinks } from "@/app/actions/pageAction";
import toast from "react-hot-toast";

export default function PageLinksForm({ page, user }) {
  const [links, setLinks] = useState(page.links || []);
  function save() {
    savePageLinks(links);
    toast.success("Saved");
  }
  function addNewLink(link) {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  }
  function handleUpload(ev, linkKeyForUpload) {
    upload(ev, (uploadedImageUrl) => {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link, index) => {
          if (link.key === linkKeyForUpload) {
            link.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  }
  function handleLinkChange(keyOfLinkToChange, prop, ev) {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return [...prev];
    });
  }
  function removeLink(linkKeyToRemove) {
    setLinks((prevLinks) =>
      [...prevLinks].filter((l) => l.key !== linkKeyToRemove)
    );
    toast.success("The link has been removed");
  }
  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer"
        >
          <FontAwesomeIcon
            className="bg-blue-500 text-white p-1 rounded-full aspect-square"
            icon={faPlus}
          />
          <span>Add new</span>
        </button>
        <div>
          <ReactSortable handle={".handle"} list={links} setList={setLinks}>
            {links.map((l) => (
              <div key={l.key} className="mt-8 md:flex gap-6 items-center">
                <div className="handle">
                  <FontAwesomeIcon
                    className="text-gray-500 mr-2 cursor-grab"
                    icon={faGripLines}
                  />
                </div>
                <div className="text-center">
                  <div className="bg-gray-300 inline-block relative aspect-square overflow-hidden w-16 h-16 inline-flex justify-center items-center">
                    {l.icon && (
                      <Image
                        className="w-full h-full object-cover"
                        src={l.icon}
                        alt={"icon"}
                        width={64}
                        height={64}
                      />
                    )}
                    {!l.icon && <FontAwesomeIcon size="xl" icon={faLink} />}
                  </div>
                  <div>
                    <input
                      onChange={(ev) => handleUpload(ev, l.key)}
                      id={"icon" + l.key}
                      type="file"
                      className="hidden"
                    />
                    <label
                      htmlFor={"icon" + l.key}
                      className="border mt-2 p-2 flex items-center gap-1 rounded-md text-gray-600 cursor-pointer mb-2 justify-center"
                    >
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                      <span>Change icon</span>
                    </label>
                    <button
                      onClick={() => removeLink(l.key)}
                      type="button"
                      className="w-full bg-gray-300 py-2 px-3 mb-2 h-full flex gap-1 items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Remove this link</span>
                    </button>
                  </div>
                </div>
                <div className="grow">
                  {/* controlled input here everything else is uncontrolled */}
                  {/* it was observed during leaning that for is submitted using states not formData */}
                  <label className={"input-label"}>Title:</label>
                  <input
                    value={l.title}
                    onChange={(ev) => handleLinkChange(l.key, "title", ev)}
                    type="text"
                    placeholder="title"
                  />
                  <label className={"input-label"}>Subtitle:</label>
                  <input
                    value={l.subtitle}
                    onChange={(ev) => handleLinkChange(l.key, "subtitle", ev)}
                    type="text"
                    placeholder="subtitle (optional)"
                  />
                  <label className={"input-label"}>URL:</label>
                  <input
                    value={l.url}
                    onChange={(ev) => handleLinkChange(l.key, "url", ev)}
                    type="text"
                    placeholder="url"
                  />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="border-t pt-4 mt-4 max-w-xs mx-auto">
          <SubmitButton className="max-w-xs mx-auto">
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
