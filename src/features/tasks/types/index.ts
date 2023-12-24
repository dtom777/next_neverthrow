export type CreatingTask = {
  title: string;
  description?: string | null;
};

export type EditingTask = {
  id: number;
  title: string;
  description?: string | null;
};
