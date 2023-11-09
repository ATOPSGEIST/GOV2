/**
 * Theme's custom LOC JS.
 *
 */


// jQuery on DOM is ready. ------------------------------------------------------------------------------------------------
jQuery(document).ready(function($) {

    // used to launch media library and set default image
    
    jQuery('#select_image').on('click', function(e) {

        e.preventDefault();

        var button = $(this);

        wp.media.editor.send.attachment = function(props, attachment) {
            //for post lightbox image
            //jQuery('#acf-field_lightbox_image').val(attachment.url);  

            //for default image            
            jQuery('img#selected_default_image').attr('src', attachment.url);
            jQuery('.selected_image').val(attachment.url);
            jQuery('#default_image_alt_text').val(attachment.alt);
            jQuery('#default_image_caption').val(attachment.caption);            
        };
        wp.media.editor.open(button);        
        return false;
    });  
    

    //on the blog post screen, place the lightbox options after the featured image 
    //jQuery("#acf_loc_lightbox_images").insertAfter("#postimagediv");

    //hide lightbox input from left nav
    //jQuery('li').find('a:contains("Post lightbox image")').hide();
    
    //add width to figure element for legacy images
    jQuery('div.entry-content figure').each(function() {

        var styleattr = jQuery(this).attr('style');
        var classattr = jQuery(this).attr('class');

        if (typeof styleattr == typeof undefined && styleattr !== true) {            
            if (typeof classattr == typeof undefined && classattr !== true) {
                var imgwidth = jQuery(this).find('img').attr('width');
                jQuery(this).css('width', imgwidth);
            }
        }
    });
    
    //legacy images - with anchor
    jQuery('div.entry-content p a img').each(function() {

        var imgwidth = jQuery(this).attr('width');
        var legacyhtml = '';

        if (jQuery(this).parent().is("a")) {
            legacyhtml = jQuery(this).parent().parent().html() + '</a>';
        } else {
            legacyhtml = jQuery(this).parent().parent().html();
        }
        var content = '<figure style="width: ' + imgwidth + '">' + legacyhtml + '</figure>';
        jQuery(this).parent().parent().replaceWith(content);
    });

    //legacy images - no anchor
    jQuery('div.entry-content p img').each(function() {

        var imgwidth = jQuery(this).attr('width');
        var text = jQuery(this).parent().text();
        var content = '<figure style="width: ' + imgwidth + '">' + jQuery(this).prop('outerHTML') + '</figure>';

        if (text !== '') {
            content = content + '<p>' + text + '</p>';
        }
        jQuery(this).parent().replaceWith(content);
    });

    //figure style in pixels, not full, medium, thumbnail
    jQuery('div.entry-content figure').each(function() {

        var imgsizes = ['width: full;', 'width: medium;', 'width: thumbnail;'];

        if (jQuery.inArray(jQuery(this).attr('style')), imgsizes) {
            var imgwidth = $("img", this).width(); 
            if (imgwidth !== '') {
                jQuery(this).attr('style', 'width: ' + imgwidth + 'px');
            }
        }
    });

    //move akismet_comment_nonce and hidden fields in comments area
    jQuery('#akismet_comment_nonce').parent().insertAfter('input#comment_reset');
    jQuery('input#comment_reset').insertAfter('input#comment_parent');
    jQuery('input#comment_post_ID').insertAfter('p.form-submit');
    jQuery('input#comment_parent').insertAfter('p.form-submit');
});
