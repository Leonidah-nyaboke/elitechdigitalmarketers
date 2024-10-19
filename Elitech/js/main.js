(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });
    
})(jQuery);






class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        //index of the the current string being typedout
        this.wordIndex = 0;
        //this.wait must be a base 10 interger
        this.wait = parseInt(wait, 10);
        //method type()
        this.type();
        // Boolean if the word is currently deleting
        this.isDeleting = false;
    }

    
    type() {
        //current index of words
        const current = this.wordIndex % this.words.length;
        //get full text of current word
        const fullTxt = this.words[current];

        // check if deleting
        if (this.isDeleting){
        //remove character
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        //add a charaacter
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }            

    


        // insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        //type speed for when it is typing, deleting and pausing after deletion

        let typeSpeed = 100;

        //select pencil icon for writting animation
        const typingElement = document.querySelector('.fas');

        if (this.isDeleting){
            typeSpeed /= 4;        
        }
 
        if(this.isDeleting){
            typingElement.className = "fas fa-pencil-alt erasing-animation";
        }else{
            typingElement.className = "fas fa-pencil-alt writing-animation";
        }

        // if word is complete
        if(!this.isDeleting && this.txt === fullTxt){
            // make pause at end
            typeSpeed = this.wait;
            //set delete to true
            this.isDeleting = true;
            //will stop the pencil animation after word completion
            typingElement.className = "fas fa-pencil-alt";


        } else if (this.isDeleting && this.txt === ''){
            this.isDeleting = false;
            //move to the next word in the HTML property
            this.wordIndex++;
            // pause time before the word start typing
            typeSpeed = 1000;

        }

        setTimeout(() => this.type(), typeSpeed)
    }
}


//Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init() {
const txtElement = document.querySelector('.txt-type');
// const words = JSON.parse(txtElement.getAttribute('data-words'));
const words = ['Business website?','Ecommerce website?', 'Personal portfolio?', 'Blog?', 'Landing page?', 'Institution website?', 'Corporate website?', 'Government organization website?', 'NGO website?', 'Online shop website?', 'Resume website?',];


// const wait = txtElement.getAttribute('data-wait');
const wait = 700;

new TypeWriter(txtElement, words, wait);
}







      function check() {
      var checkBox = document.getElementById("checbox");
      var text1 = document.getElementsByClassName("text1");
      var text2 = document.getElementsByClassName("text2");
      
      for (var i = 0; i < text1.length; i++) {
      if (checkBox.checked == true) {
      text1[i].style.display = "block";
      text2[i].style.display = "none";
      } else if (checkBox.checked == false) {
      text1[i].style.display = "none";
      text2[i].style.display = "block";
      }
      }
      }
      check();


      const quoteText = document.querySelector(".quote"),
      authorName = document.querySelector(".author .name"),
      quoteBtn = document.querySelector("buton"),
      soundBtn = document.querySelector(".sound"),
      copyBtn = document.querySelector(".copy"),
      twitterBtn = document.querySelector(".twitter");
      function randomQuote(){
          quoteBtn.classList.add("loading");
          quoteBtn.innerText = "Loading Quote...";
          fetch("https://api.quotable.io/random").then(res => res.json()).then(result =>{
              quoteText.innerText = result.content;
              authorName.innerText = result.author;
              quoteBtn.innerText = "New Quote";
              quoteBtn.classList.remove("loading");
          });
      }
      soundBtn.addEventListener("click", ()=>{
          let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
          speechSynthesis.speak(utterance);
      });
      copyBtn.addEventListener("click", ()=>{
          navigator.clipboard.writeText(quoteText.innerText);
      });
      twitterBtn.addEventListener("click", ()=>{
          let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
          window.open(tweetUrl, "_blank");
      });
      quoteBtn.addEventListener("click", randomQuote);
      


