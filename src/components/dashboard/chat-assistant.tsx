import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

const chatHistory = [
  { question: "How can I improve my resume's impact?", answer: "Try using more action verbs and quantifying your achievements with numbers..." },
  { question: "What are some in-demand skills for a product manager?", answer: "Data analysis, user research, and strategic thinking are key skills..." },
  { question: "Should I write a cover letter for every application?", answer: "Yes, tailoring a cover letter shows genuine interest and can set you apart..." },
];

export function ChatAssistant() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Chat Assistant</CardTitle>
        <CardDescription>Get instant career advice.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {chatHistory.slice(0, 3).map((chat, index) => (
          <div key={index} className="text-sm">
            <p className="font-semibold text-muted-foreground">You: {chat.question}</p>
            <p className="mt-1">AI: {chat.answer}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
            <Bot className="mr-2 h-4 w-4" /> Open AI Job Chatbot
        </Button>
      </CardFooter>
    </Card>
  );
}
