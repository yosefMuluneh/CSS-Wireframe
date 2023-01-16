let page = document.body.id

let theliked = JSON.parse(sessionStorage.getItem('theLiked')) || []
let theLiked = []
for(let i=0; i<theliked.length;i++){
    if(theliked[i] !== null){
        theLiked.push(theliked[i])
    }
}
let thePages = ['home','nature', 'unesco','history']
window.addEventListener('DOMContentLoaded',()=>{
    switch(page){
        case 'favorite':
            setSrc()
            downloadImg()
            removeImg()
        case 'login':
            console.log("login page")
        default:
            getSrc()
            downloadImg()    
            dblClkLike()
            
    }
    
})
function login(){
    let email = document.getElementById('email')
    let password = document.getElementById('password')
    //let noEntry = document.querySelector('.not-entered')
    if(email.value && password.value){
        window.location.href = "home.html"
        // console.log('got it')
        alert("got it")
    }else{
        //noEntry.style.display = "block"
        alert('enter credential')
    }
    
}

function getSrc(){
    let likeBtn = document.querySelectorAll(".like-btn")
       
    likeBtn.forEach(btn=>{
        let theImgSrc = ''
        btn.addEventListener('click',()=>{
            if(btn.parentElement.previousElementSibling){
                theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
                btn.parentElement.style.opacity = 1
            }else{
                theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
            }
            if(!theLiked.includes(theImgSrc)){
                theLiked.push(theImgSrc) 
            }
            console.log(theImgSrc)
            sessionStorage.setItem('theLiked', JSON.stringify(theLiked))
            if (document.body.id !== 'favorite'){
                btn.classList.toggle('liked')
            }
            
        })
    })
}

const downloadImg = ()=>{
    let downBtn = document.querySelectorAll('.save-btn')
    downBtn.forEach(btn=>{
        btn.addEventListener('click',(e)=>{
            let theImgSrc = ''
            e.preventDefault()
            if(btn.parentElement.previousElementSibling){
                theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
            }else{
                theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
            }
            fetchUrl(theImgSrc)
        })
    })

    
}
function fetchUrl(url){
    fetch(url).then(res=> res.blob()).then(picture=>{
        let tempUrl = URL.createObjectURL(picture)
        let thelink = document.createElement('a')
        thelink.href = tempUrl
        thelink.download = `filename${url}`
       document.body.appendChild(thelink)
        thelink.click()
        thelink.remove()
    })
}

function setSrc(){
    let theImages = document.getElementsByTagName("img")
    theImages = Array.from(theImages)
    let theliked = JSON.parse(sessionStorage.getItem('theLiked')) || []
    let theLiked = []
    for(let i=0; i<theliked.length;i++){
    if(theliked[i] !== null){
        theLiked.push(theliked[i])
    }
    }

    // for(let i = 2;i < theImages.length; i++){
    //     theLiked.push(theImages[i].getAttribute('src'))
    // }
    // localStorage.setItem("theLiked", JSON.stringify(theLiked))
    console.log("the length " + theLiked.length)
    let trackList = theLiked.length - 1
    for (let itBe = 2; itBe<theImages.length; itBe++){
        console.log(theLiked[trackList])
        theImages[itBe].src = (theLiked[trackList] !== null ? theLiked[trackList]:"./images/nature3.jpg")
        if(trackList == 0){
            trackList = theLiked.length - 1
        }else{
            trackList--;
        }
       
    }

    theContent = ``
    for(let remain = trackList; trackList >= 0; trackList--){
        theContent = theContent + `
        <div class="third-pic-btn ">
        <img src="${theLiked[remain]}" alt="favorite-pic-6">
        <div class="third-btn-cont">
          <button class="save-btn"><i class="fa fa-download"></i></button>
            <button class="share-btn"><i class="fa fa-share"></i></button>
            <button class="like-btn"><i class="fa fa-remove"></i></button>
        </div>
      </div>
        `
    }
    let theBodyContent = document.querySelector(".fav-sec-pic").innerHTML
    theBodyContent = theBodyContent + theContent  
}

const removeImg = () =>{
    let remvBtn = document.querySelectorAll('.like-btn')
    theLiked = JSON.parse(sessionStorage.getItem("theLiked")) || []
    remvBtn.forEach(btn=>{
        let theImgSrc = ''
        btn.addEventListener('click',()=>{
            
            if(btn.parentElement.previousElementSibling){
                theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
            }else{
                theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
            }
            
            // const theliked = theLiked.filter(ele=>{
            //     return ele !== theImgSrc
            // })
            const thelikeds = []
            for(let i=0; i< theLiked.length;i++){
                if (theLiked[i] !== theImgSrc && theLiked !== null){
                    thelikeds.push(theLiked[i])
                }
            }
            console.log(thelikeds)
           
            sessionStorage.setItem('theLiked', JSON.stringify(thelikeds))
            setSrc()
           
        })
    })

}
const showSideMenu = ()=>{
    const theDiv = document.querySelector('.side-menus')
    theDiv.style.display = "block"
}
const hideMenus = () =>{
    const theDiv = document.querySelector('.side-menus')
    theDiv.style.display = "none"
}

const dblClkLike = () =>{
    let theImages = document.getElementsByTagName("img")
    let theLiked = JSON.parse(sessionStorage.getItem("theLiked")) || [] 
    theImages = Array.from(theImages)
    theImages.forEach(imag=>{
        imag.ondblclick = function(){
            theLiked.push(imag.getAttribute('src'))
            console.log(imag.getAttribute('src'))
            sessionStorage.setItem('theLiked', JSON.stringify(theLiked))
        }
        // imag.addEventListener("dblclick",()=>{
            
            
        // })
        
    })
    
}

function sendFeed(){
    let theFeed = document.getElementById('feedback')
    let theSendBtn = document.getElementById('send-feed')
    let theSuccess = document.querySelector('.the-success')
    theSendBtn.addEventListener('click',()=>{
        console.log('im clicked')
        if(theFeed.value){
            theSuccess.style.display = 'block'
            console.log('success')
        }else{
            theFeed.placeholder = 'please write your thought'
            console.log('failed')
        }
    })
}

