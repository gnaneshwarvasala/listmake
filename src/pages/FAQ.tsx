import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import LimitedInput from "@/components/LimitedInput";
import { toast } from "sonner";

const FAQ = () => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      toast.success("Question submitted successfully!");
      setQuestion('');
    } else {
      toast.error("Please enter your question");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-8 mb-12">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Common Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">How do I create a new list?</h3>
              <p className="text-muted-foreground">
                To create a new list, simply click the "+" button on the main page. You can choose from different list types like grocery, todo, or custom lists.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Can I share my lists with others?</h3>
              <p className="text-muted-foreground">
                Yes! Each list has a share button that allows you to share via email or generate a shareable link.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">How do I organize items in my list?</h3>
              <p className="text-muted-foreground">
                You can drag and drop items to reorder them. Lists can also be sorted alphabetically or by completion status.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="question" className="block text-sm font-medium mb-2">
                Your Question
              </label>
              <Textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here..."
                className="min-h-[100px]"
                maxLength={500}
              />
              <div className="char-counter mt-1">
                {question.length}/500 characters
              </div>
            </div>
            
            <Button type="submit">
              Submit Question
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FAQ;