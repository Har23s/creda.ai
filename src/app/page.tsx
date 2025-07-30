
'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  FileText,
  Linkedin,
  PenSquare,
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
  CardHeader,
  CardTitle,
  CardFooter,
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
      'Craft an ATS-optimized resume in minutes. Choose a template, fill in your details, and let our AI boost your visibility with industry-specific suggestions.',
    video_hint: 'resume builder interface',
    href: '/dashboard/resume-builder',
  },
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: 'MyJobs',
    description: 'Search roles by job title, location, remote filter, and more. Scraped in real-time, paste JD into your resume builder and our AI will improve your match instantly.',
    video_hint: 'job search dashboard',
    href: '/dashboard/my-jobs',
  },
];

const testimonials = [
  {
    companyLogo: 'https://placehold.co/100x40.png',
    companyLogoHint: 'company logo',
    jobRole: 'Front-End Developer',
    companyName: 'Amazon',
  },
    {
    companyLogo: 'https://placehold.co/100x40.png',
    companyLogoHint: 'company logo',
    jobRole: 'Product Manager',
    companyName: 'Google',
  },
    {
    companyLogo: 'https://placehold.co/100x40.png',
    companyLogoHint: 'company logo',
    jobRole: 'UX/UI Designer',
    companyName: 'Figma',
  },
    {
    companyLogo: 'https://placehold.co/100x40.png',
    companyLogoHint: 'company logo',
    jobRole: 'Backend Engineer',
    companyName: 'Stripe',
  },
    {
    companyLogo: 'https://placehold.co/100x40.png',
    companyLogoHint: 'company logo',
    jobRole: 'Data Scientist',
    companyName: 'Netflix',
  },
]


const faqs = [
  {
    question: 'What is Creda.ai?',
    answer:
      'Creda.ai is an AI-powered platform designed to help job seekers create ATS-optimized resumes and professional CVs. We also offer tools to discover relevant job opportunities.',
  },
  {
    question: 'How does the AI resume optimization work?',
    answer:
      'Our AI analyzes your resume against the job description you provide. It identifies missing keywords, suggests improvements for your bullet points, and provides an ATS score to help you understand how well your resume matches the role.',
  },
  {
    question: 'Can I use Creda.ai for free?',
    answer:
      'Yes, we offer a free plan that allows you to create one resume and access basic templates. For unlimited access to all features, you can upgrade to our Pro plan.',
  },
  {
    question: 'What is an ATS and why is it important?',
    answer:
      'An Applicant Tracking System (ATS) is a software application that enables the electronic handling of recruitment needs. Many companies use ATS to filter candidates based on keywords and formatting. Our platform helps you create resumes that are optimized to pass through these systems.',
  },
  {
    question: 'Can I create a CV for academic purposes?',
    answer:
      'Absolutely! Our platform is also designed for academic and research positions, with dedicated sections for publications, research experience, awards, and more.',
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
            className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-purple-500/5 to-accent/10 animate-[gradient-xy_10s_ease_infinite]"
            style={{
                backgroundSize: '200% 200%',
            }}
          />
          <div className="container mx-auto px-4 text-center">
             <motion.h1
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-headline text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              <motion.span initial={{fontWeight: 400}} animate={{fontWeight: 700}} transition={{duration: 0.5, delay: 0.5}}>One</motion.span> platform. All tools.
              <br />
              <motion.span
                initial={{ backgroundSize: '0% 100%' }}
                animate={{ backgroundSize: '100% 100%' }}
                transition={{ duration: 1, ease: 'easeInOut', delay: 0.8 }}
                className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent"
                style={{ backgroundRepeat: 'no-repeat' }}
              >
                Get hired faster with AI.
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-6 text-lg leading-8 text-muted-foreground"
            >
              Build ATS-optimized resumes and optimize your LinkedIn profile with our AI-powered career platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
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
            <div className="mt-16 space-y-24">
              {products.map((product, index) => (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col gap-8 md:flex-row md:items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2">
                    <div className="flex items-center gap-4">
                      <motion.div
                        initial={{scale: 0}}
                        whileInView={{scale: 1}}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-lg bg-primary/10 p-3 text-primary">
                        {product.icon}
                      </motion.div>
                      <h3 className="font-headline text-2xl font-semibold">
                        {product.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      {product.description}
                    </p>
                    <Link href={product.href} className="mt-4 inline-block">
                        <Button variant="outline">Try Now <ArrowRight className="ml-2 h-4 w-4" /></Button>
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-primary/5 py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted by professionals at top companies
              </h2>
            </div>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="mt-12 w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="group relative basis-1/2 md:basis-1/3 lg:basis-1/5"
                  >
                    <Card className="flex h-full flex-col items-center justify-center p-6 text-center">
                      <Image
                        src={testimonial.companyLogo}
                        alt={`${testimonial.companyName} logo`}
                        width={100}
                        height={40}
                        data-ai-hint={testimonial.companyLogoHint}
                        className="mb-4"
                      />
                      <p className='font-semibold'>{testimonial.jobRole}</p>
                      <p className='text-sm text-muted-foreground'>{testimonial.companyName}</p>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
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
