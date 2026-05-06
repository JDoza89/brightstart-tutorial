import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const TeamSection = ({ blok }) => (
	<section
		className="px-16 py-24 text-center"
		{...storyblokEditable(blok)}
	>
		<h2 className="text-4xl font-extrabold text-ink mb-12">{blok.title}</h2>
		<div className="flex justify-center gap-10 flex-wrap">
			{blok.members?.map((m) => (
				<StoryblokServerComponent key={m._uid} blok={m} />
			))}
		</div>
	</section>
);

export default TeamSection;
