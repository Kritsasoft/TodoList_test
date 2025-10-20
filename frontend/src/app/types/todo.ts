export type TodoType = 'study' | 'exercise' | 'work' | 'personal' | 'others';

export type Todo ={
     id: string;
     text: string;
     completed: boolean;
     createdAt: string;
     date: string;
     type: TodoType;
};

