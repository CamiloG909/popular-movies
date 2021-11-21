const header = document.querySelector(".header");

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

let page = 1;

const btnPeviousPage = document.querySelector("#btnPrevious");
const btnNextPage = document.querySelector("#btnNext");

eventListeners();

function eventListeners() {
	header.addEventListener("click", () => window.location.reload());
	getMovies();
	btnPeviousPage.addEventListener("click", () => {
		if (page > 1) {
			page--;
			getMovies();
		}
	});
	btnNextPage.addEventListener("click", () => {
		if (page < 1000) {
			page++;
			getMovies();
			window.scroll(0, 0);
		}
	});
}

async function getMovies() {
	try {
		const URL_KEY = "438639906e8bd868cd6ce7dbd495d19e";
		const URL = "https://api.themoviedb.org/3/movie/popular";

		const response = await fetch(`${URL}?api_key=${URL_KEY}&page=${page}`);

		if (response.status !== 200)
			return showMessage("An error has occurred", "error");

		const data = await response.json();

		// Show movies in screen
		showMovies(data.results);
	} catch {
		showMessage("An error has occurred", "error");
	}
}

function showMovies(movies) {
	const container = document.querySelector("#container");
	container.innerHTML = "";

	movies.forEach((movie) => {
		const card = document.createElement("article");
		card.className = "movie";

		const poster = document.createElement("img");
		poster.className = "poster";
		poster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
		card.appendChild(poster);

		const title = document.createElement("p");
		title.className = "title";
		title.textContent = movie.title;
		card.appendChild(title);

		container.appendChild(card);
	});
}
