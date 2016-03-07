//==================================================
// review validation levels of defense:
// 1st level: in the browser with jQuery - before form submission
// 2nd level: node&express - before request submission
// 3rd level: mongoose schema - before db saving
//==================================================

//1st level....
$('#addReview').submit(function (e) {
	$('.alert.alert-danger').hide();
	if (!$('input#name').val() || !$('select#rating').val() || !$('textarea#review').val()) {
		if ($('.alert.alert-danger').length) {
			$('.alert.alert-danger').show();
		} else {
			$(this).prepend('<div role="alert" class="alert alert-danger">All fields required, please try again</div>');
		}
			return false;
		}
});
