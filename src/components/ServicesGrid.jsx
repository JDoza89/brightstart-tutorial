import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';

const ServiceCard = ({ service }) => {
	if (!service?.content) return null;
	const c = service.content;
	return (
		<article className="bg-white border border-border rounded-lg p-6 pb-7 flex flex-col gap-4">
			{c.image?.filename && (
				<div className="relative w-full aspect-[16/9] rounded-md overflow-hidden">
					<Image
						src={c.image.filename}
						alt={c.image.alt || c.title}
						fill
						sizes="(max-width: 768px) 100vw, 33vw"
						className="object-cover"
					/>
				</div>
			)}
			{c.eyebrow && (
				<p className="text-xs font-semibold tracking-[0.15em] text-teal uppercase">
					{c.eyebrow}
				</p>
			)}
			<h3 className="text-2xl font-bold text-ink leading-snug">{c.title}</h3>
			{c.description && (
				<p className="text-sm text-text-muted leading-relaxed">
					{c.description}
				</p>
			)}
		</article>
	);
};

const ServicesGrid = ({ blok }) => (
	<section className="px-16 py-24 bg-white" {...storyblokEditable(blok)}>
		<div className="max-w-3xl mx-auto text-center mb-12">
			{blok.eyebrow && (
				<p className="text-xs font-semibold tracking-[0.2em] text-teal mb-3 uppercase">
					{blok.eyebrow}
				</p>
			)}
			{blok.title && (
				<h2 className="text-5xl font-extrabold text-ink mb-4">
					{blok.title}
				</h2>
			)}
			{blok.description && (
				<p className="text-lg text-ink/70 leading-relaxed">
					{blok.description}
				</p>
			)}
		</div>
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
			{blok.services?.map((service) =>
				typeof service === 'object' && service.uuid ? (
					<ServiceCard key={service.uuid} service={service} />
				) : null,
			)}
		</div>
	</section>
);

export default ServicesGrid;
