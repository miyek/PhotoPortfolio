$(window).load(function(){
    //load cover hide after load
    $('.loadcover').fadeOut(500);
})

$(document).ready(function(){
    //All scripts loading when custom.js is call and document is ready
    
    //MENU
    //second menu show / hide (adding/remove class) over hover in first menu
    var activeMenu = function(WhatToActive){
        $(WhatToActive + ' ul li a').mouseenter(function(){
            $(this).closest('li').find('ul').fadeIn(500).toggleClass('active');
        });
        //
        $(WhatToActive + ' ul li ul').mouseleave(function(){
            $(this).fadeOut(500).toggleClass('active');
        });    
    }
        
    activeMenu('.nav-header'); //active for main menu, nav header
    
    //Active menu - Toggle button for small view
    $('.menu-toggle').on('click', function(){
        $(this).toggleClass('activeToggle');
        $(this).closest('header').find('.panel-toggle').slideToggle().toggleClass('show');
    })
    
    //PHOTOS
    //Thumbnails. hover effect funnction (fade in title, zoom background)
    var hoverImg = function(WhatToHover){
      var title=$('.title');
        $(WhatToHover + ' a').hover(function(){
            $(this).find(title).hide().fadeIn(1000);
            $(this).closest(WhatToHover).find('.img').toggleClass('scale');
        }, function(){
            $(this).find(title).fadeOut();
            $(this).closest(WhatToHover).find('.img').toggleClass('scale');
        })  
    }
    
    hoverImg('.thumbnails .img-thumb'); //hover for thumbnails
    
    //Slider.
    var Slider = function(el){
        
        //change slide 1 to another
        var changeSlide = function(currentSlide,Slide){
            currentSlide.fadeOut().toggleClass('active');
            Slide.hide().fadeIn().toggleClass('active');
        }
        
        //change for next slide
        var nextSlide = function (way){
            var currentSlide =$(el).find('.active');
            if(way=='prev'){
                var Slide = currentSlide.prev();
                if(Slide.length==0){
                    Slide = currentSlide.parent().children().last();
                }
            } else{
                var Slide = currentSlide.next();
                if(Slide.length==0){
                    Slide = currentSlide.parent().children().first();
                }
            };
            
            changeSlide(currentSlide,Slide);
        }
        
        //first slider animation
        $(el + ' .slide-1').removeClass('active').hide().fadeIn().addClass('active');
        
        //interval for slider with button
        var intervalPlusButton = function(run,time){  
            if(run==true){
                var loop = setInterval(function() { 
                    nextSlide();
                }, time);
            }    
            
            //button next end prev
            //next
            $(el + ' .next').on('click', function(){
                nextSlide();
                clearInterval(loop);
            });

            //prev
            $(el + ' .prev').on('click', function(){
                nextSlide('prev');
                clearInterval(loop);
            });
        };
        intervalPlusButton(true,15000);//15000
        
    }
    Slider('.slider');
    
    //Loading function via ajax
    var loadMe = function(load, url){
        
        //ajax loading url
        $.ajax(url,{
            success: function(response){
               $(load).append(response);
            },
            error: function(){
                alert('Error when loading');
            },
            timeout: 3000,
            beforeSend: function(response){
                $(load).append('<div class="loading"></div>');
                
            },
            complete: function(){ 
                $(load).find('.loading').remove(); 
            }
            
        });
    }
    
    //loadMe('.infinity', 'views/photoinfinity.html');
    
    //Infinity scroll
    var infinity = function(classTo,urlTo){ 
        var doc = $(document);
        var win = $(window);       
        var count=1;
        //console.log(doc.height());
        
        //when window hight is
        
        //when load button pressed
        var loadbutton = $(classTo + ' .btn-loadmore');
        $(loadbutton).on('click', function(){
            loadMe(classTo, urlTo);
            $(this).remove();
            count++;
        });
        
        //when scroll
        doc.scroll(function(){//when scroll page
            if(win.scrollTop() == doc.height() - win.height() ){ //scroll when we in bottom
                //then load file
                if(count<=5){ //number of loadings
                    loadMe(classTo, urlTo); //***number of object in json file
                    count++;
                }
                loadbutton.remove();
            }
        });
        
    }
    
    infinity('.infinity', 'views/photoinfinity.html');
    
});