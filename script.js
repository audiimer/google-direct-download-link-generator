// Variable initialization

const gLink = document.getElementById("glink"); // Get the input element for Google Drive link
const btn = document.getElementById("btn"); // Get the button element
const downloadLink = document.getElementById("download-link"); // Get the textarea element for the download link

btn.addEventListener("click", generateLink);

function generateLink(e) {
    e.preventDefault(); // Prevent form submission

    const confirmLink = gLink.value.includes("https://drive.google.com/document/d/"); // Check if the link is a Google Drive document link

    if (confirmLink === true) {
        const getDownloadLink = gLink.value.replace("https://drive.google.com/document/d/", "https://drive.google.com/uc?export=download&id=").replace("/view?usp=sharing", ""); // Generate the direct download link

        downloadLink.value = getDownloadLink; // Set the direct download link in the textarea

        function copyText(target) {
            if (target.value === "") {
                alert("Please generate a download link"); // Display an alert if there is no download link generated
            } else {
                target.select(); // Select the text in the textarea
                navigator.clipboard.writeText(target.value) // Copy the text to clipboard
                    .then(() => {
                        alert("Link has been copied to clipboard"); // Display a success message
                    })
                    .catch((error) => {
                        console.error("Unable to copy to clipboard:", error); // Display an error message if copying to clipboard fails
                    });
            }
        }

        const copy = document.querySelector(".copy");
        copy.addEventListener("click", () => {
            return copyText(downloadLink);
        });

        // Embed Audio logic
        const audio1 = '<audio width="300" height="32" controls="controls" src="';
        const audio2 = '" type="audio/mp3"></audio>';
        const embedAudio = document.getElementById("embed-audio");
        embedAudio.value = `${audio1}${downloadLink.value}${audio2}`; // Generate the audio embed code

        const copyAudio = document.querySelector(".copy-audio");
        copyAudio.addEventListener("click", () => {
            return copyText(embedAudio);
        });

        // Embed Video logic
        const getVideoLink = gLink.value.replace("/view?usp=sharing", "")
        const video1 = '<iframe src="';
        const video2 = '/preview" width="560" height="315"></iframe>';

        const embedVideo = document.getElementById("embed-video");
        embedVideo.value = `${video1}${getVideoLink}${video2}`; // Generate the video embed code

        const copyVideo = document.querySelector(".copy-video");
        copyVideo.addEventListener("click", () => {
            return copyText(embedVideo); //
        });

    }else{
        alert("Please enter a valid Google Drive File Link")

    }
}
