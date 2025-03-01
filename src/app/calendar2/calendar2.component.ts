import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar2',
  imports: [CommonModule],
  templateUrl: './calendar2.component.html',
  styleUrl: './calendar2.component.scss'
})
export class Calendar2Component implements OnInit {
  events: { [key: string]: string } = {};
  
  currentDate: Date = new Date();
  currentMonth: string = '';
  currentYear: string = '';
  weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  weeks: any[][] = [];

  ngOnInit(): void {
    const date1 = this.formatDate(new Date(2025, 3, 5));
    const date2 = this.formatDate(new Date(2025, 3, 10));
    this.events[date1] = '<span>Evento Aleatorio 1</span>';
    this.events[date2] = '<span>Evento Aleatorio 2</span>';
    this.updateCalendar();
  }

  updateCalendar(): void {
    this.currentMonth = this.getMonthName(this.currentDate.getMonth());
    this.currentYear = this.currentDate.getFullYear().toString();
    this.weeks = this.generateWeeks(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth()
    );
  }

  generateWeeks(year: number, month: number): any[][] {
    const weeks: any[][] = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let currentWeek: any[] = [];

    // Ajustar el primer día para que inicie en lunes
    const firstDayIndex = (firstDay.getDay() + 6) % 7;

    for (let i = 0; i < firstDayIndex; i++) {
      currentWeek.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      currentWeek.push({
        date: day,
        fullDate: date,
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  }

  getMonthName(month: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return monthNames[month];
  }

  isToday(day: any): boolean {
    if (!day) return false;
    const today = new Date();
    return (
      day.fullDate.getDate() === today.getDate() &&
      day.fullDate.getMonth() === today.getMonth() &&
      day.fullDate.getFullYear() === today.getFullYear()
    );
  }

  isCurrentMonth(day: any): boolean {
    return day && day.fullDate.getMonth() === this.currentDate.getMonth();
  }

  getEvent(day: any): string | null {
    return day ? this.events[this.formatDate(day.fullDate)] || null : null;
  }

  formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCalendar();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCalendar();
  }

  onDayClick(day: any): void {
    if (day && !day.isWeekend) {
      const event = this.getEvent(day);
      if (event) {
        alert(`Event on ${this.formatDate(day.fullDate)}: ${event}`);
      }
    }
  }
}
