// Global variable
const post = document.querySelector('#post');
const postCounter = document.querySelectorAll('.postcounter')[0];
const preview = document.querySelectorAll('.preview')[0];
let map = {}; // mapping other key to be use.
// console.log(map);
post.addEventListener('keydown', (e) => {
    map[e.key] = true; // set mapping key to be true
    // console.log(map);
    if( // checking for Control and Enter
        map['Control'] // set mapping with key 'Control' 
        && 
        e.key === 'Enter'
        ) {
        postCheck();
        workFlow('Input Menggunakan Komputer');
    }

    if(e.key === 'p') {
        workFlow();
    }
    charCounter(); // count the char

    setTimeout(() => {document.querySelector('.raw').innerHTML = htmlInjectionIncoder(post.value);}, 200);
});

post.addEventListener('keyup', (e) => {
    delete map[e.key];
})

function postCheck() {
    if(post) {
        //single line if else statement
        (preview) ? preview.innerHTML = convertValue(post.value) : console.error( 'container with the class of \'.preview\' doesn\'t exist.');
    } else {
        console.error('\'container with the id of \'#post\' doesn\'t exist.');
    }
}

// Converting the value into array to be process
function convertValue(text) {
    let arr = text.match(/\[.*?\]|\[imgs=\]/g);
    // ([\[\{])[:\w]+(\})
    const arrStore = text.match(/\[.*?\]|\[imgs=\]/g);
    text = htmlInjectionIncoder(text);
    console.log(arrStore);
    if(arr) {
        arr.forEach(convertCase);
        for(let i = 0; i < arrStore.length; i++) {
            text = text.split(arrStore[i]).join(arr[i]);
        }
    }  // running individual check of each item inside the array
    return arrayToString(text);
}

// with the support of comma between words.
// TODO FIX: known error: comma at the end of paragraf will be deleted
function arrayToString(y) {
    return y.toString().replace(/,(?!,)/g, " ");
}

function htmlInjectionIncoder(y) {
    return y.replace(/(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g, " ");
}

// based-char counting : inspired by twitter.com
// only basic visual - need to be expand later
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

function convertCase(item, i, arr) {;
    let url;
    let locationSlice = item.search(':');
    if(locationSlice === -1) locationSlice = item.search('=');
    let tag = item.slice(1, locationSlice);
    let x = item.slice(locationSlice+1, item.length-1);
    
    console.log(locationSlice);
    if(tag === "br" || tag === "hr") {arr[i] = "<"+tag+"/>";} else {arr[i] = "<"+tag+">"+x+"</"+tag+">";}
    if(tag === "imgs=https" || tag === "imgs=http" || tag === "imgs") {
        locationSlice= item.search('='); 
        url = item.slice(locationSlice+1, item.length-1);
        tag = item.slice(1, locationSlice-1);
        
        arr[i] = "<"+tag+" class=\"preview-image\" src=\""+url+"\"/>";
    }
    if(tag === "video=https" || tag ==="video=http" || tag === "video" ) {
        locationSlice= item.search('='); 
        url = item.slice(locationSlice+1, item.length-1);
        source = "<source src="+url+">";

        arr[i] = "<"+tag+" class=\"preview-video\" autoplay nocontrols>"+source+"Your browser does not support the video tag."+"</"+tag+">";
        console.log(url);
    }
}

//need to be done next
function workFlow(x) {
    let logsArea = document.querySelector('.log-area');
    if(x) newLogBase(x, logsArea);
}

function newLogBase(x, y) {
    let logBase = document.createElement('div');
    logBase.classList.add('lognew');
    if(x) logBase.innerHTML = x;
    y.appendChild(logBase);
}

let images = preview.querySelectorAll('image');

console.log(preview);

function biggerImage() {
    console.log(images);
}