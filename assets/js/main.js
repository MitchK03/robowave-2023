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

     // listen for submit event on the signup form
    // event.preventDefault()
    // get the value out of the #email input
    // create a user using the jsonplaceholder API
      // if successful
        // redirect to the signup-thankyou.html?email=<email_here>
    var signupForm = document.getElementById('signup-form')

    signupForm.addEventListener('submit', function(event){
        event.preventDefault()
        var emailInput = document.getElementById('email')
        var email = emailInput.value.trim()

        fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email})
        })
        .then(function(response){
          if (response.ok && response.status === 201){
            window.location.assign('/signup-thankyou.html?email=' + email)
          }
        })
        .catch(function(error){
          alert('Error creating user')
          console.log(error)
        })
    })

  });