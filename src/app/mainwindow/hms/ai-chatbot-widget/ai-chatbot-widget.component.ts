import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

@Component({
  selector: 'app-ai-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chatbot-widget.component.html',
  styleUrls: ['./ai-chatbot-widget.component.css']
})
export class AiChatbotWidgetComponent {
  isOpen = false;
  userQuery = '';
  chatHistory: ChatMessage[] = [
    {
      sender: 'bot',
      text: 'Welcome to Apex Multispecialty Hospital AI Assistant (AIIMS Level). Ask me about OPD timings, cardiologist availability, ICU beds, or emergency triage!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];

  // Localized Sub-200ms JSON-Intent Map
  private intentMap: { [key: string]: string } = {
    'opd': 'Apex OPD Hours: Monday to Saturday, 08:30 AM - 04:00 PM. Specialist registration starts at 08:00 AM at Counter 3.',
    'timing': 'OPD Registration: 08:00 AM - 01:00 PM | Visiting Hours: 04:00 PM - 07:00 PM Daily | Emergency & ICU: 24x7 Active.',
    'cardiologist': 'Chief Cardiologist Dr. Krupali Dholakiya is available in OPD Suite 101 from 09:00 AM - 01:00 PM (Mon-Fri). Emergency Angioplasty team is on 24x7 standby.',
    'neurologist': 'Dr. Janvi Ramani (Head of Neurosurgery) is currently in OT Suite 1. OPD consultations run 02:00 PM - 05:00 PM.',
    'orthopedic': 'Dr. Sejal Gond (Senior Joint Replacement Surgeon) conducts OPD on Tuesdays & Thursdays from 10:00 AM - 02:00 PM.',
    'emergency': 'CRITICAL EMERGENCY HOTLINE: Dial +91 98250 54321 / Code Red ICU. Immediate cardiac & trauma resuscitation active 24x7.',
    'icu': 'ICU & Critical Care: 18 Bed Advanced Multi-disciplinary ICU with invasive monitoring. Status: 4 Beds Available.',
    'bill': 'Central Hospital Billing Terminal: Aggregates OPD, Room Charges, OT, Pharmacy & Diagnostics. Insurance clearance is pre-processed before discharge.',
    'pharmacy': 'Apex 24x7 Central Pharmacy: Located on Ground Floor Wing B. E-prescriptions from OPD are synced automatically.'
  };

  private answeredTopics = new Set<string>();

  toggleWidget(): void {
    this.isOpen = !this.isOpen;
  }

  sendMessage(): void {
    const query = this.userQuery.trim();
    if (!query) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.chatHistory.push({ sender: 'user', text: query, timestamp: time });
    this.userQuery = '';

    // Sub-200ms Instant Intent Evaluator
    setTimeout(() => {
      const botReply = this.evaluateIntent(query);
      this.chatHistory.push({
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 120);
  }

  private evaluateIntent(query: string): string {
    const qLower = query.toLowerCase();

    for (const key of Object.keys(this.intentMap)) {
      if (qLower.includes(key)) {
        if (this.answeredTopics.has(key)) {
          return `Follow-up on ${key.toUpperCase()}: ${this.intentMap[key]} You can also speak directly with our OPD Reception desk at Extension 104.`;
        }
        this.answeredTopics.add(key);
        return this.intentMap[key];
      }
    }

    if (this.answeredTopics.has('general')) {
      return 'Apex Hospital Clinical AI is actively monitoring patient admissions, OT scheduling, and OPD desks. Please ask about OPD timings, doctors, or ICU beds.';
    }
    this.answeredTopics.add('general');
    return 'Apex Multispecialty Hospital AI Assistant: I can provide instant OPD timings, doctor availability (Dr. Krupali Dholakiya, Dr. Janvi Ramani, Dr. Sejal Gond), ICU bed status, or billing queries.';
  }
}
