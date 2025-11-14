import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Mail, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const EmailModal = ({ isOpen, onClose, customer }) => {
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!subject || !message) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in subject and message',
        variant: 'destructive'
      });
      return;
    }

    setSending(true);
    
    // Simulate sending email
    setTimeout(() => {
      toast({
        title: 'Email Sent!',
        description: `Message sent to ${customer.name} at ${customer.email || customer.phone}`,
      });
      setSending(false);
      setSubject('');
      setMessage('');
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Send Message to Customer
          </DialogTitle>
          <DialogDescription>
            Sending to: {customer?.name} ({customer?.email || customer?.phone})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g., Booking Confirmation Update"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Quick Templates:</strong>
            </p>
            <div className="mt-2 space-y-1">
              <button
                onClick={() => setMessage('Hi ' + customer?.name + ', your booking has been confirmed. We will arrive at the scheduled time. Thank you!')}
                className="text-sm text-blue-600 hover:text-blue-700 block"
              >
                • Booking Confirmed
              </button>
              <button
                onClick={() => setMessage('Hi ' + customer?.name + ', we are on our way to your location. Expected arrival in 15 minutes.')}
                className="text-sm text-blue-600 hover:text-blue-700 block"
              >
                • On The Way
              </button>
              <button
                onClick={() => setMessage('Hi ' + customer?.name + ', thank you for choosing Pure Gold Solutions! We hope you are satisfied with our service.')}
                className="text-sm text-blue-600 hover:text-blue-700 block"
              >
                • Thank You
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSend}
            disabled={sending}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            {sending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;
