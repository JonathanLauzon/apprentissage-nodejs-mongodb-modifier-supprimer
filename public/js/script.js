console.log('Hello World!');
console.log(document.querySelectorAll('.btn-modifier').length);
for(var i = 0; i < document.querySelectorAll('.btn-modifier').length; i++) {
	document.querySelectorAll('.btn-modifier')[i].addEventListener('click', function (event) {
		var laRow = event.target.parentElement.parentElement;
		var leForm = document.getElementById('formulaire');
		leForm.action = leForm.action.replace('ajouter', 'modifier/'+event.target.dataset.id);
		leForm.elements.namedItem("nom").value = laRow.querySelector('.case-nom').innerHTML;
		leForm.elements.namedItem("prenom").value = laRow.querySelector('.case-prenom').innerHTML;
		leForm.elements.namedItem("telephone").value = laRow.querySelector('.case-telephone').innerHTML;
		leForm.elements.namedItem("ville").value = laRow.querySelector('.case-ville').innerHTML;
		leForm.elements.namedItem("codepostal").value = laRow.querySelector('.case-codepostal').innerHTML;
		leForm.elements.namedItem("submit").value = "Modifier";
	});
}

for(var j = 0; j < document.querySelectorAll('.btn-supprimer').length; j++) {
	document.querySelectorAll('.btn-supprimer')[j].addEventListener('click', function (event) {
		console.log('Suppression');
		window.location.href = '/supprimer/' + event.target.dataset.id;
	});
}