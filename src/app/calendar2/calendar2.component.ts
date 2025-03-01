import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar2',
  imports: [CommonModule],
  templateUrl: './calendar2.component.html',
  styleUrl: './calendar2.component.scss'
})
export class Calendar2Component implements OnInit {
   events: { [key: string]: string } = {}; // Eventos pasados desde el padre

  
  currentDate: Date = new Date();
  currentMonth: string = '';
  currentYear: string = '';
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: any[][] = [];

  ngOnInit(): void {
    const date1 = this.formatDate(new Date(2025, 3, 5));
    const date2 = this.formatDate(new Date(2025, 3, 10));
    this.events[date1] = '<span>Evento Aleatorio 1</span>';
    this.events[date2] = '<span>Evento Aleatorio 2</span>';
    this.updateCalendar();
    // Añade eventos aleatorios
    // Formatea las fechas como "MM-DD-YYYY"
  
  }

  // Actualiza el calendario según el mes y año actual
  updateCalendar(): void {
    this.currentMonth = this.getMonthName(this.currentDate.getMonth());
    this.currentYear = this.currentDate.getFullYear().toString();
    this.weeks = this.generateWeeks(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth()
    );
  }

  // Genera las semanas del mes
  generateWeeks(year: number, month: number): any[][] {
    const weeks: any[][] = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let currentWeek: any[] = [];

    // Rellenar días del mes anterior
    for (let i = 0; i < firstDay.getDay(); i++) {
      currentWeek.push(null);
    }

    // Rellenar días del mes actual
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      currentWeek.push({ date: day, fullDate: date });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Rellenar días del siguiente mes
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  }

  // Obtiene el nombre del mes
  getMonthName(month: number): string {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[month];
  }

  // Verifica si un día es hoy
  isToday(day: any): boolean {
    if (!day) return false;
    const today = new Date();
    return (
      day.fullDate.getDate() === today.getDate() &&
      day.fullDate.getMonth() === today.getMonth() &&
      day.fullDate.getFullYear() === today.getFullYear()
    );
  }

  // Verifica si un día pertenece al mes actual
  isCurrentMonth(day: any): boolean {
    if (!day) return false;
    return day.fullDate.getMonth() === this.currentDate.getMonth();
  }

  // Obtiene el evento para un día específico
  getEvent(day: any): string | null {
    if (!day) return null;
    const dateKey = this.formatDate(day.fullDate);
    return this.events[dateKey] || null;
  }

  // Formatea la fecha como "MM-DD-YYYY"
  formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  // Navega al mes anterior
  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCalendar();
  }

  // Navega al siguiente mes
  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCalendar();
  }

  // Maneja el clic en un día
  onDayClick(day: any): void {
    if (day) {
      const event = this.getEvent(day);
      if (event) {
        alert(`Event on ${this.formatDate(day.fullDate)}: ${event}`);
      }
    }
  }
}