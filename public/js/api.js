$(document).ready(function () {

  var addForm = $('#add-artist');
  var editForm = $('#edit-artist');
  var deleteForm = $('#delete-artist');
  
  // add artist function
  $(addForm).submit(function (event) {
    event.preventDefault();

    var formData = $(addForm).serialize();

    $.ajax({
      type: 'POST',
      url: '/admin/verified',
      data: formData
    }).done(function (data) {
      // alert the user that the post was successful
      Notifier.success('New artist added to database');
      // clear the form
      $('#first-name, #last-name, #tag, #style, #hourly-rate, #day-rate, #start-date, #artist-bio').val('');
      
      //Issue: _id is a unique part of the select lists and is required. It is not part of "formData" in addForm
      return;
    }).fail(function () {
      Notifier.error('New artist was not added. Error');
    });
  });

  // edit artist form function
  $(editForm).submit(function (event) {
    event.preventDefault();

    var formData = $(editForm).serialize();

    $.ajax({
      type: 'POST',
      url: '/admin/verified/edit',
      data: formData
    }).done(function (data) {
      Notifier.success('Artist updated');
//      res.redirect('admin/verified');
      return;
    }).fail(function (data) {
      console.log(formData);
      Notifier.error('Artist update failed. Check logs.');
      return;
    });

  });


  // delete artist form function
  $(deleteForm).submit(function (event) {
    event.preventDefault();

    var formData = $(deleteForm).serialize();

    $.ajax({
      type: 'POST',
      url: '/admin/verified/remove',
      data: formData
    }).done(function () {
      Notifier.success('Artist deleted');
      return;
    }).fail(function () {
      console.log('Artist not deleted.');
      Notifier.error('Artist not deleted. Check logs');
      return;
    });
  });
});
