import { useState } from "react";

export default function useScrollDirection() {
  const [isScrolled, setIsScrolled] = useState<string>();
  if (typeof document !== "undefined") {
    var scrollableElement = document.body;

    scrollableElement.addEventListener("wheel", checkScrollDirection);
  }

  function checkScrollDirection(event: any) {
    if (checkScrollDirectionIsUp(event)) {
      setIsScrolled("up");
    } else {
      setIsScrolled("down");
    }
  }

  function checkScrollDirectionIsUp(event: any) {
    if (event.wheelDelta) {
      return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
  }

  return isScrolled;
}
