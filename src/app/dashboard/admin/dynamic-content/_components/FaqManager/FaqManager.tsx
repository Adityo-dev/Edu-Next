'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const MOCK_FAQS = [
  {
    id: 1,
    question: 'How do I reset my password?',
    answer: 'You can reset your password from the settings page.',
    status: 'Active',
  },
  {
    id: 2,
    question: 'What payment methods are supported?',
    answer: 'We support Visa, MasterCard, and bKash.',
    status: 'Active',
  },
];

const FaqManager = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>FAQ Management</CardTitle>
          <CardDescription>Manage frequently asked questions for the website.</CardDescription>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add FAQ
        </Button>
      </CardHeader>
      <CardContent>
        <div className="border-border overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="p-4 font-medium">Question</th>
                <th className="p-4 font-medium">Answer</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_FAQS.map((faq) => (
                <tr key={faq.id} className="border-border hover:bg-muted/50 border-t">
                  <td className="p-4 font-medium">{faq.question}</td>
                  <td className="text-muted-foreground max-w-[300px] truncate p-4">{faq.answer}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {faq.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {MOCK_FAQS.length === 0 && (
            <div className="text-muted-foreground p-8 text-center">
              No FAQs found. Add one to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FaqManager;
