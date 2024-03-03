export type Topic = {
  id: number;
  name: string;
  questions: Array<Question>;
};

export type Question = { id: number; content: string };
