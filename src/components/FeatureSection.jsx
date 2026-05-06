import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';
import Image from 'next/image';
import Link from 'next/link';

const CTAVariant = ({ blok }) => (
	<section
		className="px-16 py-24 text-center"
		{...storyblokEditable(blok)}
	>
		<div className="max-w-3xl mx-auto">
			{blok.title && (
				<h2 className="text-5xl font-extrabold text-ink mb-4">{blok.title}</h2>
			)}
			{blok.subtitle && (
				<p className="text-lg text-ink/70 mb-8 leading-relaxed">
					{blok.subtitle}
				</p>
			)}
			{blok.ctas?.length > 0 && (
				<div className="flex gap-4 justify-center flex-wrap">
					{blok.ctas.map((c) => (
						<StoryblokServerComponent key={c._uid} blok={c} />
					))}
				</div>
			)}
		</div>
	</section>
);

const CaseStudyVariant = ({ blok }) => {
	const ref = blok.reference;
	if (!ref?.content) return null;
	const c = ref.content;
	return (
		<section
			className="px-16 py-20 bg-cream"
			{...storyblokEditable(blok)}
		>
			<div className="bg-white rounded-lg p-14 flex gap-12 items-center max-w-7xl mx-auto flex-col md:flex-row">
				{c.image?.filename && (
					<div className="relative w-full md:w-[420px] aspect-[3/2] rounded-lg overflow-hidden flex-shrink-0">
						<Image
							src={c.image.filename}
							alt={c.image.alt || c.title}
							fill
							sizes="(max-width: 768px) 100vw, 420px"
							className="object-cover"
						/>
					</div>
				)}
				<div className="flex flex-col gap-4 flex-1">
					{c.eyebrow && (
						<p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
							{c.eyebrow}
						</p>
					)}
					<h2 className="text-4xl font-extrabold text-ink leading-tight">
						{c.title}
					</h2>
					{c.summary && (
						<p className="text-base text-ink/70 leading-relaxed">
							{c.summary}
						</p>
					)}
					{c.cta?.length > 0 && (
						<div className="mt-4 flex">
							{c.cta.map((cta) => (
								<StoryblokServerComponent key={cta._uid} blok={cta} />
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

const FeaturedPostVariant = ({ blok }) => {
	const ref = blok.reference;
	if (!ref?.content) return null;
	const c = ref.content;
	return (
		<section
			className="px-16 pt-6 pb-16"
			{...storyblokEditable(blok)}
		>
			<Link
				href={`/${ref.full_slug}`}
				className="bg-white rounded-lg flex gap-12 items-center overflow-hidden h-auto md:h-[360px] max-w-7xl mx-auto border border-border hover:shadow-md transition-shadow flex-col md:flex-row"
			>
				{c.featured_image?.filename && (
					<div className="relative w-full md:w-[560px] aspect-[16/10] md:aspect-auto md:h-full flex-shrink-0">
						<Image
							src={c.featured_image.filename}
							alt={c.featured_image.alt || ref.name}
							fill
							sizes="(max-width: 768px) 100vw, 560px"
							className="object-cover"
						/>
					</div>
				)}
				<div className="flex flex-col gap-4 flex-1 py-8 px-8 md:pr-14 md:pl-0">
					<h2 className="text-3xl font-extrabold text-ink leading-tight">
						{ref.name}
					</h2>
					{c.excerpt && (
						<p className="text-base text-ink/70 leading-relaxed">
							{c.excerpt}
						</p>
					)}
					{(c.author || c.published_at) && (
						<p className="text-sm font-medium text-text-muted">
							{[
								c.author,
								c.published_at &&
									new Date(c.published_at).toLocaleDateString('en-US', {
										month: 'long',
										day: 'numeric',
										year: 'numeric',
									}),
							]
								.filter(Boolean)
								.join('  ·  ')}
						</p>
					)}
				</div>
			</Link>
		</section>
	);
};

const FeatureSection = ({ blok }) => {
	const variant = blok.variant || 'cta';
	if (variant === 'cta') return <CTAVariant blok={blok} />;
	if (variant === 'case_study') return <CaseStudyVariant blok={blok} />;
	if (variant === 'featured_post') return <FeaturedPostVariant blok={blok} />;
	return null;
};

export default FeatureSection;
