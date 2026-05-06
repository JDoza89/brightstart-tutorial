import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const PageHeader = ({ blok }) => {
	const isLarge = blok.size === 'large';
	return (
		<section
			className={`px-16 text-center ${isLarge ? 'pt-24 pb-12' : 'pt-20 pb-10'}`}
			{...storyblokEditable(blok)}
		>
			<div className="max-w-3xl mx-auto">
				{blok.eyebrow && (
					<p className="text-xs font-semibold tracking-[0.2em] text-teal mb-4 uppercase">
						{blok.eyebrow}
					</p>
				)}
				<h1
					className={`font-extrabold text-ink leading-[1.1] ${isLarge ? 'text-6xl md:text-7xl' : 'text-4xl md:text-5xl'}`}
				>
					{blok.title}
				</h1>
				{blok.description && (
					<p className="text-lg text-ink/70 leading-relaxed mt-6">
						{blok.description}
					</p>
				)}
				{blok.cta?.length > 0 && (
					<div className="mt-8 flex justify-center">
						{blok.cta.map((c) => (
							<StoryblokServerComponent key={c._uid} blok={c} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default PageHeader;
