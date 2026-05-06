import { storyblokEditable } from '@storyblok/react/rsc';

const iconMap = {
	sparkle: '✦',
	diamond: '◆',
	circle: '●',
	star: '★',
	heart: '♥',
	bolt: '⚡',
};

const ValueCard = ({ blok }) => (
	<div
		className="flex flex-col gap-4 bg-cream rounded-lg p-8 text-left"
		{...storyblokEditable(blok)}
	>
		<span className="text-3xl text-teal font-bold leading-none">
			{iconMap[blok.icon] || '✦'}
		</span>
		<h3 className="text-2xl font-bold text-ink">{blok.title}</h3>
		{blok.description && (
			<p className="text-base text-ink/70 leading-relaxed">
				{blok.description}
			</p>
		)}
	</div>
);

export default ValueCard;
