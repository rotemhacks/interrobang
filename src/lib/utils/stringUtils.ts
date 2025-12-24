export const createSlug = (text: string): string => {
	return text.replaceAll(' ', '-').toLowerCase();
};
