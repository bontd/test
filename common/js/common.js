$(function(){
    $('.js-faq').click(function(){
        // console.log('abc');
        $('.faq_group-question').removeClass('active');
        $('.faq_group-answer').slideUp();
        if($(this).parents('.faq_group').find('.answer').css('display') == 'none'){
            $(this).addClass('active').parents('.faq_group').find('.answer').slideDown();
        }else {
            $(this).removeClass('active').parents('.faq_group').find('.answer').slideUp();
        }
    })

    $('.form-control').on('change , keyup', function(){
        if($(this).val()){
            $(this).parents('.form-group').addClass("invalid");
        }else {
            $(this).parents('.form-group').removeClass("invalid");
        }
    });

    $(document).on('click', function(e){
        if(e.target.className && e.target.className.indexOf('modal-active') != -1){
            closeModal($('.modal'));
        }
    });

    //click show input-search    
    $(".btn-search").on( "click", function() {
        if(window.innerWidth < 968){
            $(this).parent().find(".input-search").toggleClass("active");
        }       
    });

    //get data post type by ajax
    $(".btn-showmore").on( "click", function() {        
        let numberItem =  $(this).parents(".section_latest").find(".box_list-item").length;        
        let dataSort = $(this).data('sort');
        $.ajax({  
            type: 'GET',  
            url: '/wp-admin/admin-ajax.php',  
            data: { 
                action : 'get_ajax_posts' ,
                offset : numberItem + 1,
                sort: dataSort
            },  
            success: function( response ) {            
            const objData = JSON.parse(response);                       
            $.each(objData, function( index, value ) {
                if(value == 'messageNull' ){
                    $(".btn-showmore").css("display", "none");
                }else{                    
                    showMoreData(value);                    
                }                                         
              });               
            }
        });  

    });

    $(".js-toggle-navi").click(function () {
        $("body").toggleClass('overflow-hidden').find('.header').toggleClass('on-nav');
    });

    $('.header .nav-link').click(function(){
        if($(window).innerWidth() < 969){
            $("body").toggleClass('overflow-hidden').find('.header').toggleClass('on-nav');
        }
    })

    $('.js-content-modal').click(function(){
        let dataModal = $(this).data('modal');
        let dataId = $(this).data('id');
        let dataTitle = $(this).data('title');
        $('#loadingAjax').css('display', 'flex');
        $.ajax({
            type : "post",
            dataType : "html",
            async: false,
            url : '/wp-admin/admin-ajax.php',
            data : {
                action: "idPost",
                idPost: dataId
            },
            success: function(response) {
                onpenModal($(dataModal));
                $(dataModal).find('.modal-header h2').html(dataTitle);
                $(dataModal).find('.modal-body').html(response);
                setTimeout(function(){
                    $('#loadingAjax').css('display', 'none');
                },200)
            },
            error: function( jqXHR, textStatus, errorThrown ){
                console.log( 'The following error occured: ' + textStatus, errorThrown );
                setTimeout(function(){
                    $('#loadingAjax').css('display', 'none');
                },200)
            }
        });
    })

    if($(window).scrollTop() > 10){
        $('.header').addClass('fixed');
    }else {
        $('.header').removeClass('fixed');
    }

    $(window).scroll(function(){
        if($(this).scrollTop() > 10){
            $('.header').addClass('fixed');
        }else {
            $('.header').removeClass('fixed');
        }
    })

    $("#toTop").click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
     });
});

function onpenModal(modal){
    modal.addClass('modal-active');
    $('body').addClass('overflow-hidden');
    setTimeout(function(){
        modal.addClass('modal-fade');
    },100)
}

function closeModal($this){
    let modal = $this;
    modal.removeClass('modal-fade');
    setTimeout(() => {
        modal.removeClass('modal-active');
        $('body').removeClass('overflow-hidden');
    }, 500);
}

function showMoreData(value){
    let htmlLayout = `
        <a href="${value.url}" class="latest_item box_list-item bg-light">
            <div class="thumb d-flex">
                <img src="${value.thumb}" class="img-lastest" alt="lastest">
            </div>
            <div class="box-content p-lg-3q p-2q bg-light">
                <div class="box-date d-flex justify-content-start align-items-center mb-lg-1h mb-1q">
                    <div class="date fs-14 lh-lg-12 text-secondary opacity-50 fw-bold lspacing-10 pr-1h">${value.date}</div>
                    <div class="time fs-14 lh-lg-12 text-secondary opacity-50 fw-bold lspacing-10 pl-1h">${value.time}</div>
                </div>
                <div class="box-ttl fs-24 lh-lg-12 fw-regular mb-lg-1h mb-1q">${value.title}</div>
                <div class="box-desc fs-16 lh-lg-12 opacity-75 fw-ragular mb-lg-1h mb-1q">
                    ${value.desc}
                </div>                        
                <div class="d-flex align-items-center justify-content-start text-third fs-lg-18 fw-bold">
                    <span class="mr-1">Read more</span>                                
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_152_320)">
                            <path d="M1.6665 8H14.9998" stroke="#E62B22" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10.333 3.33325L14.9997 7.99992L10.333 12.6666" stroke="#E62B22" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>                               
                    </svg>
                </div>                        
            </div>
        </a> 
    `;
    $(".box_list ").append(htmlLayout);   
}