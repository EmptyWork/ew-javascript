/**
 *  postScript.js
 *  Created by EmptyWork
 * 
 **/
const post = document.querySelector('#post');
const postCounter = document.querySelectorAll('.postcounter')[0];
const preview = document.querySelectorAll('.preview')[0];
let map = {};
let log;

post.addEventListener('keydown', (e) => {
    map[e.key] = true;
    if (map['Control'] && e.key === 'Enter') {
        workFlow('is running...', 'post.addEventListener()');
        postCheck(1);
    }
    if (map['Control'] && e.key === 'b') {
        selectionModify();
    }
    setTimeout(() => {
        document.querySelector('.raw-output').innerHTML = convertValue(post.value);
        charCounter();
    }, 200);
});

post.addEventListener('keyup', (e) => {
    delete map[e.key];
})

function postCheck(rlog) {
    if (rlog) log = rlog;
    if (post) {
        if (preview) {
            workFlow('running...', 'postCheck()');
            preview.innerHTML = convertValue(post.value, 1);
        } else {
            workFlow('error: .preview not found', 'postCheck()');
            console.error('container with the class of \'.preview\' doesn\'t exist.');
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

function convertValue(text) {
    if (log) workFlow('start converting text', 'convertValue()');
    let arr = text.match(/\[.*?\]|\[imgs=\]/g);
    const arrStore = text.match(/\[.*?\]|\[imgs=\]/g);
    text = htmlInjectionIncoder(text);
    if (arr) {
        arr.forEach(convertCase);
        for (let i = 0; i < arrStore.length; i++) {
            text = text.split(arrStore[i]).join(arr[i]);
        }
    }
    if (log) workFlow('done converting', 'convertValue()');
    if (log) notifMe('Converting Success', null, 3000);
    log = 0;
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
 *   @param text:string - data to be parse and convert
 *
 *   TODO FIX: known error: comma at the end of paragraf will be deleted
 **/

function htmlInjectionIncoder(text) {
    text = text.replace("<", "&lt;");
    text = text.replace(">", "&gt;");
    return text.replace(/(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g, "");
}

/** 
 *   Based-char counting : inspired by twitter.com
 *
 *   TODO: only basic visual - need to be expand later
 **/

function charCounter(type) {
    let maxChar = 140;
    let arr = post.value.split("");

    if (type) {
        postCounter.innerHTML = arr.length;
    } else {
        postCounter.innerHTML = maxChar - arr.length;
        if (arr.length > maxChar) {
            postCounter.style.backgroundColor = "#df4577";
            post.style.color = "#b4c6d7";
            notifMe('Your input is larger than ' + maxChar, 1);
        } else {
            postCounter.style.backgroundColor = "";
            post.style.color = "";
        }
    }
}

/** 
 *   NotifMe Section
 *
 *   TODO: only basic visual - need to be expand later
 **/

const floatNotif = document.querySelector('#float-notif');
let unqidStored = [],
    status = []

/** 
 *   Main function of the notifme
 *   parsing the text and convert it into notification-div
 *
 *   @param message
 *   #@param id - deleted (v.0.2.0 - notifMe Update)
 *
 *   TODO: need to expand more
 **/

function notifMe(message, id, to) {
    let notifTimeout = 10000,
        unqid;
    if (!id) id = Math.round(Math.random() * 100 + 50);
    if (to) notifTimeout = to;
    id++;
    unqid = 'Mx-' + id;

    console.log(status);

    if (unqidStored[id] != unqid) {
        if (!status[id]) {
            unqidStored[id] = unqid;
            status[id] = 1;
            newMessage(message, floatNotif, unqid);
            setTimeout(function () {
                deleteMessage(unqid);
                status[id] = 0;
            }, notifTimeout);
        }
    } else {
        if (status[id] === 0) {
            status[id] = 1;
            newMessage(message, floatNotif, unqid);
            setTimeout(function () {
                deleteMessage(unqid);
                status[id] = 0;
            }, notifTimeout);
        }
    }
}

/** 
 *   Handling deleting process
 *
 **/

function deleteMessage(id) {
    let convertId = id.slice(3, id.length);
    floatNotif.querySelector('.messageid_' + id).remove();
    status[convertId] = 0;
}

/** 
 *   Creating the base for the notification
 *
 *   @param message
 *   @param base
 *   @param messageid
 *
 **/

function newMessage(message, base, messageid) {
    let messageBody = document.createElement('div');
    messageBody.classList.add('float-notif_message', 'messageid_' + messageid);
    if (message) messageBody.innerHTML = '<div class="float-notif_header">' + messageid + '<div class="float-notif_exit" onclick="deleteMessage(\'' + messageid + '\')"><span></span><span class="left"></span></div></div>' + message;
    base.appendChild(messageBody);
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
    if (log) workFlow('converting ' + item.slice(0, 20) + '...', 'convertCase()');
    let url, altText, altTextLoc;
    let locationSlice = item.search('=');
    if (locationSlice === -1) locationSlice = item.search(':');
    let tag = item.slice(1, locationSlice);
    tag = tag.toLowerCase();
    let x = item.slice(locationSlice + 1, item.length - 1);
    x = styleImplementer(x);

    if (tag === "br" || tag === "hr") {
        arr[i] = "<" + tag + "/>";
    } else if (tag === "imgs") {
        locationSlice = item.search('=');
        url = item.slice(locationSlice + 1, item.length - 1);
        tag = item.slice(1, locationSlice - 1);
        altTextLoc = url.search(':');
        altText = url.slice(altTextLoc + 1);
        url = url.slice(0, altTextLoc);

        arr[i] = "<" + tag + " class=\"preview-image\" alt=\"" + altText + "\" src=\"" + url + "\"/>";
    } else if (tag === "video") {
        locationSlice = item.search('=');
        url = item.slice(locationSlice + 1, item.length - 1);
        source = "<source src=" + url + ">";

        arr[i] = "<" + tag + " class=\"preview-video\" autoplay nocontrols>" + source + "Your browser does not support the video tag." + "</" + tag + ">";
    } else if (locationSlice === -1 || !tag) {
        x = item.slice(1, item.length - 1);
        arr[i] = x;
    } else {
        arr[i] = "<" + tag + ">" + x + "</" + tag + ">";
    }
}

/**
 *   Style implementer - Converting any styling into the correct html tag
 * 
 * 
 **/

let sLocS, sLocE, sTag, sTagL, sTxt, sFull;

/** 
 *   Looking inside parameter for matches
 *
 *   @param text
 *
 **/

function styleImplementer(text) {
    let styleLocator = text.match(/\w`|\w`]|\w`\s/g);
    if (log && styleLocator) workFlow("found styles - " + styleLocator, "styleImplementer()");
    if (styleLocator) return styleReplacer(styleLocator, text);
    return text;
}

/** 
 *   Converting each item into the correct tag
 *
 *   @param arr
 *   @param text
 *
 *   TODO FIX: Buggy as hell
 **/

function styleReplacer(arr, text) {
    for (let i = 0; i < arr.length;) {
        sLocS = text.search(arr[i]);
        if (arr[i] == arr[i + 1]) {
            sLocE = text.match(/\w\w`/g);
            sLocE = text.search(sLocE[0]);
            sTxt = text.slice(sLocS + 2, sLocE + 2);
            sFull = text.slice(sLocS, sLocE + 3);
        } else {
            sLocE = text.search(arr[i + 1]);
            sTxt = text.slice(sLocS + 2, sLocE + 1);
            sFull = text.slice(sLocS, sLocE + 2);
        }
        sTagL = text.search("`");
        sTag = text.slice(sLocS, sTagL);

        switch (sTag) {
            case 'b':
                sTxt = "<" + sTag + ">" + sTxt + "</" + sTag + ">";
                break;
            case 'i':
                sTxt = "<" + sTag + ">" + sTxt + "</" + sTag + ">";
                break;
            default:
                sTxt = sTxt;
                break;
        }

        i += 2;
        if (log) workFlow("converting " + sFull, "styleReplacer()");
        text = text.replace(sFull, sTxt);
    }
    return text.slice(0, text.length);
}


/** 
 *   Copy
 *
 **/

function copyItem() {
    let x = document.querySelector('.raw-output');
    workFlow("Copying " + htmlInjectionIncoder(x.value.slice(0, 20)) + "...", 'copyItem()');
    notifMe('Copying <span class="inmessage">' + htmlInjectionIncoder(x.value.slice(0, 20)) + "...</span>", 2, 3000);
    if (x.value) {
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
    if (text) setTimeout(() => {
        newLogBase(text, logsArea, textid);
        checkItem();
        wi = 1;
    }, timeout);
    wi += 2;
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
    if (text) logBase.innerHTML = "<span>" + textid + ":</span> " + text;
    id.appendChild(logBase);
    logBase.scrollBy({
        top: 100,
        left: 0,
        behavior: 'smooth'
    });
}

/** 
 *   Checking the number of logs that have been sent
 *
 **/

function checkItem() {
    let logs = logsArea.querySelectorAll('div');
    if (logs.length > 50) {
        let needToDelete = logs.length - 50;
        for (let i = 0; i < needToDelete; i++) {
            logsArea.removeChild(logs[i]);
        }
    }
}

/** 
 *   Selection
 *
 *   TODO: Will be expand next
 *
 **/

let sel;

function selectionModify() {
    const selC = sel = window.getSelection().toString();
    const pVal = post.value;
    sel = '<b>' + sel + '</b>';
    sel = pVal.replace(selC, sel);
    post.innerHTML = sel;
}

/** 
 *   Select type area - display only
 *
 *   TODO: Will be expand next
 *
 **/

const sId = document.querySelector('.select-text');

sId.addEventListener('change', function () {
    let value = sId.value;
    showContainer(value);
});

/** 
 *   Will show id based on the value 
 *
 *   @param data
 *
 **/

function showContainer(data) {
    let storeData, currentData;
    currentData = data;
    if (storeData);
}