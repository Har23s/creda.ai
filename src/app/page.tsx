
'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  FileText,
  Linkedin,
  PenSquare,
  ChevronDown,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const products = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'Resume Builder',
    description:
      'Create ATS-optimized resumes that get you noticed by recruiters.',
    video_hint: 'resume builder interface',
    href: '/dashboard/resume-builder',
  },
  {
    icon: <PenSquare className="h-8 w-8" />,
    title: 'Cover Letter',
    description: 'Generate compelling cover letters tailored to each job application.',
    video_hint: 'cover letter generation',
    href: '/dashboard/cover-letter'
  },
  {
    icon: <Linkedin className="h-8 w-8" />,
    title: 'LinkedIn Optimizer',
    description:
      'Optimize your LinkedIn profile to attract more career opportunities.',
    video_hint: 'linkedin profile optimization',
    href: '/dashboard/linkedin-optimizer',
  },
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: 'MyJobs',
    description: 'Discover relevant jobs and track your applications with ease.',
    video_hint: 'job search dashboard',
    href: '/dashboard/my-jobs',
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
    price: '$199',
    period: ' one-time',
    description: 'For your entire career',
    features: [
      'Unlimited Resumes & CVs',
      'All Premium Templates',
      'Full AI-Powered Suggestions',
      'Unlimited Job Searches',
      'LinkedIn Optimization',
      'Cover Letter Generator',
      'Priority Support',
      'Early access to new features',
    ],
    cta: 'Get Lifetime Access',
  },
];

const templates = [
  { name: 'Classic', hint: 'resume template' },
  { name: 'Modern', hint: 'resume template' },
  { name: 'Minimalist', hint: 'resume template' },
  { name: 'Professional', hint: 'resume template' },
  { name: 'Creative', hint: 'resume template' },
  { name: 'Academic', hint: 'cv template' },
];

const faqs = [
  {
    question: 'What is Creda.ai?',
    answer:
      'Creda.ai is an AI-powered platform designed to help job seekers create ATS-optimized resumes, professional CVs, and compelling cover letters. We also offer tools to optimize your LinkedIn profile and discover relevant job opportunities.',
  },
  {
    question: 'How does the AI resume optimization work?',
    answer:
      'Our AI analyzes your resume against the job description you provide. It identifies missing keywords, suggests improvements for your bullet points, and provides an ATS score to help you understand how well your resume matches the role.',
  },
  {
    question: 'Can I use Creda.ai for free?',
    answer:
      'Yes, we offer a free plan that allows you to create one resume, access basic templates, and get limited AI suggestions. For unlimited access to all features, you can upgrade to our Pro plan.',
  },
  {
    question: 'What is an ATS and why is it important?',
    answer:
      'An Applicant Tracking System (ATS) is a software application that enables the electronic handling of recruitment needs. Many companies use ATS to filter candidates based on keywords and formatting. Our platform helps you create resumes that are optimized to pass through these systems.',
  },
  {
    question: 'Can I create a CV for academic purposes?',
    answer:
      'Absolutely! Our CV builder is specifically designed for academic and research positions, with dedicated sections for publications, research experience, awards, and more.',
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
             <motion.h1
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-headline text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              One platform. All tools.
              <br />
              <motion.span
                initial={{ backgroundSize: '0% 100%' }}
                animate={{ backgroundSize: '100% 100%' }}
                transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
                className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent"
                style={{ backgroundRepeat: 'no-repeat' }}
              >
                Get hired faster with AI.
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-6 text-lg leading-8 text-muted-foreground"
            >
              Build ATS-optimized resumes, craft perfect cover letters, and
              optimize your LinkedIn profile with our AI-powered career
              platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link href="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section id="products" className="py-24 sm:py-32">
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
            <div className="mt-16 space-y-16">
              {products.map((product, index) => (
                <div
                  key={product.title}
                  className={`flex flex-col gap-8 md:flex-row md:items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-3 text-primary">
                        {product.icon}
                      </div>
                      <h3 className="font-headline text-2xl font-semibold">
                        {product.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      {product.description}
                    </p>
                    <Link href={product.href} className="mt-4 inline-block">
                        <Button variant="outline">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </Link>
                  </div>
                  <div className="md:w-1/2">
                    <div className="group relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src="https://placehold.co/800x450.png"
                        alt={`${product.title} demonstration`}
                        width={800}
                        height={450}
                        data-ai-hint={product.video_hint}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                       <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <p className="text-white font-bold text-lg">See how it works</p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="templates" className="bg-primary/5 py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Stunning Templates
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Choose from a variety of professionally designed templates that
                are optimized for ATS.
              </p>
            </div>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="mt-12 w-full"
            >
              <CarouselContent>
                {templates.map((template, index) => (
                  <CarouselItem
                    key={index}
                    className="group relative basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                      <Image
                        src="https://placehold.co/300x400.png"
                        alt={template.name}
                        width={300}
                        height={400}
                        data-ai-hint={template.hint}
                        className="rounded-lg border-2 border-transparent transition-all group-hover:border-primary group-hover:shadow-2xl"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/60 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                        <h3 className="text-center font-bold text-white">
                          {template.name}
                        </h3>
                         <div className="mt-4 flex flex-col gap-2">
                           <Link href="/dashboard/resume-builder">
                            <Button size="sm">Edit as Resume</Button>
                           </Link>
                           <Link href="/dashboard/resume-builder">
                            <Button size="sm" variant="secondary">Edit as CV</Button>
                           </Link>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
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
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
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
                        <li key={`${plan.name}-${feature}`} className="flex gap-x-3">
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
        
        <section id="faq" className="py-24 sm:py-32">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Have questions? We have answers.
              </p>
            </div>
            <Accordion type="single" collapsible className="mt-12 w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
