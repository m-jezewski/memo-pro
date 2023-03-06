interface createMutationValues {
  readonly title: string;
  readonly content: string;
  readonly uid?: string;
}

interface editMutationValues {
  readonly title?: string;
  readonly content?: string;
  readonly orderIndex?: number;
}

interface noteFormValues {
  readonly title: string;
  readonly content: string;
}

export type { createMutationValues, noteFormValues, editMutationValues };
