import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const FAQList = ({ blok }) => (
	<section
		className="px-16 py-16 max-w-4xl mx-auto"
		{...storyblokEditable(blok)}
	>
		{blok.title && (
			<h2 className="text-3xl font-bold text-ink mb-8 text-center">
				{blok.title}
			</h2>
		)}
		<div className="flex flex-col gap-3">
			{blok.items?.map((item) => (
				<StoryblokServerComponent key={item._uid} blok={item} />
			))}
		</div>
	</section>
);

export default FAQList;
