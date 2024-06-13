import "../../main.css";
import "maplibre-theme/dist/default.css";
import "maplibre-react-components/dist/mrc.css";
import { Map } from "maplibre-gl";
import "./styles.scss";
import { ChapterName, chapters } from "./chapters";

const $map = document.getElementById("map")!;

const map = new Map({
  container: $map,
  style:
    "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
  zoom: 0.3,
  center: [0, 20],
});

window.onscroll = function () {
  const chapterNames = Object.keys(chapters) as ChapterName[];
  for (let i = 0; i < chapterNames.length; i++) {
    const chapterName = chapterNames[i];
    if (isElementOnScreen(chapterName)) {
      setActiveChapter(chapterName);
      break;
    }
  }
};

let activeChapterName = "baker";
function setActiveChapter(chapterName: ChapterName) {
  if (chapterName === activeChapterName) return;

  const flyOptions = chapters[chapterName];

  map.flyTo(flyOptions);

  document.getElementById(chapterName)?.classList.add("active");
  document.getElementById(activeChapterName)?.classList.remove("active");

  activeChapterName = chapterName;
}

function isElementOnScreen(id: string) {
  const element = document.getElementById(id) as HTMLDivElement;
  const bounds = element.getBoundingClientRect();
  return (
    bounds.top >= -40 && bounds.top < window.innerHeight && bounds.bottom > 0
  );
}
