interface Project {
	id: number;
	title: string;
	summary: string;
	imageUrl: string;
	repoUrl: string;
	appUrl: string | undefined;
}

interface Experience {
	id: number;
	role: string;
	placeDate: string;
	experiences: string[];
	imgSource: string;
}
