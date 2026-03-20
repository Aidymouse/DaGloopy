// Load files from RSS feed

// RSS Sources
const subscribed_sources = [
	"https://crateredland.blogspot.com/feeds/posts/default"
]

export const populate_rss = () => {

	for (const source of subscribed_sources) {
		// Waaah. Cors broked my feed :( :( :(
		fetch(source).then(fr => {
			console.log(fr)
		})
	}

}

