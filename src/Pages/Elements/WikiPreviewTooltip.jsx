import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const WikiPreviewTooltip = ({ title }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!show) return;

    const fetchWiki = async () => {
      try {
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            title
          )}`
        );
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.log("Wiki fetch error", e);
      }
    };

    fetchWiki();
  }, [show, title]);

  const handleEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPos({ x: rect.left, y: rect.bottom + 8 });
    setShow(true);
  };

  const handleLeave = () => setShow(false);

  return (
    <>
      <span
        className="cursor-pointer underline decoration-dotted text-[#3F2978]"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {title}
      </span>

      {show &&
        data &&
        createPortal(
          <div
            className="fixed z-9999 w-72 bg-[#faf8ff] shadow-xl border border-gray-200 rounded-xl p-3 text-sm"
            style={{
              top: pos.y,
              left: pos.x,
            }}
          >
            {data.thumbnail && (
              <img
                src={data.thumbnail.source}
                alt={title}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
            )}

            <h3 className="font-semibold text-[#3F2978] mb-1">{data.title}</h3>

            <p className="text-gray-700 line-clamp-4">
              {data.extract || "No info available."}
            </p>
          </div>,
          document.body
        )}
    </>
  );
};

export default WikiPreviewTooltip;
