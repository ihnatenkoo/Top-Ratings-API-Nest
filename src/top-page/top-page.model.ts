import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TopLevelCategory {
  Courses = 'courses',
  Services = 'services',
  Books = 'books',
  Products = 'products',
}

class Advantages {
  title: string;
  description: string;
}
class VacanciesStats {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
}

@Schema({ versionKey: false, collection: 'top-pages' })
export class TopPageModel {
  @Prop()
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop()
  vacancies?: VacanciesStats;

  @Prop()
  advantages: Advantages;

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop()
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel).index({
  title: 'text',
  seoText: 'text',
});
