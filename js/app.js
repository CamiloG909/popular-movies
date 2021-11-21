function showMessage(message, type = "error") {
	const div = document.createElement("div");
	div.className = "message";
	if (type === "success") {
		div.innerHTML = `
	<i class="bi bi-check-circle-fill --success"></i>
	${message}`;
	} else {
		div.innerHTML = `
	<i class="bi bi-x-circle-fill"></i>
	${message}`;
	}

	document.body.appendChild(div);
	setTimeout(() => {
		div.style.transform = "translateY(0)";
	}, 100);

	// Hidden message
	setTimeout(() => {
		div.style.transform = "translateY(-55px)";
		setTimeout(() => {
			div.remove();
		}, 100);
	}, 1500);
}

