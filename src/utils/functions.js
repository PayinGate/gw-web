import { toast } from "react-toastify";

function isEmptyString(str) {
    // Trim the string to remove leading and trailing spaces
    const trimmedStr = str.trim();
    // Check if the trimmed string is empty
    return trimmedStr === '';
}

const isValidEmail = (email) => {
    return String(email).trim()
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

function isEmpty(data){
    return data.length === 0;
}



function copyToClipboard(text) {
  if (!navigator.clipboard) {
      // Clipboard API not supported, fallback to execCommand method
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.value = text;
      textArea.style.position = "fixed"; // Make it fixed to prevent scrolling to the textarea
      textArea.style.opacity = 0; // Make it invisible
      document.body.appendChild(textArea);
      textArea.select();

      try {
          document.execCommand('copy');
          console.log('Text copied to clipboard');
      } catch (err) {
          console.error('Failed to copy text: ', err);
      }

      document.body.removeChild(textArea);
  } else {
      // Clipboard API supported
      navigator.clipboard.writeText(text)
          .then(() => {
              console.log('Text copied to clipboard');
              toast.success('Copied', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
          })
          .catch((err) => {
              console.error('Failed to copy text: ', err);
          });
  }
}




export { isEmptyString, isValidEmail, copyToClipboard, isEmpty };