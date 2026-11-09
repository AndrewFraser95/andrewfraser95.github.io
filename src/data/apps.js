// Add a new item to the home page by adding an entry here.
//   type:   "christmas" | "web" | "mobile" | "escape"  (see TYPES)
//   href:   a route inside this site, or a path/URL that is a separate site
//   router: true when href is a route handled by this React app
export const TYPES = {
  christmas: { label: "Christmas game", filter: "Christmas" },
  web: { label: "Web app", filter: "Web apps" },
  mobile: { label: "Mobile app", filter: "Mobile apps" },
  escape: { label: "Escape room", filter: "Escape rooms" },
};

export const APPS = [
  {
    id: "intro-round",
    name: "Intro Round",
    type: "christmas",
    description:
      "Name that tune. The phone plays a few seconds of a song, picked for your age group. Christmas songs, hits through the decades, or your own list.",
    href: "/intro-round/",
    cta: "Play",
  },
  {
    id: "the-hat",
    name: "The Hat",
    type: "christmas",
    description:
      "Everyone writes cards and drops them in the hat. Three rounds with the same cards: describe it, one word, then charades. Pass the phone around.",
    href: "/the-hat/",
    cta: "Play",
  },
  {
    id: "draw-pass",
    name: "Draw and Pass",
    type: "christmas",
    description:
      "Draw the word, pass the phone, guess the picture, draw the guess. Watch how far it drifts, then save the whole chain as a picture.",
    href: "/draw-pass/",
    cta: "Play",
  },
  {
    id: "photobooth",
    name: "Photobooth",
    type: "web",
    description:
      "Set your own event text, choose 3 or 4 photos and let guests save their strip to their phone. Nothing to install.",
    href: "/photobooth/",
    cta: "Open",
  },
  {
    id: "calibir",
    name: "CaliBir",
    type: "mobile",
    description:
      "Birthday reminders, events and groups for the people you actually know. No ads, no algorithms.",
    href: "/CaliBir",
    router: true,
    cta: "Details",
  },
  {
    id: "forehead",
    name: "Forehead",
    type: "web",
    description:
      "Hold the phone to your forehead while everyone else acts out the word. Celebrities, animals or your own list. Tilt to score.",
    href: "/forehead/",
    cta: "Open",
  },
  {
    id: "corner-pot",
    name: "Corner Pot",
    type: "web",
    description:
      "A football pub game. Every corner, everyone puts in a stake and the token moves on. Whoever holds it at full time takes the pot.",
    href: "/corner-pot/",
    cta: "Open",
  },
  {
    id: "escape-rooms",
    name: "Escape rooms",
    type: "escape",
    description:
      "Six puzzle rooms to play in your browser, each with its own theme.",
    href: "/EscapeRooms",
    router: true,
    cta: "Browse rooms",
  },
];

// Each room is its own site, served at andrewfraser.com/<path>/
export const ESCAPE_ROOMS = [
  {
    id: "escape-room",
    name: "Curve",
    description:
      "Your aim is simple: escape. You will need all of your technical and puzzle-solving nous.",
    href: "/escape-room/",
  },
  {
    id: "escape-room-2",
    name: "Royal Palace",
    description:
      "Four puzzles involving hidden codes, mysterious images, audio secrets and royal seals.",
    href: "/escape-room-2/",
  },
  {
    id: "escape-room-3",
    name: "Christmas",
    description:
      "Slide puzzles, movie titles, spot the difference and name that Christmas song.",
    href: "/escape-room-3/",
  },
  {
    id: "escape-room-4",
    name: "Easter",
    description: "An Easter-themed escape room.",
    href: "/escape-room-4/",
  },
  {
    id: "escape-room-5",
    name: "Escape the Matrix",
    description: "A Matrix-themed escape room.",
    href: "/escape-room-5/",
  },
  {
    id: "escape-room-6",
    name: "The Study",
    description: "A spooky escape room set in a study.",
    href: "/escape-room-6/",
  },
];
