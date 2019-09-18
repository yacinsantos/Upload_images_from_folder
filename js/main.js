$(document).ready(function(){
    var folder = "img/";
    var fileextension = [".jpg", ".jpeg"];
    var images_tmp = [];
    var images = [];
    var loaded_images = [];
    var images_added_boolean = false;

    function collect_images(){
        $.ajax({
            url : folder,
            success: function (data) {
                images_tmp = []; 
                $(data).find("a:contains(" + fileextension[0] + "), a:contains(" + fileextension[1] + ")").attr("href", function (i, val) {
                    images_tmp.push(val)
                });

                if (images_tmp.length > images.length){
                    images = images_tmp;
                    images_added_boolean = true;
                }
            }
        });
    }

    function add_image_to_the_list(i){
        $("#list_images").prepend('<div class="col-sm-6 col-md-4 col-lg-4">'+
                '<div class="item">'+
                    '<img src="'+folder + images[i] + '" alt="" style="opacity:0" id="'+i+'">'+
                '</div>'+
                '</div>')
        $("#" + i + "").animate({
            opacity: '100'
        }, 8000)        
        loaded_images.push(images[i])
    }

    function show_in_slider(){
        $('#slider-holder').append('<img class="slider" src="'+folder + images[0] + '">');
        var i = 0;
        var max = (images.length - 1)
        images_added_boolean = false;

        setInterval(function(){
            
            //if (!loaded_images.includes(images[0])) add_image_to_the_list(0)

            if(i == -1){
                if (jQuery.inArray(images[max], loaded_images) == -1) add_image_to_the_list(max)
            }else{
                if (jQuery.inArray(images[i], loaded_images) == -1) add_image_to_the_list(i)
            }
            
            i++;

            collect_images()
            if(images_added_boolean == true){
                i = ( max+1 )
                images_added_boolean = false
            }
            max = (images.length - 1)

            if (jQuery.inArray(images[i], loaded_images) == -1){
                $(".slider").attr("src", folder + images[i]).css("opacity", "0")

                $(".slider").animate({
                    opacity: "100"
                }, 2000)
            }
            
           /* $(".slider").fadeOut(1000, function () {
                $(".slider").attr('src', folder + images[i]);
                $(".slider").fadeIn(1000);
            });
            */

            if (i == max) i = -1;
            
            
        }, 5000)
        
    }

    collect_images();
    setTimeout(function(){
        show_in_slider();
      }, 500);
    
    


  });