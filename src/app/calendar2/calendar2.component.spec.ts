import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calendar2Component } from './calendar2.component';
import {CalendarDay} from './calendar2.component';

describe('Calendar2Component', () => {
  let component: Calendar2Component;
  let fixture: ComponentFixture<Calendar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calendar2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calendar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with current date and events', () => {
    expect(component.currentDate).toBeTruthy();
    expect(component.events.size).toBeGreaterThan(0);
  });

  it('should update calendar on initialization', () => {
    spyOn(component, 'updateCalendar');
    component.ngOnInit();
    expect(component.updateCalendar).toHaveBeenCalled();
  });

  it('should generate weeks correctly', () => {
    const weeks = component.generateWeeks(2023, 9); // October 2023
    expect(weeks.length).toBeGreaterThan(0);
    expect(weeks[0].length).toBe(7);
  });

  it('should get month name correctly', () => {
    expect(component.getMonthName(0)).toBe('January');
    expect(component.getMonthName(11)).toBe('December');
  });

  it('should check if a day is today', () => {
    const today = new Date();
    const day: CalendarDay = { date: today.getDate(), fullDate: today, isWeekend: false };
    expect(component.isToday(day)).toBeTrue();
  });

  it('should check if a day is in the current month', () => {
    const day: CalendarDay = { date: 1, fullDate: new Date(2023, 9, 1), isWeekend: false };
    component.currentDate = new Date(2023, 9, 1);
    expect(component.isCurrentMonth(day)).toBeTrue();
  });

  it('should get event for a specific day', () => {
    const eventDate = new Date(2025, 3, 5);
    const event = component.getEvent({ date: 5, fullDate: eventDate, isWeekend: false });
    expect(event).toContain('Evento Aleatorio 1');
  });

  it('should format date correctly', () => {
    const date = new Date(2023, 9, 1);
    expect(component.formatDate(date)).toBe('10-01-2023');
  });

  it('should navigate to previous month', () => {
    const initialDate = new Date(component.currentDate);
    component.prevMonth();
    expect(component.currentDate.getMonth()).toBe(initialDate.getMonth() - 1);
  });

  it('should navigate to next month', () => {
    const initialDate = new Date(component.currentDate);
    component.nextMonth();
    expect(component.currentDate.getMonth()).toBe(initialDate.getMonth() + 1);
  });

  it('should handle day click with event', () => {
    const day: CalendarDay = { date: 5, fullDate: new Date(2025, 3, 5), isWeekend: false };
    spyOn(window, 'alert');
    component.onDayClick(day);
    expect(window.alert).toHaveBeenCalledWith('Event on 04-05-2025: <span>Evento Aleatorio 1</span>');
  });

  it('should handle day click without event', () => {
    const day: CalendarDay = { date: 6, fullDate: new Date(2025, 3, 6), isWeekend: false };
    spyOn(window, 'alert');
    component.onDayClick(day);
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should handle day click on weekend', () => {
    const day: CalendarDay = { date: 7, fullDate: new Date(2025, 3, 7), isWeekend: true };
    spyOn(window, 'alert');
    component.onDayClick(day);
    expect(window.alert).not.toHaveBeenCalled();
  });
});