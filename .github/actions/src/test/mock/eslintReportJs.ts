import { ESLintReport } from '../../types';

const reportJSExpected: ESLintReport = [
  {
    filePath: '/Users/sangaywangchuk/Documents/selise/eslint-annotation/src/app/app.component.spec.ts',
    messages: [
      {
        ruleId: 'sort-imports',
        severity: 2,
        message: 'Imports should be sorted alphabetically.',
        line: 2,
        column: 1,
        nodeType: 'ImportDeclaration',
        messageId: 'sortImportsAlphabetically',
        endLine: 2,
        endColumn: 63,
      },
      {
        ruleId: 'sort-imports',
        severity: 2,
        message: 'Imports should be sorted alphabetically.',
        line: 3,
        column: 1,
        nodeType: 'ImportDeclaration',
        messageId: 'sortImportsAlphabetically',
        endLine: 3,
        endColumn: 48,
      },
      {
        ruleId: 'prettier/prettier',
        severity: 2,
        message: 'Replace `⏎········RouterTestingModule⏎······` with `RouterTestingModule`',
        line: 8,
        column: 17,
        nodeType: null,
        messageId: 'replace',
        endLine: 10,
        endColumn: 7,
        fix: { range: [280, 315], text: 'RouterTestingModule' },
      },
      {
        ruleId: 'prettier/prettier',
        severity: 2,
        message: 'Replace `⏎········AppComponent⏎······],` with `AppComponent]`',
        line: 11,
        column: 22,
        nodeType: null,
        messageId: 'replace',
        endLine: 13,
        endColumn: 9,
        fix: { range: [339, 369], text: 'AppComponent]' },
      },
      {
        ruleId: 'prettier/prettier',
        severity: 2,
        message: "Replace `'eslint-annotation·app·is·running!'` with `⏎······'eslint-annotation·app·is·running!'⏎····`",
        line: 33,
        column: 76,
        nodeType: null,
        messageId: 'replace',
        endLine: 33,
        endColumn: 111,
        fix: {
          range: [1058, 1093],
          text: "\n      'eslint-annotation app is running!'\n    ",
        },
      },
    ],
    errorCount: 5,
    warningCount: 0,
    fixableErrorCount: 3,
    fixableWarningCount: 0,
    source:
      "import { TestBed } from '@angular/core/testing';\nimport { RouterTestingModule } from '@angular/router/testing';\nimport { AppComponent } from './app.component';\n\ndescribe('AppComponent', () => {\n  beforeEach(async () => {\n    await TestBed.configureTestingModule({\n      imports: [\n        RouterTestingModule\n      ],\n      declarations: [\n        AppComponent\n      ],\n    }).compileComponents();\n  });\n\n  it('should create the app', () => {\n    const fixture = TestBed.createComponent(AppComponent);\n    const app = fixture.componentInstance;\n    expect(app).toBeTruthy();\n  });\n\n  it(`should have as title 'eslint-annotation'`, () => {\n    const fixture = TestBed.createComponent(AppComponent);\n    const app = fixture.componentInstance;\n    expect(app.title).toEqual('eslint-annotation');\n  });\n\n  it('should render title', () => {\n    const fixture = TestBed.createComponent(AppComponent);\n    fixture.detectChanges();\n    const compiled = fixture.nativeElement as HTMLElement;\n    expect(compiled.querySelector('.content span')?.textContent).toContain('eslint-annotation app is running!');\n  });\n});\n",
    usedDeprecatedRules: [],
  },
];

export default reportJSExpected;
