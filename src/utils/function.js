export function calculateTimeDifference(productCreatedAt) {
	let productCreatedDate;
	try {
		productCreatedDate = new Date(productCreatedAt);
	} catch (error) {
		console.error(`Error parsing productCreatedAt: ${error}`);
		return "Unable to determine time difference";
	}

	const today = new Date();
	const timeDiffMs = today.getTime() - productCreatedDate.getTime();
	const timeDiffDays = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));
	const timeDiffWeeks = Math.floor(timeDiffDays / 7);
	const timeDiffMonths = Math.floor(timeDiffDays / 30); // Approximation
	const timeDiffYears = Math.floor(timeDiffDays / 365);

	if (timeDiffDays < 1) {
		return "today";
	} else if (timeDiffDays === 1) {
		return "1 day ago";
	} else if (timeDiffDays < 7) {
		return `${timeDiffDays} days ago`;
	} else if (timeDiffWeeks < 4) {
		return `${timeDiffWeeks} weeks ago`;
	} else if (timeDiffMonths < 12) {
		return `${timeDiffMonths} months ago`;
	} else {
		return `${timeDiffYears} years ago`;
	}
}
