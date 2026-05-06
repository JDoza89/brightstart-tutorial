import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const HeroIntro = ({ blok }) => (
	<section
		className="px-16 pt-24 pb-12 text-center"
		{...storyblokEditable(blok)}
	>
		<div className="max-w-5xl mx-auto">
			{blok.eyebrow && (
				<p className="text-xs font-semibold tracking-[0.2em] text-teal mb-4 uppercase">
					{blok.eyebrow}
				</p>
			)}
			<h1 className="text-6xl md:text-7xl font-extrabold text-ink leading-[1.05] mb-6">
				{blok.headline}
			</h1>
			{blok.subhead && (
				<p className="text-lg text-ink/70 leading-relaxed max-w-2xl mx-auto mb-10">
					{blok.subhead}
				</p>
			)}
			{blok.ctas?.length > 0 && (
				<div className="flex gap-4 justify-center flex-wrap">
					{blok.ctas.map((cta) => (
						<StoryblokServerComponent key={cta._uid} blok={cta} />
					))}
				</div>
			)}
		</div>
	</section>
);

export default HeroIntro;
