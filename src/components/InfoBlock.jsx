import { storyblokEditable } from '@storyblok/react/rsc';

const InfoBlock = ({ blok }) => (
	<div className="flex flex-col gap-1.5" {...storyblokEditable(blok)}>
		<p className="text-sm font-semibold text-teal tracking-wider">
			{blok.title}
		</p>
		<p className="text-base text-ink whitespace-pre-line">{blok.value}</p>
	</div>
);

export default InfoBlock;
