export function resolveLink(link) {
	if (!link) return '#';
	if (link.linktype === 'url') return link.url || '#';
	if (link.linktype === 'story') {
		const slug = link.cached_url || link.story?.full_slug || '';
		return slug ? `/${slug.replace(/^\//, '')}` : '#';
	}
	if (link.linktype === 'email') return `mailto:${link.email || ''}`;
	return '#';
}
