interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartExplicit extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartExplicit {
  kind: "basic";
}

interface CoursePartBackground extends CoursePartExplicit {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartExplicit {
  requirements: string[];
  kind: "special";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
