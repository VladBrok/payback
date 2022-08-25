import { useState, useEffect } from "react";

export default function useScrollBarWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const div = document.createElement("div");
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";

    document.body.appendChild(div);
    setWidth(div.offsetWidth - div.clientWidth);
    div.remove();
  }, []);

  return width;
}
