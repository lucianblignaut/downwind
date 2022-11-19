import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>
  let app: AppComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance
  })

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should apply the opened class to the sidenav container', () => {
    app.openNav = true
    const container: HTMLElement = fixture.debugElement.query(By.css('[data-testid="sidenav-container"]')).nativeElement
    fixture.detectChanges()
    expect(container.classList).toContain('opened')
  })

  it('should apply the mobile class to the sidenav container', () => {
    app.isMobile = true
    const container: HTMLElement = fixture.debugElement.query(By.css('[data-testid="sidenav-container"]')).nativeElement
    fixture.detectChanges()
    expect(container.classList).toContain('mobile')
  })
});
