import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  FileText,
  Linkedin,
  Mail,
  PenSquare,
  Twitter,
  Youtube,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const features = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'Resume Builder',
    description:
      'Create ATS-optimized resumes that get you noticed by recruiters.',
    video_hint: 'resume builder interface',
  },
  {
    icon: <PenSquare className="h-8 w-8" />,
    title: 'CV Builder',
    description:
      'Build professional academic CVs for research and teaching positions.',
    video_hint: 'cv builder interface',
  },
  {
    icon: <Mail className="h-8 w-8" />,
    title: 'Cover Letter',
    description:
      'Generate personalized cover letters that highlight your strengths.',
    video_hint: 'cover letter generation',
  },
  {
    icon: <Linkedin className="h-8 w-8" />,
    title: 'LinkedIn Optimizer',
    description:
      'Optimize your LinkedIn profile to attract more career opportunities.',
    video_hint: 'linkedin profile optimization',
  },
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: 'MyJobs',
    description: 'Discover relevant jobs and track your applications with ease.',
    video_hint: 'job search dashboard',
  },
];

const testimonials = [
  {
    name: 'Sarah L.',
    title: 'Software Engineer',
    quote:
      "Creda.ai's resume builder helped me land my dream job at a FAANG company. The ATS score feature is a game-changer!",
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman smiling',
    before: 'https://placehold.co/300x400.png',
    beforeHint: 'resume old',
    after: 'https://placehold.co/300x400.png',
    afterHint: 'resume new',
  },
  {
    name: 'Michael B.',
    title: 'Product Manager',
    quote:
      'The LinkedIn optimizer gave me actionable feedback that significantly increased my profile views from recruiters. Highly recommended!',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man portrait',
    before: 'https://placehold.co/300x400.png',
    beforeHint: 'linkedin profile',
    after: 'https://placehold.co/300x400.png',
    afterHint: 'optimized linkedin',
  },
  {
    name: 'Jessica P.',
    title: 'UX Designer',
    quote:
      'As a designer, aesthetics matter. Creda.ai offers beautiful templates that are also functional and ATS-friendly.',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman professional',
    before: 'https://placehold.co/300x400.png',
    beforeHint: 'design resume',
    after: 'https://placehold.co/300x400.png',
    afterHint: 'professional resume',
  },
];

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: ' / month',
    description: 'For getting started',
    features: [
      '1 Resume',
      'Basic Templates',
      'Limited AI Suggestions',
      '10 Job Searches/day',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$15',
    period: ' / month',
    description: 'For power users',
    features: [
      'Unlimited Resumes & CVs',
      'All Premium Templates',
      'Full AI-Powered Suggestions',
      'Unlimited Job Searches',
      'LinkedIn Optimization',
      'Cover Letter Generator',
    ],
    cta: 'Subscribe',
  },
  {
    name: 'Lifetime',
    price: '$199',
    period: ' one-time',
    description: 'For your entire career',
    features: [
      'All Pro features, forever',
      'Priority Support',
      'Early access to new features',
    ],
    cta: 'Get Lifetime Access',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section
          id="hero"
          className="relative overflow-hidden py-20 md:py-32"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-primary/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          />
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              One platform. All tools.
              <br />
              <span className="text-primary">Get hired faster with AI.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Build ATS-optimized resumes, craft perfect cover letters, and
              optimize your LinkedIn profile with our AI-powered career
              platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="#pricing">
                <Button size="lg" variant="ghost">
                  See Pricing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to land your next role
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Creda.ai provides a comprehensive suite of tools to supercharge
                your job hunt.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                    <div className="mt-4 overflow-hidden rounded-lg">
                      <Image
                        src="https://placehold.co/600x400.png"
                        alt={`${feature.title} demonstration`}
                        width={600}
                        height={400}
                        data-ai-hint={feature.video_hint}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="guide" className="bg-primary/5 py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                An interactive guide to our core features. Hover to see them in
                action.
              </p>
            </div>
            <Tabs defaultValue="resume" className="mt-12 w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                {features.map((feature) => (
                  <TabsTrigger
                    key={feature.title}
                    value={feature.title.toLowerCase().replace(' ', '-')}
                  >
                    {feature.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {features.map((feature) => (
                <TabsContent
                  key={feature.title}
                  value={feature.title.toLowerCase().replace(' ', '-')}
                  className="mt-8"
                >
                  <Card className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-8">
                        <h3 className="font-headline text-2xl font-semibold">
                          {feature.title}
                        </h3>
                        <p className="mt-4 text-muted-foreground">
                          {feature.description} Learn how to use our powerful AI
                          to craft the perfect application materials and find
                          your dream job. This is a brief summary of how this amazing feature will change your life.
                        </p>
                      </div>
                      <div className="group relative h-64 md:h-full">
                        <Image
                          src="https://placehold.co/800x600.png"
                          alt={`${feature.title} in action`}
                          layout="fill"
                          objectFit="cover"
                          data-ai-hint={`${feature.video_hint} screencast`}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section id="testimonials" className="py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Loved by professionals worldwide
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Don&apos;t just take our word for it. Hear from users who have
                transformed their careers with Creda.ai.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="flex flex-col">
                  <CardContent className="flex-1 p-6">
                    <p className="text-muted-foreground">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          data-ai-hint={testimonial.dataAiHint}
                        />
                        <AvatarFallback>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4 bg-muted/50 p-4">
                    <div className="flex-1 text-center">
                      <p className="text-sm font-medium">Before</p>
                      <Image
                        src={testimonial.before}
                        alt="Before using Creda.ai"
                        width={150}
                        height={200}
                        data-ai-hint={testimonial.beforeHint}
                        className="mt-2 mx-auto rounded-md border"
                      />
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-sm font-medium">After</p>
                      <Image
                        src={testimonial.after}
                        alt="After using Creda.ai"
                        width={150}
                        height={200}
                        data-ai-hint={testimonial.afterHint}
                        className="mt-2 mx-auto rounded-md border"
                      />
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-primary/5 py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Choose the plan that&apos;s right for you. Get started for free.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`flex flex-col ${plan.name === 'Pro' ? 'border-primary shadow-2xl' : ''}`}
                >
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">
                      {plan.name}
                    </CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex items-baseline gap-x-2">
                      <span className="text-4xl font-bold tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-5 flex-none text-primary"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/signup" className="w-full">
                      <Button
                        className="w-full"
                        variant={plan.name === 'Pro' ? 'default' : 'outline'}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
