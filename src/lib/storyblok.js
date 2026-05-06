import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import Page from '@/components/Page';
import Post from '@/components/Post';
import Service from '@/components/Service';
import CaseStudy from '@/components/CaseStudy';
import CTAButton from '@/components/CTAButton';
import NavLink from '@/components/NavLink';
import ValueCard from '@/components/ValueCard';
import TeamMember from '@/components/TeamMember';
import FAQItem from '@/components/FAQItem';
import FormField from '@/components/FormField';
import InfoBlock from '@/components/InfoBlock';
import HeroIntro from '@/components/HeroIntro';
import PageHeader from '@/components/PageHeader';
import BannerImage from '@/components/BannerImage';
import ServicesGrid from '@/components/ServicesGrid';
import PostsGrid from '@/components/PostsGrid';
import FeatureSection from '@/components/FeatureSection';
import CTAStrip from '@/components/CTAStrip';
import ValuesSection from '@/components/ValuesSection';
import TeamSection from '@/components/TeamSection';
import FAQList from '@/components/FAQList';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const RESOLVE_RELATIONS = [
	'services_grid.services',
	'posts_grid.posts',
	'feature_section.reference',
];

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	components: {
		page: Page,
		post: Post,
		service: Service,
		case_study: CaseStudy,
		cta_button: CTAButton,
		nav_link: NavLink,
		value_card: ValueCard,
		team_member: TeamMember,
		faq_item: FAQItem,
		form_field: FormField,
		info_block: InfoBlock,
		hero_intro: HeroIntro,
		page_header: PageHeader,
		banner_image: BannerImage,
		services_grid: ServicesGrid,
		posts_grid: PostsGrid,
		feature_section: FeatureSection,
		cta_strip: CTAStrip,
		values_section: ValuesSection,
		team_section: TeamSection,
		faq_list: FAQList,
		contact_form: ContactForm,
		contact_info: ContactInfo,
		site_header: SiteHeader,
		site_footer: SiteFooter,
	},
	apiOptions: {
		region: process.env.STORYBLOK_REGION || 'eu',
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});
