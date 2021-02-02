class Post {
    constructor(_base, _preview, _postcounter, _option = {}) {
        this.base = document.querySelector(_base)
        this.preview = (_preview) ? document.querySelector(_preview) : document.querySelector('.preview')
        this.postcounter = (_postcounter) ? document.querySelector(_postcounter) : document.querySelector('.postcounter')
        this.option = _option
        this.button = document.querySelector('.run')

        if(this.option.data) this.optionData()
    }

    // Initialize the Event
    setup() {
        this.base.addEventListener('keypress', e => {
            // add delay for the countPost to prevent bug on the counting process
            setTimeout(() => {this.countPost(this.base.value)}, 200)
            if(e.key === "Enter") {
                // console.log(e)
                e.preventDefault()
                this.preview.innerHTML = this.convert(this.base.value)
            }
        })
        this.button.addEventListener('click', e => {
            this.preview.innerHTML = this.convert(this.base.value)
        })
    }

    // Converting the raw input into the desire output format
    convert() {
        let arr = this.value().match(/\[.*?\]|\[imgs=\]/g)
        // console.log(this.sanitizeHtml(this.value()))

        return this.sanitizeHtml(this.value())
    }

    // This will sanitize all the html and return the sanitizedvalue
    //! Still consider what is the best method to do for the sanitizing the output
    sanitizeHtml(_input) {
        // will return fully sanizite all html input
        //? return this.input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g, "");
        // will return the value with "<" as "&lt" and ">" as "&gt" 
        return _input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    countPost(_input) {
        this.inputToCount = _input.replace(/\s/g, "").split("")
        this.postcounter.innerHTML = this.inputToCount.length
        // console.log(this.inputToCount.length)
    }

    value() {
        return this.base.value;
    }

    optionData() {
        return this.option.data
    }
}

class Preload {
    constructor(_preload, _content) {
        this.preload = document.querySelector(_preload)
        this.content = document.querySelector(_content)
    }

    setup() {
        document.body.onload = () => {
            setTimeout(() => {this.preload.style.marginTop = `calc(-100vh - 300px)`}, 2000)
            setTimeout(() => {this.content.style.display = 'grid'}, 2100)
        }
    }
}

const EJ = new Post('#post', ".preview", "", {
    data: 'Indexing the Area'
})
const PL = new Preload('.preload', '.inside')

EJ.setup()
PL.setup()



// function preLoad() {
//     let preload = document.querySelector('.preload')
//     let content = document.querySelector('.inside')
//     setTimeout(function() {preload.style.marginTop = 'calc(-100vh + -300px)';}, 2000)
//     setTimeout(function() {
//       content.style.display = "grid"
//     }, 2100);
//   }