import { renderToString } from 'react-dom/server';
import { CaseStudyPage } from './components/case-study/CaseStudyPage';
import { ResumePage } from './components/ResumePage';

export function renderCaseStudy() {
  return renderToString(<CaseStudyPage onBackToPortfolio={() => {}} />);
}

export function renderResume() {
  return renderToString(<ResumePage onBackToPortfolio={() => {}} />);
}
