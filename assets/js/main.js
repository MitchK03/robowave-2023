$(document).ready(function() {
    // fullpage js
    $('#fullpage').fullpage({
      licenseKey: 'gplv3-license',
      navigation: true,
      navigationTooltips: ['Welcome', 'New Robots', 'Used Robots', 'Contact'] 
    });
  
    // typewriterjs
    var typewriterElements = document.querySelectorAll('.typewriter-effect')
    for (var i = 0; i < typewriterElements.length; i++) {
      var currentEl = typewriterElements[i]
      var innerText = currentEl.innerText
      new Typewriter(currentEl, {
        loop: true,
      })
        .typeString(innerText)
        .pauseFor(1000)
        .start()
    }
  
    // power glitch
    PowerGlitch.glitch('.glitch', {
      hideOverflow: true
    })
  
    // last error date
    $('[data-lastErrorDate]').each(function() {
      // get date from data-lastErrorDate
      var errDate = $(this).attr('data-lastErrorDate')
      // turn date into dayjs object
      errDate = dayjs(errDate)
      // get the today's date as a dayjs object
      var today = dayjs()
      // find difference in days between days
      var diff = today.diff(errDate, 'day')
      // determine text color class
      var textClass
      if (diff < 5) {
        textClass = 'text-danger'
      } else if (diff < 30) {
        textClass = 'text-warning'
      } else {
        textClass = 'text-success'
      }
      // update paragraph
      $(this)
        .text(diff + " days since last error")
        .addClass(textClass)
    })

    
  });