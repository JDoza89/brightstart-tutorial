import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';

const TeamMember = ({ blok }) => (
	<div
		className="flex flex-col items-center gap-3"
		{...storyblokEditable(blok)}
	>
		{blok.photo?.filename && (
			<div className="relative w-[140px] h-[140px] rounded-full overflow-hidden">
				<Image
					src={blok.photo.filename}
					alt={blok.photo.alt || blok.name}
					fill
					sizes="140px"
					className="object-cover"
				/>
			</div>
		)}
		<p className="font-bold text-base text-ink">{blok.name}</p>
		{blok.role && <p className="text-sm text-text-muted">{blok.role}</p>}
	</div>
);

export default TeamMember;
