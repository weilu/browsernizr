var Modernizr = require('./../../lib/Modernizr');
var createElement = require('./../../lib/createElement');
var docElement = require('./../../lib/docElement');
var testStyles = require('./../../lib/testStyles');

/*!
{
  "name": "Form Validation",
  "property": "formvalidation",
  "tags": ["forms", "validation", "attribute"]
}
!*/
/* DOC

This implementation only tests support for interactive form validation.
To check validation for a specific type or a specific other constraint,
the test can be combined:

- `Modernizr.inputtypes.number && Modernizr.formvalidation` (browser supports rangeOverflow, typeMismatch etc. for type=number)
- `Modernizr.input.required && Modernizr.formvalidation` (browser supports valueMissing)

*/

    Modernizr.addTest('formvalidation', function() {
      var form = createElement('form');
      if ( !('checkValidity' in form) || !('addEventListener' in form) ) {
        return false;
      }
      var invaildFired = false;
      var input;

      Modernizr.formvalidationapi =  true;

      // Prevent form from being submitted
      form.addEventListener('submit', function(e) {
        //Opera does not validate form, if submit is prevented
        if ( !window.opera ) {
          e.preventDefault();
        }
        e.stopPropagation();
      }, false);

      // Calling form.submit() doesn't trigger interactive validation,
      // use a submit button instead
      //older opera browsers need a name attribute
      form.innerHTML = '<input name="modTest" required><button></button>';

      testStyles('#modernizr form{position:absolute;top:-99999em}', function( node ) {
        node.appendChild(form);

        input = form.getElementsByTagName('input')[0];

        // Record whether "invalid" event is fired
        input.addEventListener('invalid', function(e) {
          invaildFired = true;
          e.preventDefault();
          e.stopPropagation();
        }, false);

        //Opera does not fully support the validationMessage property
        Modernizr.formvalidationmessage = !!input.validationMessage;

        // Submit form by clicking submit button
        form.getElementsByTagName('button')[0].click();
      });

      return invaildFired;
    });

