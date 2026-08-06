import { DatePipe, UpperCasePipe, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface AdminLead {
  id: string;
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  city: string;
  requirementKey: string;
  preferredLanguage: 'en' | 'te';
  message: string;
  consentGiven: boolean;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  submittedAt: string;
}

const STORAGE_KEY = 'pratyusha_submitted_leads';

@Component({
  selector: 'app-admin-leads-page',
  standalone: true,
  imports: [DatePipe, FormsModule, UpperCasePipe],
  templateUrl: './admin-leads-page.html',
  styleUrl: './admin-leads-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLeadsPage {
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly leads = signal<AdminLead[]>(this.loadLeads());
  protected readonly activeFilter = signal<'all' | 'new' | 'contacted' | 'converted' | 'closed'>('all');
  protected readonly searchQuery = signal('');

  protected get filteredLeads(): AdminLead[] {
    let list = this.leads();
    const filter = this.activeFilter();
    const query = this.searchQuery().toLowerCase().trim();

    if (filter !== 'all') {
      list = list.filter((lead) => lead.status === filter);
    }

    if (query) {
      list = list.filter(
        (lead) =>
          lead.fullName.toLowerCase().includes(query) ||
          lead.mobileNumber.includes(query) ||
          lead.city.toLowerCase().includes(query) ||
          lead.requirementKey.toLowerCase().includes(query),
      );
    }

    return list;
  }

  protected countByStatus(status: AdminLead['status']): number {
    return this.leads().filter((l) => l.status === status).length;
  }

  protected updateStatus(leadId: string, newStatus: AdminLead['status']): void {
    this.leads.update((current) => {
      const next = current.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead));
      this.persistLeads(next);
      return next;
    });
  }

  protected deleteLead(leadId: string): void {
    if (confirm('Are you sure you want to delete this enquiry record?')) {
      this.leads.update((current) => {
        const next = current.filter((lead) => lead.id !== leadId);
        this.persistLeads(next);
        return next;
      });
    }
  }

  protected whatsappUrl(lead: AdminLead): string {
    const text = `Hello ${lead.fullName},\n\nThank you for reaching out to Pratyusha regarding your enquiry for ${lead.requirementKey}.\nHow can we assist you today?`;
    return `https://wa.me/91${lead.mobileNumber.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
  }

  protected exportCsv(): void {
    const rows = this.leads();
    if (rows.length === 0) return;

    const headers = ['ID', 'Full Name', 'Mobile Number', 'Email', 'City', 'Requirement', 'Language', 'Status', 'Submitted At'];
    const csvContent = [
      headers.join(','),
      ...rows.map((r) =>
        [
          `"${r.id}"`,
          `"${r.fullName}"`,
          `"${r.mobileNumber}"`,
          `"${r.emailAddress || ''}"`,
          `"${r.city || ''}"`,
          `"${r.requirementKey}"`,
          `"${r.preferredLanguage}"`,
          `"${r.status}"`,
          `"${r.submittedAt}"`,
        ].join(','),
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `enquiries_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private loadLeads(): AdminLead[] {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return parsed.map((item: Partial<AdminLead>) => ({
            id: item.id || String(Date.now()),
            fullName: item.fullName || 'Anonymous',
            mobileNumber: item.mobileNumber || '',
            emailAddress: item.emailAddress || '',
            city: item.city || '',
            requirementKey: item.requirementKey || 'general',
            preferredLanguage: item.preferredLanguage || 'en',
            message: item.message || '',
            consentGiven: Boolean(item.consentGiven),
            status: item.status || 'new',
            submittedAt: item.submittedAt || new Date().toISOString(),
          }));
        }
      } catch (err) {
        console.warn('Failed to parse leads', err);
      }
    }
    return [];
  }

  private persistLeads(leads: AdminLead[]): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
      } catch (err) {
        console.warn('Failed to save leads', err);
      }
    }
  }
}
