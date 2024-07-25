function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}


const styles = {
    margin: "0.5em auto",
    padding: "0.8em 1.5em",
    color: "#FFF",
    backgroundColor: "#5A2E98",
    fontSize: "14px",
    fontFamily: "Oswald",
    letterSpacing: "2px",
};

function onReady() {
    // Select the button element
    let cards = document.querySelectorAll('li[data-type="anime"] .crop img');

    // Attach event listener for the 'mouseover' event
    cards.forEach((item) => {
        item.addEventListener('mouseover', () => {
            waitForElm('.statusBand').then((elm) => {
                if (!elm.querySelector('button#aniwave')) {
                    // Create the button
                    const button = document.createElement('button');

                    button.addEventListener('click', (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        let aniwave_link = 'https://aniwave.to/filter?keyword=' + elm.previousElementSibling.alt.replace(/\s+/g, '+')
                        window.open(aniwave_link, '_blank');
                    });

                    button.id = 'aniwave';
                    button.textContent = 'aniwave';

                    // Apply styles
                    Object.keys(styles).forEach(key => {
                        button.style[key] = styles[key];
                    });

                    // Append the button
                    elm.insertBefore(
                        button, elm.firstChild); // Or elm.appendChild(button); if you want to insert after
                }
            });
        });
      });
}
if (document.readyState !== "loading") {
    onReady(); // Or setTimeout(onReady, 0); if you want it consistently async
} else {
    document.addEventListener("DOMContentLoaded", onReady);
}
