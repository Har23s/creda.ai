
'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  FileText,
  PenSquare,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { TemplateGallery } from '@/components/template-gallery';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const products = [
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: 'MyJobs',
    description: 'Search roles by job title, location, remote filter, and more. Scraped in real-time, paste JD into your resume builder and our AI will improve your match instantly.',
    href: '/dashboard/my-jobs',
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'Resume Builder',
    description:
      'Craft an ATS-optimized resume in minutes. Choose a template, fill in your details, and let our AI boost your visibility with industry-specific suggestions.',
    href: '/dashboard/resume-builder',
  },
  {
    icon: <PenSquare className="h-8 w-8" />,
    title: 'Cover Letter Generator',
    description: 'Generate compelling cover letters tailored to each job description. Customize tone, structure, and keywords for maximum impact.',
    href: '/dashboard/cover-letter',
  },
];

const companies = [
  'Google',
  'Meta',
  'Netflix',
  'Vercel',
  'Stripe',
  'Notion',
  'Figma',
  'OpenAI',
  'Microsoft',
  'Apple',
];


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
];

const resumeTemplates = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Template ${i + 1}`,
  src: `https://placehold.co/300x424.png`,
  hint: `resume template`,
}));


export default function Home() {
  const marqueeVariants = {
    animate: {
      x: [0, -1090],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 15,
          ease: 'linear',
        },
      },
    },
  };
  
  const templateMarqueeVariants = {
     animate: {
      x: [0, -1920], // Adjust based on number of items and their width
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear",
        },
      },
    },
  }

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
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="flex h-full flex-col text-center">
                    <CardHeader className="items-center">
                      <div className="rounded-lg bg-primary/10 p-3 text-primary">
                        {product.icon}
                      </div>
                      <CardTitle className="font-headline text-xl">
                        {product.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">
                        {product.description}
                      </p>
                    </CardContent>
                     <div className="p-6 pt-0">
                       <Link href={product.href}>
                         <Button variant="outline">Try Now <ArrowRight className="ml-2 h-4 w-4" /></Button>
                       </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="templates" className="bg-primary/5 py-24 sm:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                10+ ATS-Optimized Templates
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Choose a professionally designed template and get started in minutes.
              </p>
            </div>
          </div>
          <div className="relative mt-12 flex w-full overflow-hidden">
            <motion.div
                className="flex"
                variants={templateMarqueeVariants}
                animate="animate"
            >
                {[...resumeTemplates, ...resumeTemplates].map((template, index) => (
                  <div key={index} className="flex-shrink-0 px-4" style={{width: '320px'}}>
                      <Image
                          src={template.src}
                          alt={template.name}
                          width={300}
                          height={424}
                          data-ai-hint={template.hint}
                          className="rounded-lg shadow-lg transition-transform hover:scale-105"
                      />
                  </div>
                ))}
            </motion.div>
          </div>
          <div className="mt-12 text-center">
            <TemplateGallery />
          </div>
        </section>

        <section id="testimonials" className="py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted by professionals at top companies
              </h2>
            </div>
             <div className="relative mt-12 flex w-full overflow-hidden">
              <motion.div
                className="flex"
                variants={marqueeVariants}
                animate="animate"
              >
                {[...companies, ...companies].map((company, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-8"
                  >
                    <span className="text-2xl font-semibold text-muted-foreground transition-colors hover:text-foreground">
                      {company}
                    </span>
                  </div>
                ))}
              </motion.div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-muted py-24 sm:py-32">
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
