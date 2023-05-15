import { json } from '@sveltejs/kit'
import { comments } from '$lib/comments.ts'

export function GET(requestEvent) {
	const { params } = requestEvent;
	const { commentId } = params;
	const comment = comments.find((comment) => comment.id === parseInt(commentId));
	return json(comment);
}
