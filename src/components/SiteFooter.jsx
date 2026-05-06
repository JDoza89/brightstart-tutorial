import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const SiteFooter = ({ blok }) => (
	<footer className="bg-black text-white px-16 py-16" {...storyblokEditable(blok)}>
		<div className="max-w-[1440px] mx-auto flex justify-between gap-12 flex-wrap">
			<div className="flex flex-col gap-3 max-w-sm">
				<p className="text-2xl font-extrabold">BrightStart</p>
				{blok.tagline && (
					<p className="text-base text-white/70 leading-relaxed">
						{blok.tagline}
					</p>
				)}
			</div>
			<div className="flex flex-col gap-3">
				<h4 className="font-bold text-sm mb-1 uppercase tracking-wider text-white/60">
					Site
				</h4>
				{blok.nav_links?.map((l) => (
					<StoryblokServerComponent key={l._uid} blok={l} />
				))}
			</div>
			<div className="flex flex-col gap-3">
				<h4 className="font-bold text-sm mb-1 uppercase tracking-wider text-white/60">
					Social
				</h4>
				{blok.social_links?.map((l) => (
					<StoryblokServerComponent key={l._uid} blok={l} />
				))}
			</div>
		</div>
		{blok.copyright && (
			<p className="text-sm text-white/50 text-center mt-12">
				{blok.copyright}
			</p>
		)}
	</footer>
);

export default SiteFooter;
