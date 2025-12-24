const createSlug = (text: string): string => {
	return text.replaceAll(' ', '-').toLowerCase();
};

export default createSlug;
