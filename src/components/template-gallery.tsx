
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight } from 'lucide-react';

const allTemplates = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `Pro Template ${i + 1}`,
  src: `https://placehold.co/300x424.png`,
  hint: 'resume template professional',
}));

export function TemplateGallery() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Choose Your Template</Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            Select a Template
          </DialogTitle>
          <DialogDescription>
            Choose a professionally designed, ATS-friendly template to start
            building your resume.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[70vh]">
          <div className="grid grid-cols-2 gap-6 p-4 sm:grid-cols-3 md:grid-cols-4">
            {allTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative"
              >
                <Image
                  src={template.src}
                  alt={template.name}
                  width={300}
                  height={424}
                  data-ai-hint={template.hint}
                  className="rounded-lg border shadow-md"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="font-bold text-white">{template.name}</p>
                  <Link href="/dashboard/resume-builder" className="mt-4">
                    <Button>
                      Use This Template <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
