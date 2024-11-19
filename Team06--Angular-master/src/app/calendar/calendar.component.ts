import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  currentMonth: number;
  currentYear: number;
  clients: any[] = []; // Array to hold clients data
  publicHolidays: Date[] = []; // Array to hold holiday dates

  constructor(private dataService: DataService) {
    const today = new Date();
    this.currentMonth = today.getMonth(); // Start with the current month
    this.currentYear = today.getFullYear(); // Get the current year
  }

  ngOnInit(): void {
    // Load clients data when the component initializes
    this.dataService.GetAllClients().subscribe((data) => {
      this.clients = data;
    });

    // Define public holidays here
    this.publicHolidays = [
      new Date(this.currentYear, 0, 1), 
      new Date(this.currentYear, 2, 21), 
      new Date(this.currentYear, 2, 29), 
      new Date(this.currentYear, 3, 1), 
      new Date(this.currentYear, 3, 27),
      new Date(this.currentYear, 4, 1), 
      new Date(this.currentYear, 4, 29),
      new Date(this.currentYear, 5, 16),
      new Date(this.currentYear, 5, 17),
      new Date(this.currentYear, 7, 9),
      new Date(this.currentYear, 8, 24),
      new Date(this.currentYear, 11, 16), 
      new Date(this.currentYear, 11, 25), 
      new Date(this.currentYear, 11, 26), 
      
    ];
  }

   // Navigate to the previous month
   previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  // Navigate to the next month
  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

 // Method to generate the calendar days for a specific month
 getCalendarDays(): Date[] {
  const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
  const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);

  const days = [];
  // Add padding days for the first week
  for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
    days.push(new Date(this.currentYear, this.currentMonth, 1 - i));
  }

  // Add the days of the current month
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push(new Date(this.currentYear, this.currentMonth, i));
  }

  return days;
}

  // Check if the current date is today
  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  // Check if a client joined on this day
  isClientJoinDay(date: Date): boolean {
    return this.clients.some(client => {
      const clientJoinDate = new Date(client.dateJoined);
      return clientJoinDate.getDate() === date.getDate() &&
             clientJoinDate.getMonth() === date.getMonth() &&
             clientJoinDate.getFullYear() === date.getFullYear();
    });
  }

    // Check if a date is a public holiday
    isPublicHoliday(date: Date): boolean {
      return this.publicHolidays.some(holiday => {
        return holiday.getDate() === date.getDate() &&
               holiday.getMonth() === date.getMonth() &&
               holiday.getFullYear() === date.getFullYear();
      });
    }

     // Get the number of clients added on this day
  getClientsAddedOnDate(date: Date): number {
    return this.clients.filter(client => {
      const clientJoinDate = new Date(client.dateJoined);
      return clientJoinDate.getDate() === date.getDate() &&
             clientJoinDate.getMonth() === date.getMonth() &&
             clientJoinDate.getFullYear() === date.getFullYear();
    }).length;
  }

  // Tooltip for date hover
  getTooltipText(date: Date): string {
    const clientCount = this.getClientsAddedOnDate(date);


    if (clientCount) {
      return `Clients Joined: ${clientCount}`;
    } else if (this.isToday(date)) {
      return 'Today';
    } else if (this.isPublicHoliday(date)) {
      return 'Public Holiday';
    } else {
      return '';
    }
  }
}
