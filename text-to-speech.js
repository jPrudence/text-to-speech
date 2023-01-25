document.addEventListener("DOMContentLoaded", function () {
  if (!("speechSynthesis" in window)) {
    handleUnsupportedBrowser();
  } else {
    const btnSpeech = document.querySelectorAll(".btn-speech"); // All buttons that trigger the speech
    const synth = window.speechSynthesis; // SpeechSynthesis object

    btnSpeech.forEach((button) => {
      // when the action button of the content being played is clicked, the reading stops
      button.addEventListener("click", () => {
        synth.cancel();

        if (button.querySelector("i").classList.contains("fa-stop")) {
          setButtonIconToPlay(button); // Set clicked button icon to play
          return; // Stop the function
        }

        resetAllSpeechButtonIcons(); // Reset all other buttons to play
        setButtonIconToStop(button); // Set clicked button icon to stop

        const parent = button.parentNode.parentNode.cloneNode(true); // Clone the parent of the content to read to avoid modifying the original content
        const text = parent.textContent; // Get content text to read
        const msg = new SpeechSynthesisUtterance(replaceWords(text)); // Replace words and create a new SpeechSynthesisUtterance object

        msg.lang = "fr-FR"; // Set language to French
        msg.rate = 1.2; // Set speed to 1.2
        msg.onend = () => {
          setButtonIconToPlay(button);
        };

        synth.speak(msg); // Start reading
      });
    });
  }
});

/*
    Cause: Some words are mispronounced by the text-to-speech, so they need to be replaced with other words that sound better.
    I considered text-to-speech on desktop only, mobile devices do not have the same pronunciation and there may also be other pronunciation issues when using text-to-speech on mobile.
*/
const wordsToReplace = [
  { find: "malagasy", replace: "malgache" },
  { find: "/", replace: ", " },
  { find: ".js", replace: "JS" },
  { find: "ERP", replace: "E-R-P" },
  { find: "2k", replace: "20" },
  { find: "1HoIray", replace: "Iraï Hou Iraï" },
  { find: "backend", replace: "back-end" },
  { find: "frontend", replace: "fronte-end" },
  { find: "Nanisana", replace: "Nanissana" },
  { find: "Faravohitra", replace: "Faravouhitra" },
  // ...
];

function replaceWords(text) {
  text = text
    .replace(/\t/g, "") // Remove tabs
    .replace(/\n\n/g, "\n") // Remove double line breaks
    .replace(/\n\n/g, "\n") // delete white lines
    .replace(/([^\.\?\!])\n/g, "$1.\n") // if end of each line is not a dot, add a dot
    .trim(); // Remove spaces at the beginning and end of the string;

  // Loop through the array of objects and replace the words.
  wordsToReplace.forEach((word) => {
    text = text.replace(
      new RegExp(word.find.replace(`.`, `\\.`), "gi"),
      word.replace
    );
  });

  return text;
}

function setButtonIconToStop(button) {
  setTimeout(() => {
    button.classList.add("reading");
    button.querySelector("i").classList.remove("fa-circle-play");
    button.querySelector("i").classList.add("fa-stop");
  }, 200);
}

function setButtonIconToPlay(button) {
  button.classList.remove("reading");
  button.querySelector("i").classList.remove("fa-stop");
  button.querySelector("i").classList.add("fa-circle-play");
}

function resetAllSpeechButtonIcons() {
  const btnSpeech = document.querySelectorAll(".btn-speech");
  btnSpeech.forEach((button) => {
    setButtonIconToPlay(button);
  });
}

function handleUnsupportedBrowser() {
  console.log("La synthèse vocale n'est pas prise en charge par ce navigateur");

  const btnSpeech = document.querySelectorAll(".btn-speech");
  btnSpeech.forEach((button) => {
    button.remove(); // Remove all buttons that trigger the speech if the browser does not support it
  });
}
