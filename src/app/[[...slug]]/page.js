import { StoryblokStory, StoryblokServerComponent } from '@storyblok/react/rsc';
import { getStoryblokApi, RESOLVE_RELATIONS } from '@/lib/storyblok';

export default async function CatchAllPage({ params }) {
	const { slug } = await params;
	const fullSlug = slug ? slug.join('/') : 'home';

	const storyblokApi = getStoryblokApi();

	const sbParams = {
		version: 'draft',
		resolve_relations: RESOLVE_RELATIONS.join(','),
	};

	const [pageRes, headerRes, footerRes] = await Promise.all([
		storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams),
		storyblokApi
			.get('cdn/stories/globals/header', { version: 'draft' })
			.catch(() => null),
		storyblokApi
			.get('cdn/stories/globals/footer', { version: 'draft' })
			.catch(() => null),
	]);

	return (
		<>
			{headerRes?.data?.story && (
				<StoryblokServerComponent blok={headerRes.data.story.content} />
			)}
			<StoryblokStory story={pageRes.data.story} />
			{footerRes?.data?.story && (
				<StoryblokServerComponent blok={footerRes.data.story.content} />
			)}
		</>
	);
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const fullSlug = slug ? slug.join('/') : 'home';
	const storyblokApi = getStoryblokApi();
	try {
		const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
			version: 'draft',
		});
		return {
			title:
				data.story.content?.seo_meta_title ||
				data.story.name ||
				'BrightStart',
			description: data.story.content?.seo_meta_description || undefined,
		};
	} catch {
		return { title: 'BrightStart' };
	}
}
