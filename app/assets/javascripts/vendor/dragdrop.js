var file
$(document).ready(function(){
    console.log('yo');
    'use strict';
    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('postForm');

    var startUpload = function(files) {
        file=files
        
        if (file != undefined) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#drop-zone").html('<img id="preview" src="#" alt="" />')
                $('#preview').attr('src', e.target.result);
                
            }
            reader.readAsDataURL(file[0]);
        }
    }

    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault()
        e.stopImmediatePropagation();
        var $form = $(this),
                formData = new FormData(),
                params   = $form.serializeArray()
        if (file != undefined){
             formData.append('post[image]', file[0]);
        }else{
             formData.append('post[image]', $("#js-upload-files")[0].files[0]);
        }
       
        $.each(params, function(i, val) {
            formData.append(val.name, val.value);        
        });

        $.ajax({
            url: $form.attr('action'),
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(result) {
                $("#alert-modal .modal-title").html("Thanks")
                $("#alert-modal .modal-body").html("<a href ='/dashboard/posts'>See all posts here</a>")
                $("#alert-modal").modal()
                $('form')[0].reset();
                file = "";
                debugger;
                $('#preview').attr('src',"");
            }
        });
        return false;  
    })

    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';

        startUpload(e.dataTransfer.files)
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }

});