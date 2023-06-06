export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class TopPageModel {
  firstCategory: TopLevelCategory;
  secondCategory: string;
  title: string;
  category: string;
  vacancies?: {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
  };
  advantages: Array<{
    title: string;
    description: string;
  }>;
  seoText: string;
  tagsTitle: string;
  tags: string[];
}
