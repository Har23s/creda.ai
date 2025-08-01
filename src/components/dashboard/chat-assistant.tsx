'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, User, Sparkles, Send, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback } from '../ui/avatar';
import Image from 'next/image';

const suggestions = [
  'Help me improve my resume for a product manager role',
  'What are some keywords for a data analyst job description?',
  'Give me tips for a behavioral interview',
];

export function ChatAssistant() {
    const [messages, setMessages] = useState([
        { from: 'bot', text: "Hello! I'm your AI career assistant. How can I help you get hired faster today?" },
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { from: 'user', text: input }]);
            // Dummy response
            setTimeout(() => {
                setMessages(prev => [...prev, { from: 'bot', text: "That's a great question! Let me look into that for you..." }]);
            }, 1000);
            setInput('');
        }
    };
    
  return (
    <Card className="flex h-[500px] flex-col">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div className="flex items-center gap-2">
            <div className="relative">
                <Bot className="h-8 w-8 text-primary" />
                <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
                    <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
                </div>
            </div>
            <h2 className="font-headline text-lg">AI Chat Assistant</h2>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
            {messages.map((message, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-3 ${message.from === 'user' ? 'justify-end' : ''}`}
                >
                    {message.from === 'bot' && <Avatar className="w-8 h-8 bg-primary/10 text-primary"><AvatarFallback><Bot className="w-5 h-5"/></AvatarFallback></Avatar>}
                    <div className={`rounded-lg px-4 py-2 max-w-[80%] ${message.from === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                        <p className="text-sm">{message.text}</p>
                    </div>
                    {message.from === 'user' && <Avatar className="w-8 h-8"><AvatarFallback><User/></AvatarFallback></Avatar>}
                </motion.div>
            ))}
        </AnimatePresence>
      </CardContent>
      <div className="border-t p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
          {suggestions.slice(0, 3).map((s) => (
            <Button key={s} variant="outline" size="sm" className="text-xs h-auto py-1.5" onClick={() => setInput(s)}>
              {s}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Input 
            placeholder="Ask me anything about your career..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="pr-10"
          />
          <Button size="icon" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7" onClick={handleSend}>
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
