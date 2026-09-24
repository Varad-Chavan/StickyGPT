"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const INTRO_STORAGE_KEY = "white-flower-intro-seen";

const scenes = [
  { image: "/scene-01-return.png", number: "01", title: "The start", line: "A Victorious King" },
  { image: "/scene-02-tree.png", number: "02", title: "Return to...", line: "A mysterious tree waiting for him in the way" },
  { image: "/scene-03-offering.png", number: "03", title: "The lively flower", line: "A single flower rested on the branch." },
  { image: "/scene-04-taken.png", number: "04", title: "Return to the Palace", line: "He took it with him." },
  { image: "/scene-05-queen.png", number: "05", title: "The queen", line: "He gave her the flower." },
  { image: "/scene-06-ear.png", number: "06", title: "A quiet gesture", line: "She placed it above his ear." },
  { image: "/scene-07-release.png", number: "07", title: "Unburdened", line: "The weight fell away." },
  { image: "/scene-08-utopia.png", number: "08", title: "Utopia", line: "A state of bliss." },
  { image: "/scene-09-wilted.png", number: "09", title: "Back to Reality", line: "The flower had lost its vibrancy." },
  { image: "/scene-10-chest.png", number: "10", title: "The Burial", line: "He kept what had died." },
];

const endingScenes = [
  { image: "/scene-11-realization.png", number: "11", title: "The realization", line: "He Realized The Loop" },
  { image: "/scene-12-dead-flower.png", number: "12", title: "The dead flower", line: "Its fading body told the truth." },
  { image: "/scene-13-true.png", number: "13", title: "....", line: "..........." },
  { image: "/scene-14-end.png", number: "14", title: "The end", line: "................" },
];

const loopCards = ["/loop-01-tree.png", "/loop-02-ear.png", "/loop-03-utopia.png", "/scene-10-chest.png"];

function StoryScene({ scene }: { scene: (typeof scenes)[number] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.8]);

  return (
    <motion.section
      ref={ref}
      className="scene"
      style={{
        backgroundImage: `url(${scene.image})`,
        y,
        scale,
        opacity,
      }}
    >
      <div className="sceneCopy">
        <span>{scene.number}</span>
        <h1>{scene.title}</h1>
        <p>{scene.line}</p>
      </div>
    </motion.section>
  );
}

export default function Story() {
  const [introState, setIntroState] = useState<"checking" | "open" | "closed">("checking");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(INTRO_STORAGE_KEY)) {
      setIntroState("open");
      document.body.classList.add("introIsOpen");
    } else {
      setIntroState("closed");
    }

    return () => document.body.classList.remove("introIsOpen");
  }, []);

  function enterStory() {
    window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
    setIsClosing(true);
    window.setTimeout(() => {
      document.body.classList.remove("introIsOpen");
      setIntroState("closed");
    }, 800);
  }

  return <main className={`story ${introState === "checking" ? "storyLoading" : ""}`}>
    {introState === "open" && <motion.div
      className="introOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      initial={{ opacity: 1 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: isClosing ? 0.8 : 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="confettiBurst confettiBurstLeft" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => <span key={index} />)}
      </div>
      <div className="confettiBurst confettiBurstRight" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => <span key={index} />)}
      </div>
      <div className="introFrame">
        <div className="introMark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="introKicker">An Experience</p>
        <h1 id="intro-title">Happy Birthday <em>Name</em></h1>
        <p className="introNote">Click on Enter to unravel the story.</p>
        <button className="introButton" type="button" onClick={enterStory}>
          <span>Enter the story</span>
          <span aria-hidden="true">&#8594;</span>
        </button>
        <p className="introMeta">THE WHITE FLOWER <span>·</span> 2026</p>
      </div>
    </motion.div>}
    {introState !== "checking" && <>
      {scenes.map((scene) => <StoryScene scene={scene} key={scene.number} />)}
      <section className="loopScene">
      <div className="loopHeading"><span>11</span><h1>And Begins the Cycle</h1><br/><p>Puck The Flower ·Placed On Ear ·Attained The Bliss  ·Burial To Chest</p></div>
      <div className="loopWindow" aria-label="The king repeats the cycle">
        <div className="loopTrack">
          {[...loopCards, ...loopCards].map((image, index) => <img src={image} alt="" className="loopCard" key={`${image}-${index}`} />)}
        </div>
      </div>
      </section>
      {endingScenes.map((scene) => <StoryScene scene={scene} key={scene.number} />)}
      <section className="storyTime" aria-label="Time in the story">
        <div className="timeBlock">
          <h1>😊</h1>
          <h1>Happy Birthday Once Again</h1>
          <p>Made by Varad Chavan with ❤️</p>
        </div>
      </section>
    </>}
  </main>;
}
