import { v4 as uuidv4 } from "uuid";

export interface BlogData {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
}

export const blogPosts: BlogData[] = [
  {
    id: uuidv4(),
    title: "Introduction to TypeScript",
    content:
      "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.TypeScript is a typed superset of JavaScript that adds optional static typing to the language. This means you can define the types of variables, functions, and objects in your code, catching potential errors at compile time rather than runtime. While JavaScript is dynamically typed, TypeScript introduces static typing to improve code readability, maintainability, and scalability.",
    author: "John Doe",
    date: "2023-10-01",
    tags: ["#Programming", "#Software"],
  },
  {
    id: uuidv4(),
    title: "Advanced TypeScript Features",
    content:
      "Explore advanced features of TypeScript such as decorators, generics, and more.One of the key benefits of TypeScript is its ability to provide better tooling and code completion. With static typing, code editors and IDEs can offer more accurate suggestions, making development faster and reducing the likelihood of errors. Additionally, TypeScript's type system can help prevent common programming mistakes like null pointer exceptions and type mismatches.",
    author: "Jane Smith",
    date: "2023-10-05",
    tags: ["#Programming", "#Coding"],
  },
  
];
