import type { Course } from "@/lib/courses";

/*
  The lessons in each course. Lesson content isn't written yet, so titles and summaries are
  placeholders in [brackets]; the course page's outline and the lesson pages both read from here.
  Lesson 1 is the preview anyone signed in can open; the rest need the access code.
*/

export interface Lesson { n: number; title: string; summary?: string; minutes?: string; task?: boolean }

export function lessonsFor(c: Course): Lesson[] {
  if (c.type === "template") {
    return ["The template file", "A prompt for every slide", "Example: a finished deck", "How to adapt it to your business"]
      .map((title, i) => ({ n: i + 1, title }));
  }
  const mind = c.track === "mindset";
  const lessons: Lesson[] = Array.from({ length: 5 }, (_, i) => ({ n: i + 1, title: "[Lesson title]", summary: "[One-line summary]", minutes: "[X] min" }));
  lessons.push({
    n: 6,
    task: true,
    title: mind ? "Team discussion and reflection" : "Course task: build it for your job",
    summary: mind ? "Bring what you learned to your next team meeting." : "Apply the course to a real task and save the result to your playbook.",
    minutes: "[X] min"
  });
  return lessons;
}

/** Lesson 1 is the free preview for signed-in visitors. */
export const isPreview = (n: number) => n === 1;
