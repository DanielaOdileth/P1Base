$(document).ready(function(){
	 $("#ejemplo2").change(function(){
      alert($('select[id=ejemplo2]').val());
      $('#valor2').val($(this).val());
	});
});
