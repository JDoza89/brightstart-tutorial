import './globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';

export const metadata = {
	title: 'BrightStart',
	description: 'Where creativity meets joy.',
};

export default function RootLayout({ children }) {
	return (
		<StoryblokProvider>
			<html lang="en">
				<body className="font-sans text-ink antialiased bg-cream">{children}</body>
			</html>
		</StoryblokProvider>
	);
}
