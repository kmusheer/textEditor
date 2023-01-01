let optionButtons = document.querySelectorAll(".option-button");
let AdvancedOptionButtons = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButton = document.querySelectorAll(".align");
let spacingButton = document.querySelectorAll(".spacing");
let formateButton = document.querySelectorAll(".formate");
let scriptButton = document.querySelectorAll(".script");


// List of fonts 
const fontList = ["Arial", "Times New Roman", "Garamond", "Georgia", "Courier New", "cursive"];

// Initial setting

const Initializer = () => {
    //function calls for highlighting buttons
    //No highlights for link, unlink,lists, undo,redo since they are one time operations

    highlighter(alignButton, true);
    highlighter(spacingButton, true);
    highlighter(formateButton, true);
    highlighter(scriptButton, true);


    // create options for font names
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    // fontSize allow only till 7
    for (let i = 0; i <= 7; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);

    };

    // Default size
    fontSizeRef.value = 3;

};
//main logic
const modifyText = (command, defaultUi, value) => {
          //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
}

//For basic operations which don't need value parameter
optionButtons.forEach((button) => {
    button.addEventListener('click', () =>{
        modifyText(button.id, false, null)
    });
});


//options that require value parameter (e.g colors, fonts)
AdvancedOptionButtons.forEach((button) => {
    button.addEventListener("change", () => {
      modifyText(button.id, false, button.value);
    });
});

//link
linkButton.addEventListener('click', ()=>{
    let userLink = prompt("Enter URL")
      //if link has http then pass directly else add https
      if(/http/i.test(userLink)){
        modifyText(linkButton.id, false, userLink);
      }
      else{
        modifyText(linkButton.id, false, userLink);
      }
})




//Highlight clicked button
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener('click', () => {
            // needsRemoval = true;     means only one button should be highlighted and other would be normal
            if (needsRemoval) {
                let alreadyActive = false;

                //If currently clicked button is already active
                if (button.classList.contains("active")) {
                    alreadyActive = false;
                }
                //Remove highlight from other buttons 
                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add('active');
                }
            }
            else {
                //if other buttons can be highlighted
                button.classList.toggle("active")
            }
        })
    });
};

const highlighterRemover = (className) => {
    className.forEach(button => {
        button.classList.remove("active")
    });
}

window.onload = Initializer()

