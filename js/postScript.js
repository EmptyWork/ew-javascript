/**
 *  postScript.js
 *  Created by EmptyWork
 * 
 **/
const post = document.querySelector('#post');
const postCounter = document.querySelectorAll('.postcounter')[0];
const preview = document.querySelectorAll('.preview')[0];
let map = {};

post.addEventListener('keydown', (e) => {
    map[e.key] = true;
    if( map['Control'] && e.key === 'Enter') {
        workFlow('is running...','post.addEventListener()');
        postCheck();
    }
    setTimeout(() => {
        document.querySelector('.raw-output').innerHTML = convertValue(post.value);
        ;charCounter()
    }, 200);
});

post.addEventListener('keyup', (e) => {
    delete map[e.key];
})

function postCheck() {
    if(post) {
        if(preview) {
            workFlow('running...','postCheck()');
            preview.innerHTML = convertValue(post.value, 1);
        } else {
            workFlow('error: .preview not found','postCheck()');
            console.error( 'container with the class of \'.preview\' doesn\'t exist.');
        }
    } else {
        console.error('\'container with the id of \'#post\' doesn\'t exist.');
    }
}

/** 
*   Converting the value into array to be process
*
*   @param text
*
**/

function convertValue(text, log) {
    if(log) workFlow('start converting text','convertValue()');
    let arr = text.match(/\[.*?\]|\[imgs=\]/g);
    const arrStore = text.match(/\[.*?\]|\[imgs=\]/g);
    text = htmlInjectionIncoder(text);
    if(arr) {
        arr.forEach(convertCase);
        for(let i = 0; i < arrStore.length; i++) {
            if(log) workFlow('converting '+arrStore[i].slice(0, 20)+'...','convertCase()');
            text = text.split(arrStore[i]).join(arr[i]);
        }
    }
    if(log) workFlow('done converting','convertValue()');
    return arrayToString(text);
}


/** 
*   With the support of comma between words.
*
*   @param text
*
*   TODO FIX: known error: comma at the end of paragraf will be deleted
**/

function arrayToString(text) {
    return text.toString().replace(/,(?!,)/g, " ");
}

/** 
*   Remove any html tag from the input
*
*   @param text
*
*   TODO FIX: known error: comma at the end of paragraf will be deleted
**/

function htmlInjectionIncoder(text) {
    return text.replace(/(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g, " ");
}

/** 
*   Based-char counting : inspired by twitter.com
*
*   TODO: only basic visual - need to be expand later
**/

function charCounter() {
    let maxChar = 140; 
    let arr = post.value.split("");

    postCounter.innerHTML = maxChar - arr.length;
    if(arr.length > maxChar) {
        postCounter.style.color = "red";
        post.style.color = "#cececece";
    } else {
        postCounter.style.color = "";
        post.style.color = "";
    }
}

/** 
*   Converting each item into the correct tag
*
*   @param item
*   @param i
*   @param arr
*
**/

function convertCase(item, i, arr) {
    let url;
    let locationSlice = item.search(':');
    if(locationSlice === -1) locationSlice = item.search('=');
    let tag = item.slice(1, locationSlice);
    tag = tag.toLowerCase();
    let x = item.slice(locationSlice+1, item.length-1);
    if(tag === "br" || tag === "hr") {arr[i] = "<"+tag+"/>";}
    else if(tag === "imgs=https" || tag === "imgs=http" || tag === "imgs") {
        locationSlice= item.search('='); 
        url = item.slice(locationSlice+1, item.length-1);
        tag = item.slice(1, locationSlice-1);
        tag = tag.toLowerCase();
        
        arr[i] = "<"+tag+" class=\"preview-image\" src=\""+url+"\"/>";
    }
    else if(tag === "video=https" || tag === "video=http" || tag === "video" ) {
        locationSlice= item.search('='); 
        url = item.slice(locationSlice+1, item.length-1);
        source = "<source src="+url+">";

        arr[i] = "<"+tag+" class=\"preview-video\" autoplay nocontrols>"+source+"Your browser does not support the video tag."+"</"+tag+">";
    }
    else if(locationSlice === -1) {
        x = item.slice(1, item.length-1);
        arr[i] = x;
    } else {
        arr[i] = "<"+tag+">"+x+"</"+tag+">";
    }
}


/** 
*   Copy
*
**/

function copyItem() {
    let x = document.querySelector('.raw-output');
    if(x.value) {
        navigator.clipboard.writeText(x.value);
    } 
}

/**
*   Console-related function and variable
*   
**/

let wi = 1;
const logsArea = document.querySelector('.log-area');

/** 
*   Act as the message for the console
*
*   @param text
*   @param textid
*
**/

function workFlow(text, textid) {
    let timeout = wi * 200;
    if(text) setTimeout(() => {
        newLogBase(text, logsArea, textid);
        checkItem();
        wi = 1;
    }, timeout);
    wi++;
}

/** 
*   Creating the base for the message
*
*   @param text
*   @param id
*   @param textid
*
**/

function newLogBase(text, id, textid) {
    let logBase = document.createElement('div');
    logBase.classList.add('lognew');
    if(text) logBase.innerHTML = "<span>"+textid+":</span> "+text;
    id.appendChild(logBase);
    logBase.scrollBy({top: 100, left: 0, behavior: 'smooth' });
}

/** 
*   Checking the number of logs that have been sent
*
**/

function checkItem() {
    let logs = logsArea.querySelectorAll('div');
    if(logs.length > 50) {
        let needToDelete = logs.length - 50;
        for(let i = 0; i < needToDelete; i++){
            logsArea.removeChild(logs[i]);
        }
    }
}