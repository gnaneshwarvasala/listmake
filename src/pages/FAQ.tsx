import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import LimitedInput from "@/components/LimitedInput";
import { toast } from "sonner";

const FAQ = () => {
  const [question, setQuestion] = useState('');
  const MAX_WORDS = 50;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      toast.success("Question submitted successfully!");
      setQuestion('');
    } else {
      toast.error("Please enter your question");
    }
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleQuestionChange = (value: string) => {
    const wordCount = getWordCount(value);
    if (wordCount <= MAX_WORDS) {
      setQuestion(value);
    } else {
      toast.error(`Word limit of ${MAX_WORDS} words reached`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Frequently Asked Questions</h1>
      
      <div className="space-y-8 mb-12">
        <div className="bg-card rounded-lg p-6 shadow-sm dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Common Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2 dark:text-gray-200">How do I create a new list?</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                To create a new list, simply click the "+" button on the main page. You can choose from different list types like grocery, todo, or custom lists.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 dark:text-gray-200">Can I share my lists with others?</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                Yes! Each list has a share button that allows you to share via email or generate a shareable link.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 dark:text-gray-200">How do I organize items in my list?</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                You can drag and drop items to reorder them. Lists can also be sorted alphabetically or by completion status.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Ask a Question</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="question" className="block text-sm font-medium mb-2 dark:text-gray-200">
                Your Question ({MAX_WORDS - getWordCount(question)} words remaining)
              </label>
              <LimitedInput
                id="question"
                value={question}
                onValueChange={handleQuestionChange}
                placeholder="Type your question here..."
                className="min-h-[100px] dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
                maxLength={1000} // Character limit as a fallback
              />
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {getWordCount(question)}/{MAX_WORDS} words
              </div>
            </div>
            
            <Button 
              type="submit"
              className="bg-primary hover:bg-primary-dark dark:bg-primary dark:hover:bg-primary-dark transition-colors"
            >
              Submit Question
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FAQ;