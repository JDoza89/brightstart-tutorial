import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const CTAStrip = ({ blok }) => (
	<section
		className="bg-navy px-16 py-10 flex items-center justify-between gap-8 flex-wrap"
		{...storyblokEditable(blok)}
	>
		<h3 className="text-2xl font-bold text-white">{blok.title}</h3>
		{blok.cta?.length > 0 && (
			<div className="flex">
				{blok.cta.map((c) => (
					<StoryblokServerComponent key={c._uid} blok={c} />
				))}
			</div>
		)}
	</section>
);

export default CTAStrip;
