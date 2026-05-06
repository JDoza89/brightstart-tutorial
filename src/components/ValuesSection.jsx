import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const ValuesSection = ({ blok }) => (
	<section
		className="px-16 py-24 bg-white text-center"
		{...storyblokEditable(blok)}
	>
		<h2 className="text-4xl font-extrabold text-ink mb-12">{blok.title}</h2>
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
			{blok.values?.map((v) => (
				<StoryblokServerComponent key={v._uid} blok={v} />
			))}
		</div>
	</section>
);

export default ValuesSection;
